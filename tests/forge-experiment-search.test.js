// Deliberately separate from the fast replay suite: fresh CPU search costs ~1 minute.
const {test}=require('node:test'),assert=require('node:assert/strict');
const F=require('../forge/core'),{measure}=require('../forge/measure'),fixtures=require('../forge/experiments/encounters');
for(const d of fixtures)test(d.name+': discover a complete route from reset',()=>{
 const solution=F.solve(d,{width:120,depth:160});
 assert.equal(solution.status,'VERIFIED');assert.equal(solution.trace.duration,12);
 const m=measure(d,solution.trace);assert.equal(m.requirementsMet,true);assert.equal(m.orderedStagesComplete,true);
});
test('moving-platform encounter can be searched with 25ms control groups',()=>{
 const solution=F.solve(fixtures[1],{width:100,depth:240,actionTicks:3,maxExpanded:150000});
 assert.equal(solution.status,'VERIFIED');assert.equal(solution.trace.duration,3);
 const m=measure(fixtures[1],solution.trace);assert.equal(m.requirementsMet,true);assert.equal(m.orderedStagesComplete,true);
});
