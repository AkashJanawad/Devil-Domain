const fs=require('node:fs'),path=require('node:path'),F=require('../core'),{measure}=require('../measure');
const fixtures=require('./encounters');
const {simplify,controls,jumpRuns}=require('./evidence');
const selected=process.argv[2],fine=process.argv.includes('--fine');
fs.mkdirSync(path.join(__dirname,'results'),{recursive:true});
for(const d of fixtures.filter(d=>!selected||String(d.id)===selected)) {
 const start=Date.now();console.log('Solving',d.name);
 const solution=F.solve(d,fine?{width:100,depth:240,actionTicks:3,maxExpanded:150000}:{width:120,depth:160,actionTicks:12});
 const searchWallSeconds=(Date.now()-start)/1000;
 let cleanup=null;
 if(solution.trace){cleanup=simplify(d,solution.trace);solution.searchTrace=solution.trace;solution.trace=cleanup.trace;solution.replay=F.replay(d,solution.trace);delete cleanup.trace;}
 const result={data:d,solution,cleanup,measurements:solution.trace?measure(d,solution.trace):null,
  jumpPresses:solution.trace?jumpRuns(solution.trace):[],controls:solution.trace?controls(d,solution.trace):null,
  searchWallSeconds,runWallSeconds:(Date.now()-start)/1000,approved:false,integrated:false};
 fs.writeFileSync(path.join(__dirname,'results',d.id+(fine?'-fine':'')+'.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({id:d.id,status:solution.status,expanded:solution.expanded,seconds:result.measurements?.successfulReplaySeconds,wall:result.searchWallSeconds}));
}
