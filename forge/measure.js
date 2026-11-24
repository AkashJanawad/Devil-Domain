const F = require('./core');
const {runtime} = require('./telemetry');

function summarize(samples, events, spec = {}) {
  const counts = {activeTraversal:0, passiveTransport:0, stationary:0, neutralWaiting:0, blockedInput:0, repeatedTraversal:0};
  let progress=-1, lastCell=null, repeat=false;
  const visited=new Set();
  let distance=0, transportDistance=0, portalDistance=0,jumpPresses=0,reversals=0,lastDirection=0,lastJump=false;
  for(const s of samples) {
    if(s.input[1]&&!lastJump)jumpPresses++;
    if(s.input[0]&&lastDirection&&s.input[0]!==lastDirection)reversals++;
    if(s.input[0])lastDirection=s.input[0];
    lastJump=s.input[1];
    const moved=Math.hypot(s.dx,s.dy), carried=Math.hypot(s.carryX,s.carryY);
    const self=Math.hypot(s.dx-s.carryX,s.dy-s.carryY);
    if(s.progress!==progress) { visited.clear(); lastCell=null; repeat=false; progress=s.progress; }
    const cell=Math.floor(s.x/20)+','+Math.floor(s.y/20);
    if(cell!==lastCell) { repeat=visited.has(cell); visited.add(cell); lastCell=cell; }
    if(s.warped) { counts.passiveTransport++; portalDistance+=moved; }
    else if(moved<.05) {
      counts.stationary++;
      if(s.input[0]===0 && !s.input[1]) counts.neutralWaiting++;
      else counts.blockedInput++;
    } else if(carried>.05 && self<.05) { counts.passiveTransport++; transportDistance+=carried; }
    else { counts.activeTraversal++; if(repeat) counts.repeatedTraversal++; distance+=self; transportDistance+=carried; }
  }
  const observed=new Map(events.map(e=>[e.id+':'+e.event,e]));
  return {ticks:samples.length,successfulReplaySeconds:samples.length/120,
    seconds:Object.fromEntries(Object.entries(counts).map(([k,v])=>[k,v/120])),
    distance:{selfPixels:distance,carriedPixels:transportDistance,portalPixels:portalDistance},
    inputs:{jumpPresses,horizontalReversals:reversals},
    required:(spec.required||[]).map(r=>({...r,observed:observed.has(r.trap+':'+r.event),firstTick:observed.get(r.trap+':'+r.event)?.tick})),
    events,stagesCompleted:samples.at(-1)?.stage||0,
    limitations:['Time categories describe motion, not human difficulty. Active includes ballistic motion.',
      'Repeated traversal is a 20px-cell revisit heuristic, reset on first mechanic events or ordered stage progress.',
      'Hazard proximity uses a 24px margin around the player and does not prove causality.',
      'Observed requirements are not a proof that every alternative route requires them.']};
}

function measure(d, trace) {
  const proof=F.replay(d,trace);
  if(proof.status!=='VERIFIED') return {status:'FAILED',proof};
  const h=F.engine(d);
  h.run(F.simulation); h.run(runtime);
  h.run('initForgeTracking')(d.experiment||{},true);
  const act=h.run('act');
  for(const a of trace.actions) { act(a,trace.duration); if(h.run('Game.state')!=='play') break; }
  const tracker=JSON.parse(JSON.stringify(h.run('forgeTracking')));
  if(tracker.tick!==proof.ticks || h.run('Game.state')!=='win') throw Error('Measurement replay differs from proof');
  const result=summarize(tracker.samples,tracker.events,d.experiment);
  // Retain per-trap tick counts; first-event timestamps alone hide sustained interactions.
  result.interactionTicks=tracker.counts;
  result.required=result.required.map(r=>({...r,observed:(tracker.counts[r.trap+':'+r.event]||0)>=(r.minTicks||1)}));
  if(d.experiment?.encounters){
    result.encounters=tracker.encounters.map(({baseline,...record})=>record);
    result.orderedEncountersComplete=result.encounters.length===d.experiment.encounters.length && result.encounters.every((r,i)=>
      r.key===d.experiment.encounters[i].key && Number.isInteger(r.completedTick) && r.completedTick>=r.enteredTick &&
      (i===0||r.enteredTick>result.encounters[i-1].completedTick) && d.experiment.encounters[i].required.every(q=>(r.interactions[q.trap+':'+q.event]||0)>=(q.minTicks||1)));
  }
  return {status:'VERIFIED',requirementsMet:result.required.every(r=>r.observed),
    orderedStagesComplete:result.stagesCompleted===(d.experiment?.stages?.length||0),
    engineHash:trace.engineHash,levelHash:trace.hash,proof,...result};
}
module.exports={measure,summarize};
