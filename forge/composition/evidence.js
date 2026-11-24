const fs=require('node:fs'),path=require('node:path'),F=require('../core'),{jumpRuns}=require('../experiments/evidence'),{assess}=require('./verify');
for(const d of require('./levels')){
 const filename=path.join(__dirname,'results',d.id+'.json'),record=JSON.parse(fs.readFileSync(filename)),trace=record.solution.trace,results=[];
 for(let i=0;i<d.traps.length;i++)if(['Spring','Teleporter','MovingPlatform','Button'].includes(d.traps[i].type)){
  const changed=structuredClone(d);changed.traps[i]={type:'Note',args:[20,30,'Disabled for dependency check']};
  results.push({kind:'disable mechanic',mechanic:d.experiment.trapIds[i],proof:F.replay(changed,{...trace,hash:F.hash(changed)})});
 }
 for(const run of jumpRuns(trace)){
  const changed=structuredClone(trace);for(let i=run.start;i<run.end;i++)changed.actions[i][1]=false;
  const result=assess(d,changed);results.push({kind:'remove jump',tick:run.tick,proof:F.replay(d,changed),contractsAccepted:result.accepted});
 }
 for(let i=0;i<d.traps.length;i++)if(d.traps[i].type==='Laser'){
  let found=null;
  for(const offset of [-.05,.05,-.1,.1,-.2,.2,-.3,.3]){
   const changed=structuredClone(d),options=changed.traps[i].args[0],from=options.phase;options.phase=(from+offset+1)%1;
   const proof=F.replay(changed,{...trace,hash:F.hash(changed)});
   if(proof.end?.[2]==='dead'){found={kind:'laser phase intervention',mechanic:d.experiment.trapIds[i],from,to:options.phase,offsetSeconds:offset*options.period,proof};break;}
  }
  results.push(found||{kind:'laser phase intervention',mechanic:d.experiment.trapIds[i],result:'No death within tested offsets'});
 }
 record.dependencyEvidence={scope:'One intervention at a time with the remaining winning inputs unchanged. Does not prove all alternate routes impossible.',results};
 fs.writeFileSync(filename,JSON.stringify(record,null,2)+'\n');
 console.log(JSON.stringify({id:d.id,results:results.map(r=>({kind:r.kind,mechanic:r.mechanic,tick:r.tick,state:r.proof?.end?.[2],offset:r.offsetSeconds,contractsAccepted:r.contractsAccepted}))}));
}
