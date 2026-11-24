const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const F=require('../forge/core'),{measure}=require('../forge/measure'),{approved,drafts:levels}=require('../forge/season2/catalog');
const {traceFor}=require('../forge/composition/verify');
test('Season 2 has 50 approved handcrafted levels in the 100-level campaign',()=>{
 assert.deepEqual(levels,[]);assert.deepEqual(approved.map(d=>d.id),Array.from({length:50},(_,i)=>51+i));
 for(const d of levels){assert.equal(d.season,2);assert.equal(d.developerOnly,true);assert.equal(d.review.productionReady,false);assert.equal(d.review.manualReview,'PENDING');}
 for(const [file,expected]of Object.entries(require('../forge/fixtures/production-hashes.json')))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),expected,file);
 const h=F.engine();h.run(fs.readFileSync('content/season-one.js','utf8'));h.run(fs.readFileSync('content/season-two.js','utf8'));h.run(fs.readFileSync('campaign.js','utf8'));assert.equal(h.run('LEVELS.length'),100);
 for(const file of ['index.html','campaign.js','scripts/build.js','forge/v3.js'])assert.ok(!fs.readFileSync(file,'utf8').includes('season2'));
 assert.ok(!/require\([^\n]*(?:compose|v3)|\.generate\(/.test(fs.readFileSync('forge/season2/levels-91-100.js','utf8')));
});
for(const d of [...approved,...levels])test('Level '+d.id+': fresh replay, intended interactions, no ground-only win, distinct layout',()=>{
 const record=require('../forge/season2/results/'+d.id+'.json');assert.deepEqual(record.data,d);
 assert.equal(F.validate(d).status,'PASSED');assert.equal(record.verified,true);assert.equal(record.productionReady,false);
 const m=measure(d,record.solution.trace);assert.equal(m.status,'VERIFIED');assert.equal(m.requirementsMet,true);assert.equal(m.orderedStagesComplete,true);assert.deepEqual(m,record.measurements);
 assert.ok(m.inputs.jumpPresses>=1);assert.ok(m.seconds.stationary<1);assert.ok(m.seconds.repeatedTraversal<.5);
 for(const dir of [-1,1])assert.notEqual(F.replay(d,traceFor(d,Array.from({length:300},()=>[dir,false]))).end?.[2],'win','ground-only bypass');
 for(const other of [...F.existing(d.id),...levels.filter(o=>o!==d)])assert.ok(F.similarity(d,other).score<.65,'structural similarity needs review: '+other.id);
});
test('campaign uses approved geometry, progresses from 50 to 51 and finishes at 100',()=>{
 const h=F.engine();
 for(const path of ['content/season-one.js','content/season-two.js','campaign.js'])h.run(fs.readFileSync(path,'utf8'));
 assert.equal(h.run('seasonProgress(2).total'),50);
 for(const d of approved){
  const packaged=JSON.parse(h.run('JSON.stringify(window.FORGE_CONTENT.levels.find(d=>d.id==='+d.id+'))'));
  for(const key of ['id','name','spawn','platforms','traps','exit'])assert.deepEqual(packaged[key],d[key]);
 }
 h.run("Game.loadLevel(49);Game.winLevel();for(let i=0;i<180;i++)Game.update(STEP)");
 assert.equal(h.run('Game.levelIndex'),50);assert.equal(h.run('Game.state'),'play');
 h.run("Game.loadLevel(59);Game.winLevel();for(let i=0;i<180;i++)Game.update(STEP)");
 assert.equal(h.run('Game.levelIndex'),60);assert.equal(h.run('Game.state'),'play');
 h.run("Game.loadLevel(69);Game.winLevel();for(let i=0;i<180;i++)Game.update(STEP)");
 assert.equal(h.run('Game.levelIndex'),70);assert.equal(h.run('Game.state'),'play');
 h.run("Game.loadLevel(79);Game.winLevel();for(let i=0;i<180;i++)Game.update(STEP)");
 assert.equal(h.run('Game.levelIndex'),80);assert.equal(h.run('Game.state'),'play');
 h.run("Game.loadLevel(89);Game.winLevel();for(let i=0;i<180;i++)Game.update(STEP)");
 assert.equal(h.run('Game.levelIndex'),90);assert.equal(h.run('Game.state'),'play');
 h.run("Game.loadLevel(99);Game.winLevel();for(let i=0;i<180;i++)Game.update(STEP)");
 assert.equal(h.run('Game.state'),'end');
});
