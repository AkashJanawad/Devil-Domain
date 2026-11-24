const {test}=require('node:test'),assert=require('node:assert/strict'),F=require('../forge/core'),{assess}=require('../forge/composition/verify');
for(const d of require('../forge/composition/levels'))test(d.name+': fresh whole-level search and replay',()=>{
 const s=F.solve(d,{width:160,depth:180,maxExpanded:200000});assert.equal(s.status,'VERIFIED');
 // Search traces may contain redundant inputs; correctness checks do not depend
 // on the subsequent optional cleanup used for the published measurements.
 const a=assess(d,s.trace);assert.equal(a.measurements.requirementsMet,true);
 assert.equal(a.measurements.orderedStagesComplete,true);assert.equal(a.measurements.orderedEncountersComplete,true);
 assert.equal(a.measurements.proof.end[2],'win');
});
