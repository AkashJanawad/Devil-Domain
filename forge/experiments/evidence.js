const F=require('../core'),{measure}=require('../measure');

function jumpRuns(trace){
 const runs=[];
 for(let i=0;i<trace.actions.length;i++)if(trace.actions[i][1]&&!trace.actions[i-1]?.[1]) {
  let end=i+1;while(end<trace.actions.length&&trace.actions[end][1])end++;
  runs.push({start:i,end,tick:i*trace.duration});
 }
 return runs;
}
function withoutJump(trace,run){const t=structuredClone(trace);for(let i=run.start;i<run.end;i++)t.actions[i][1]=false;return t;}
function simplify(d,trace){
 let t=structuredClone(trace);const removed=[];
 // Fixed point: a later removal can make an earlier press redundant.
 let changed=true;
 while(changed){changed=false;for(const run of jumpRuns(t)){
  const candidate=withoutJump(t,run),m=measure(d,candidate);
  if(m.status==='VERIFIED'&&m.requirementsMet&&m.orderedStagesComplete){t=candidate;removed.push(run.tick);changed=true;break;}
 }}
 return {trace:t,removedJumpPressTicks:removed};
}
function controls(d,trace){
 const disabled=d.id===491?['launch','portal']:d.id===492?['carrier']:['switch'];
 const results=[];
 for(const id of disabled){
  const altered=structuredClone(d),i=d.experiment.trapIds.indexOf(id);
  altered.traps[i]={type:'Note',args:[20,30,'Counterfactual: '+id+' disabled']};
  results.push({kind:'disable mechanic',mechanic:id,proof:F.replay(altered,{...trace,hash:F.hash(altered)})});
 }
 if(d.id===492){
  const altered=structuredClone(d);altered.traps[1].args[0].phase=.1;
  results.push({kind:'change laser phase',from:.2,to:.1,offsetSeconds:-.17,proof:F.replay(altered,{...trace,hash:F.hash(altered)})});
 }
 for(const run of jumpRuns(trace))results.push({kind:'remove jump press',tick:run.tick,proof:F.replay(d,withoutJump(trace,run))});
 return {scope:'Same recorded route with one intervention. Failure demonstrates route dependence, not impossibility of all alternate routes.',results};
}
module.exports={jumpRuns,simplify,controls};
