// Verification only: never edits layouts, calls generate(), or promotes content.
const fs=require('node:fs'),path=require('node:path'),F=require('../core');
const {measure}=require('../measure'),{simplify}=require('../experiments/evidence');
const {approved,drafts}=require('./catalog');
const levels=process.argv[2]?[...approved,...drafts]:drafts;
fs.mkdirSync(path.join(__dirname,'results'),{recursive:true});
for(const data of levels.filter(d=>!process.argv[2]||d.id===Number(process.argv[2]))){
 const start=Date.now();console.log('VERIFY',data.id,data.name);
 const validation=F.validate(data);
 const solution=F.solve(data,{width:100,depth:160,maxExpanded:95000});
 if(solution.trace){const clean=simplify(data,solution.trace);solution.trace=clean.trace;solution.removedJumpPressTicks=clean.removedJumpPressTicks;}
 const measurements=solution.trace?measure(data,solution.trace):null;
 const verified=measurements?.status==='VERIFIED'&&measurements.requirementsMet&&measurements.orderedStagesComplete;
 const others=[...F.existing(data.id),...drafts.filter(d=>d.id!==data.id)];
 const nearest=others.map(d=>({id:d.id,...F.similarity(data,d)})).sort((a,b)=>b.score-a.score).slice(0,3);
 const result={data,validation,solution,measurements,verified:!!verified,nearest,productionReady:false,manualReview:'PENDING',wallSeconds:(Date.now()-start)/1000};
 fs.writeFileSync(path.join(__dirname,'results',data.id+'.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({id:data.id,verified,seconds:measurements?.successfulReplaySeconds,active:measurements?.seconds.activeTraversal,idle:measurements?.seconds.stationary,repeated:measurements?.seconds.repeatedTraversal,jumps:measurements?.inputs.jumpPresses,progress:solution.progress,errors:validation.errors,wall:result.wallSeconds}));
 if(!verified)process.exitCode=1;
}
