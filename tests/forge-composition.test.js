const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const F=require('../forge/core'),{compose}=require('../forge/composition/compose'),{R,springPortal,movingPulse}=require('../forge/composition/modules');
const {assess,probes}=require('../forge/composition/verify'),levels=require('../forge/composition/levels');
const plan=()=>({id:481,name:'Contract validation',infrastructure:[R(-40,-200,40,940),R(960,-200,40,940),R(0,-20,960,20),R(0,220,960,16)],modules:[springPortal('launch',{to:{x:55,floorY:180}}),movingPulse('pulse',{floorY:180,top:0,pitY:220,carrierPhase:.74})]});

test('contracts reject incompatible connections and impossible geometry before search',()=>{
 const edits=[p=>p.modules.pop(),p=>p.modules[1].key='launch',p=>p.modules[1].entry.region.x=700,
  p=>p.modules[0].traps[1].args[2]=700,p=>p.modules[0].traps[1].args[4].twoWay=true,
  p=>p.modules[0].geometry.room.w=1000,p=>p.modules[1].platforms.push(structuredClone(p.modules[1].platforms[0])),
  p=>p.infrastructure.pop(),p=>p.modules[0].required.push({trap:'missing',event:'activate',minTicks:1}),
  p=>p.modules[1].traps.find(t=>t.type==='Laser').args[0].len=20];
 for(const edit of edits){const p=plan();edit(p);assert.throws(()=>compose(p));}
 assert.equal(compose(plan()).composition.encounters.length,2);
});

test('only three developer-only composites; production and generator are isolated',()=>{
 assert.equal(levels.length,3);assert.deepEqual(levels.map(d=>d.id),[481,482,483]);
 for(const d of levels){assert.equal(d.developerOnly,true);assert.ok(d.composition.encounters.length>=2&&d.composition.encounters.length<=3);}
 // The developer server may expose saved fixtures for manual play; production
 // assets and automatic generation must remain independent of the composites.
 for(const file of ['index.html','campaign.js','scripts/build.js','forge/v3.js'])assert.ok(!fs.readFileSync(file,'utf8').includes('composition/'));
 const h=F.engine();h.run(fs.readFileSync('content/season-one.js','utf8'));h.run(fs.readFileSync('campaign.js','utf8'));assert.equal(h.run('LEVELS.length'),50);
 for(const [file,expected] of Object.entries(require('../forge/fixtures/production-hashes.json')))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),expected);
 const batch=JSON.parse(fs.readFileSync('forge/work/batch.json'));assert.ok(batch.every(c=>!levels.some(d=>d.id===c.data.id)));
});

for(const d of levels)test(d.name+': fresh completion, ordered contracts, no floor bypass',()=>{
 const record=require('../forge/composition/results/'+d.id+'.json');assert.deepEqual(record.data,d);
 assert.equal(record.accepted,true);assert.equal(record.approved,false);assert.equal(record.integrated,false);
 const a=assess(d,record.solution.trace);assert.equal(a.accepted,true);assert.deepEqual(a.measurements,record.measurements);
 assert.equal(a.measurements.orderedEncountersComplete,true);assert.equal(a.measurements.seconds.stationary,0);
 assert.ok(a.measurements.successfulReplaySeconds>4);assert.equal(a.measurements.inputs.horizontalReversals,0);
 assert.deepEqual(probes(d),record.bypass);assert.ok(!record.bypass.results.some(r=>r.bypassTrace));
 assert.ok(record.bypass.results.slice(0,2).every(r=>r.proof.end?.[2]!=='win'));
});

test('a physical win is rejected if a later encounter tries to reuse an earlier activation',()=>{
 const record=require('../forge/composition/results/481.json'),d=structuredClone(record.data);
 const late=d.experiment.encounters[1],requirement={trap:'launch/spring',event:'activate',minTicks:1,sinceEncounterEntry:true};
 late.required.push(requirement);d.experiment.stages[late.lastStage].requires.push(requirement);
 const trace={...record.solution.trace,hash:F.hash(d)};
 assert.equal(F.replay(d,trace).status,'VERIFIED');
 const a=assess(d,trace);assert.equal(a.accepted,false);assert.equal(a.measurements.orderedEncountersComplete,false);
});

test('missing encounter entry rejects an otherwise identical successful physics replay',()=>{
 const record=require('../forge/composition/results/482.json'),d=structuredClone(record.data);
 const index=d.experiment.encounters[1].firstStage;d.experiment.stages[index].reach={x:0,y:0,w:1,h:1};
 const trace={...record.solution.trace,hash:F.hash(d)};assert.equal(F.replay(d,trace).status,'VERIFIED');
 assert.equal(assess(d,trace).accepted,false);
});

test('changed composite geometry invalidates its saved trace',()=>{
 const record=require('../forge/composition/results/483.json'),d=structuredClone(record.data);d.traps[0].args[0]++;
 assert.equal(assess(d,record.solution.trace).accepted,false);
});
