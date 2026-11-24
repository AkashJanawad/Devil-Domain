// Developer-only observers. No engine methods or collision rules are replaced.
// The same observer runs in search snapshots and fresh measurement replays.
const runtime = String.raw`
function initForgeTracking(spec = {}, record = false) {
  globalThis.forgeSpec = spec;
  globalThis.forgeRecord = record;
  globalThis.forgeTracking = {tick:0, stage:0, counts:{}, first:{}, events:[], samples:[]};
  if(spec.encounters) { forgeTracking.encounters=[]; forgeTracking.eventsThisTick={}; }
}
function forgeTrapId(t, i) { return forgeSpec.trapIds?.[i] || t.constructor.name + ':' + i; }
function forgeEvent(id, event, detail = {}) {
  const key = id + ':' + event, tracker = forgeTracking;
  tracker.counts[key] = (tracker.counts[key] || 0) + 1;
  if(forgeSpec.encounters)tracker.eventsThisTick[key]=(tracker.eventsThisTick[key]||0)+1;
  if (tracker.first[key] === undefined) {
    tracker.first[key] = tracker.tick;
    if (forgeRecord) tracker.events.push({tick:tracker.tick, id, event, ...detail});
  }
}
function forgeRequirementMet(r) {
  const key=r.trap+':'+r.event;
  const baseline=r.sinceEncounterEntry?(forgeTracking.encounters?.at(-1)?.baseline[key]||0):0;
  return (forgeTracking.counts[key]||0)-baseline >= (r.minTicks||1);
}
function forgeBeforeTick() {
  return {p:{...Game.player}, door:Game.level.door.i, traps:Game.level.traps.map(t => ({
    c:t.c, cool:t.cool, pressed:t.pressed, open:t.open, state:t.state, active:t.active,
    sprung:t.sprung, px:t.px, py:t.py
  }))};
}
function forgeAfterTick(before, input) {
  const tracker = forgeTracking, p = Game.player;
  tracker.tick++;
  if(forgeSpec.encounters)tracker.eventsThisTick={};
  let warped = false, carryX = 0, carryY = 0;
  const support = [], near = [];
  for (let i=0; i<Game.level.traps.length; i++) {
    const t=Game.level.traps[i], old=before.traps[i], id=forgeTrapId(t,i), type=t.constructor.name;
    if (type==='Spring' && t.c>old.c) forgeEvent(id,'activate');
    if (type==='Teleporter' && t.cool>old.cool) { warped=true; forgeEvent(id,'activate'); }
    if (type==='Button' && t.pressed && !old.pressed) forgeEvent(id,'activate');
    if (type==='Gate' && t.open>.92 && old.open<=.92) forgeEvent(id,'open');
    if (type==='Gate' && t.open>.92 && p.y+p.h>t.rect.y && p.y<t.rect.y+t.rect.h &&
        ((before.p.x<=t.rect.x+t.rect.w && p.x>t.rect.x+t.rect.w) ||
         (before.p.x+before.p.w>=t.rect.x && p.x+p.w<t.rect.x))) forgeEvent(id,'pass');
    if (old.state==='idle' && t.state!=='idle') forgeEvent(id,'trigger');
    if (type==='WindZone' && t.active && !old.active) forgeEvent(id,'trigger');
    if (type==='FakeDoor' && t.sprung && !old.sprung) forgeEvent(id,'trigger');
    if (type==='MovingPlatform') {
      // This is the engine's pre-update carry contact predicate, not a near-platform guess.
      const q=before.p, on=q.vy>=-1 && q.x+q.w>old.px+2 && q.x<old.px+t.w-2 && Math.abs(q.y+q.h-old.py)<=8;
      if (on) {
        support.push(id); carryX+=t.px-old.px; carryY+=t.py-old.py;
        if (Math.hypot(t.px-old.px,t.py-old.py)>1e-9) forgeEvent(id,'ride');
      }
    }
    const proximity={x:p.x-24,y:p.y-24,w:p.w+48,h:p.h+48};
    if (t.kills().some(r=>aabb(proximity,r))) { near.push(id); forgeEvent(id,'hazardNear'); }
    if (type==='Laser' && aabb(p,t._beam())) {
      forgeEvent(id,'beamCross',{phase:t._state()});
      if(support.length || Game.level.traps.some((m,j)=>m.constructor.name==='MovingPlatform' && before.p.vy>=-1 && before.p.x+before.p.w>before.traps[j].px+2 && before.p.x<before.traps[j].px+m.w-2 && Math.abs(before.p.y+before.p.h-before.traps[j].py)<=8)) forgeEvent(id,'beamCrossRiding',{phase:t._state()});
    }
  }
  if (p.grounded && !before.p.grounded) {
    for(let i=0;i<Game.level.solids.length;i++) {
      const r=Game.level.solids[i];
      if(Math.abs(p.y+p.h-r.y)<1e-6 && p.x+p.w>r.x && p.x<r.x+r.w) forgeEvent('platform:'+i,'land');
    }
  }
  if(Game.level.door.i!==before.door) forgeEvent('exit','relocate');
  const stage=forgeSpec.stages?.[tracker.stage];
  if(stage) {
    const r=stage.reach;
    const inRegion=!r || (p.x>=r.x && p.x<r.x+r.w && p.y>=r.y && p.y<r.y+r.h);
    if(inRegion && (!stage.grounded || p.grounded) && (stage.requires||[]).every(forgeRequirementMet)) {
      if(stage.entryOf) {
        const baseline={...tracker.counts};
        for(const [key,n] of Object.entries(tracker.eventsThisTick))baseline[key]-=n;
        tracker.encounters.push({key:stage.entryOf,enteredTick:tracker.tick,baseline});
        forgeEvent('encounter:'+stage.entryOf,'enter');
      }
      if(stage.exitOf) {
        const active=tracker.encounters.at(-1);
        if(active?.key!==stage.exitOf)throw Error('Encounter exit without matching entry');
        active.completedTick=tracker.tick;
        active.interactions=Object.fromEntries((stage.requires||[]).map(r=>{const key=r.trap+':'+r.event;return [key,(tracker.counts[key]||0)-(active.baseline[key]||0)];}));
        forgeEvent('encounter:'+stage.exitOf,'complete');
      }
      forgeEvent('stage:'+tracker.stage,'complete',{label:stage.label}); tracker.stage++;
    }
  }
  if(forgeRecord) tracker.samples.push({tick:tracker.tick,x:p.x,y:p.y,dx:p.x-before.p.x,dy:p.y-before.p.y,
    carryX,carryY,warped,grounded:p.grounded,input:[...input],stage:tracker.stage,
    progress:Object.keys(tracker.first).filter(k=>!k.endsWith(':hazardNear')).length,
    support,near});
}
function forgeTarget(stage) {
  const target=stage?.target;
  if(target?.trap) {
    const i=forgeSpec.trapIds.indexOf(target.trap),t=Game.level.traps[i];
    return {x:(t.px ?? t.x ?? t.a?.x)+(target.dx||0), y:(t.py ?? t.y ?? t.a?.y)+(target.dy||0)};
  }
  return target || Game.level.door.pos;
}
`;

module.exports = {runtime};
