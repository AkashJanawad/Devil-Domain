const fs=require('node:fs'),path=require('node:path'),F=require('../core'),{measure}=require('../measure'),{simplify,jumpRuns}=require('../experiments/evidence');
const levels=require('./levels'),directory=path.join(__dirname,'results');
const {assess,probes}=require('./verify');
fs.mkdirSync(directory,{recursive:true});
for(const data of levels.filter(d=>!process.argv[2]||String(d.id)===process.argv[2])){
 console.log('Searching',data.name);const start=Date.now();
 const solution=F.solve(data,{width:160,depth:180,maxExpanded:200000});
 let cleanup=null;
 if(solution.trace){cleanup=simplify(data,solution.trace);solution.searchTrace=solution.trace;solution.trace=cleanup.trace;delete cleanup.trace;solution.replay=F.replay(data,solution.trace);}
 const assessment=solution.trace?assess(data,solution.trace):{accepted:false,reasons:['Solver did not find a completion'],measurements:null};
 const measurements=assessment.measurements,bypass=probes(data);
 if(bypass.results.some(r=>r.bypassTrace)){assessment.accepted=false;assessment.reasons.push('A bounded policy bypasses encounter requirements');}
 const result={data,solution,cleanup,measurements,accepted:assessment.accepted,reasons:assessment.reasons,bypass,
  jumpPresses:solution.trace?jumpRuns(solution.trace):[],runWallSeconds:(Date.now()-start)/1000,approved:false,integrated:false};
 fs.writeFileSync(path.join(directory,data.id+'.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({id:data.id,status:solution.status,accepted:result.accepted,expanded:solution.expanded,seconds:measurements?.successfulReplaySeconds,stages:measurements?.stagesCompleted,wall:result.runWallSeconds}));
 if(!result.accepted)process.exitCode=1;
}
