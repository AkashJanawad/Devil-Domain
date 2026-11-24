const F=require('../core'),{measure}=require('../measure');
function assess(data,trace){
 const measurements=measure(data,trace),reasons=[];
 if(measurements.status!=='VERIFIED')reasons.push('No fresh zero-death completion proof');
 else {
  if(!measurements.requirementsMet)reasons.push('Missing required mechanic activation');
  if(!measurements.orderedStagesComplete||!measurements.orderedEncountersComplete)reasons.push('Skipped or out-of-order encounter contract');
  if(measurements.successfulReplaySeconds<3.5)reasons.push('Composite route too short for this experiment');
  if(measurements.seconds.stationary>.25)reasons.push('Excessive stationary time');
  if(measurements.seconds.repeatedTraversal>.35)reasons.push('Excessive repeated traversal');
  if(measurements.inputs.horizontalReversals>2)reasons.push('Excessive direction corrections');
  if(measurements.inputs.jumpPresses<3)reasons.push('Too few distinct jump actions');
 }
 return {accepted:!reasons.length,reasons,measurements};
}
function traceFor(data,actions){return {engineHash:F.engineHash(),hash:F.hash(data),seed:data.seed,initial:{spawn:data.spawn,trapState:'fresh constructor reset',deaths:0},step:1/120,duration:12,actions};}
function probes(data){
 const results=[];
 for(const direction of [1,-1]){
  const trace=traceFor(data,Array.from({length:300},()=>[direction,false]));
  results.push({policy:'ground run '+direction,proof:F.replay(data,trace)});
 }
 for(const period of [2,3,4,5,6,8])for(const delay of [0,1,2]){
  const actions=Array.from({length:300},(_,i)=>i<delay?[0,false]:[1,(i-delay)%period<Math.ceil(period/2)]);
  const trace=traceFor(data,actions),proof=F.replay(data,trace);
  const won=proof.end?.[2]==='win',m=proof.status==='VERIFIED'?measure(data,trace):null;
  results.push({policy:'jump cycle '+period*100+'ms / delay '+delay*100+'ms',proof,
   ...(m?{orderedEncountersComplete:m.orderedEncountersComplete,required:m.requirementsMet,stages:m.orderedStagesComplete,
    ...(!m.orderedEncountersComplete||!m.requirementsMet||!m.orderedStagesComplete?{bypassTrace:trace}:{} )}:won?{bypassTrace:trace,reason:'Physical victory without verified hidden interaction'}:{})});
 }
 return {horizonSeconds:30,scope:'Two ground-only runs and eighteen fixed rightward jump policies. Bounded probes, not exhaustive reachability proof.',results};
}
module.exports={assess,probes,traceFor};
