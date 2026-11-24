const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const F=require('../forge/core'),{runtime}=require('../forge/telemetry'),{measure,summarize}=require('../forge/measure');
const fixtures=require('../forge/experiments/encounters'),{controls}=require('../forge/experiments/evidence');

test('deduplication distinguishes dynamics the old key merged',()=>{
 const h=F.engine(fixtures[0]);h.run(F.simulation);const s=h.run('snap')();
 const edits=[s=>s.game.player.x+=.001,s=>s.game.player.coyote=.09,s=>s.game.player.grounded=!s.game.player.grounded,
  s=>s.jump=.08,s=>s.game.level.traps[1].cool=.1,s=>s.game.level.traps[2].state='popping',s=>s.game.level.traps[2].t+=.001,
  s=>s.game.flags.newSwitch=true,s=>s.held=!s.held,s=>s.tracking={stage:1}];
 for(const edit of edits){const other=JSON.parse(JSON.stringify(s));edit(other);assert.notEqual(F.stateKey(s),F.stateKey(other));}
 assert.equal(F.stateKey(s),F.stateKey(JSON.parse(JSON.stringify(s))));
});

test('search snapshot restores pending input, trap timers and ordered progress',()=>{
 const h=F.engine(fixtures[0]);h.run(F.simulation);h.run(runtime);h.run('initForgeTracking')(fixtures[0].experiment,false);
 h.run('act([1,false],60)');const s=h.run('snap')();h.run('act([1,true],12)');const first=F.stateKey(h.run('snap')());
 h.run('restore')(s);h.run('act([1,true],12)');assert.equal(F.stateKey(h.run('snap')()),first);
});

test('time accounting distinguishes waiting, carrying, portals and repeated motion',()=>{
 const sample=(x,dx,extra={})=>({x,y:100,dx,dy:0,carryX:0,carryY:0,warped:false,input:[1,false],progress:0,...extra});
 const data=[sample(1,0,{input:[0,false]}),sample(1,0),sample(21,20,{carryX:20}),sample(300,279,{warped:true}),
  sample(340,40),sample(360,20),sample(340,-20),sample(341,1)];
 const m=summarize(data,[]);assert.equal(m.seconds.stationary,2/120);assert.equal(m.seconds.neutralWaiting,1/120);
 assert.equal(m.seconds.blockedInput,1/120);assert.equal(m.seconds.passiveTransport,2/120);
 assert.equal(m.seconds.activeTraversal,4/120);assert.equal(m.seconds.repeatedTraversal,2/120);
 data.at(-1).progress=1;assert.equal(summarize(data,[]).seconds.repeatedTraversal,1/120);
});

test('actual engine standing still is measured as waiting after initial landing',()=>{
 const h=F.engine(fixtures[0]);h.run(F.simulation);h.run(runtime);h.run('initForgeTracking')(fixtures[0].experiment,true);
 h.run('act([0,false],120)');const t=JSON.parse(JSON.stringify(h.run('forgeTracking'))),m=summarize(t.samples,t.events);
 assert.equal(m.successfulReplaySeconds,1);assert.ok(m.seconds.neutralWaiting>.9);assert.equal(m.seconds.passiveTransport,0);
 assert.equal(m.seconds.repeatedTraversal,0);
});

test('measurement refuses stale or unsuccessful proof',()=>{
 const r=require('../forge/experiments/results/491.json');assert.equal(measure(r.data,{...r.solution.trace,hash:'wrong'}).status,'FAILED');
 assert.equal(measure(r.data,{...r.solution.trace,actions:[[0,false]]}).status,'FAILED');
 assert.equal(F.replay(r.data,{...r.solution.trace,duration:0}).status,'FAILED');
});

for(const d of fixtures)test(d.name+': fresh replay, measurements, requirements and counterfactuals',()=>{
 const r=require('../forge/experiments/results/'+d.id+'.json');assert.deepEqual(r.data,d);assert.equal(r.approved,false);assert.equal(r.integrated,false);
 const m=measure(d,r.solution.trace);assert.deepEqual(m,r.measurements);assert.equal(m.status,'VERIFIED');
 assert.equal(m.requirementsMet,true);assert.equal(m.orderedStagesComplete,true);
 assert.equal(m.successfulReplaySeconds,m.proof.ticks/120);
 assert.ok(Math.abs(m.seconds.activeTraversal+m.seconds.stationary+m.seconds.passiveTransport-m.successfulReplaySeconds)<1e-9);
 assert.equal(m.seconds.stationary,0);assert.ok(m.seconds.repeatedTraversal<.15);
 assert.deepEqual(controls(d,r.solution.trace),r.controls);
 for(const c of r.controls.results)assert.notEqual(c.proof.end?.[2],'win',JSON.stringify(c));
 // Same inputs at finer grouping must preserve tick-exact authoritative physics.
 const fine={...r.solution.trace,duration:3,actions:r.solution.trace.actions.flatMap(a=>Array.from({length:4},()=>[...a]))};
 assert.deepEqual(F.replay(d,fine),F.replay(d,r.solution.trace));
 const events=m.events;
 if(d.id===491)assert.ok(events.find(e=>e.id==='platform:2'&&e.event==='land').tick<events.find(e=>e.id==='portal').tick);
 if(d.id===492){assert.ok(m.interactionTicks['carrier:ride']>=12);assert.ok(m.interactionTicks['pulse:beamCrossRiding']>0);}
 if(d.id===493)assert.ok(events.find(e=>e.id==='route-gate'&&e.event==='pass').tick<=events.find(e=>e.id==='ambush').tick);
});

test('experimental fixtures remain outside production and active generation',()=>{
 const h=F.engine();h.run(fs.readFileSync('content/season-one.js','utf8'));h.run(fs.readFileSync('campaign.js','utf8'));assert.equal(h.run('LEVELS.length'),50);
 for(const file of ['scripts/build.js','index.html','campaign.js','forge/v3.js','forge/server.js'])assert.ok(!fs.readFileSync(file,'utf8').includes('experiments/'));
 const batch=JSON.parse(fs.readFileSync('forge/work/batch.json'));assert.ok(batch.every(c=>!fixtures.some(d=>c.data.id===d.id)));
});
