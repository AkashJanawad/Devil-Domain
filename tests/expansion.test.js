const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const {boot}=require('./harness');
const driver=fs.readFileSync('tests/replay-driver.js','utf8');
const surprise={30:'Door:fled',31:'CollapseFloor:triggered',32:'FallBlock:triggered',33:'PopSpikes:triggered',34:'PopSpikes:triggered',35:'Door:fled',36:'PopSpikes:triggered',37:'CollapseFloor:triggered',38:'FallBlock:triggered',39:'PopSpikes:triggered',40:'Door:fled'};
for(let level=30;level<=40;level++)test(`level ${level}: movement-only victory, surprise activation, repeatability and death reset`,()=>{
 const replay=JSON.parse(fs.readFileSync(`tests/replays/level-${level}.json`));
 assert.equal(replay.step,1/120);assert.ok(replay.actions.every(([d,j])=>[-1,0,1].includes(d)&&typeof j==='boolean'));
 const h=boot();h.run(driver);const runs=[];
 for(let i=0;i<3;i++){const result=h.run('playReplay')(replay);assert.equal(result.state,'win');assert.equal(result.deaths,0);assert.ok(result.events.includes(surprise[level]));runs.push(JSON.stringify(result));}
 assert.equal(runs[0],runs[1]);assert.equal(runs[1],runs[2]);
 h.run(`Game.loadLevel(${level-1});Game.state='play';Game.die(55,440);for(let n=0;n<150;n++)Game.update(STEP)`);assert.equal(h.run('Game.state'),'play');
 const result=h.run('playReplay')(replay);assert.equal(result.state,'win');assert.equal(result.deaths,0);
});
test('level 30 recorded route fails with old ceiling and succeeds with corrected geometry',()=>{
 const h=boot();const r=require('./replays/level-30.json');
 h.run(driver.replace("Game.state = 'play';","Game.level.solids.find(s=>s.x===40&&s.y===300).w=210; Game.state = 'play';"));
 assert.notEqual(h.run('playReplay')(r).state,'win');
 h.run(driver);assert.equal(h.run('playReplay')(r).state,'win');
});
test('level 30 completion progresses to 31; 40 completes the campaign',()=>{const h=boot();h.run(driver);h.run('playReplay')(require('./replays/level-30.json'));h.run('for(let i=0;i<180;i++)Game.update(STEP)');assert.equal(h.run('Game.levelIndex'),30);assert.equal(h.run('Game.state'),'play');h.run('playReplay')(require('./replays/level-40.json'));h.run('for(let i=0;i<180;i++)Game.update(STEP)');assert.equal(h.run('Game.state'),'end')});
test('development unlock enables all 40 without changing saves',()=>{const seed={dd_deaths:'47',dd_done:'{"0":true,"29":true}',dd_theme:'dark'};const h=boot(seed,false,{BUILD_MODE:'development',DEVELOPER_UNLOCK_ALL_LEVELS:true});assert.equal(h.elements.get('level-grid').children.length,40);assert.ok(h.elements.get('level-grid').children.every(e=>!e.disabled));h.elements.get('level-grid').children[39].fire('click');assert.equal(h.run('Game.levelIndex'),39);h.run('showMenu()');h.elements.get('level-grid').children[11].fire('click');assert.equal(h.run('Game.levelIndex'),11);assert.deepEqual(h.data,seed)});
test('release and disabled development retain genuine sequential unlocking',()=>{for(const config of [{BUILD_MODE:'release',DEVELOPER_UNLOCK_ALL_LEVELS:true},{BUILD_MODE:'development',DEVELOPER_UNLOCK_ALL_LEVELS:false}]){const h=boot({dd_done:'{"0":true}',dd_deaths:'4'},false,config);assert.equal(h.run('DEVELOPER_UNLOCK_ALL_LEVELS'),false);assert.equal(h.elements.get('level-grid').children.filter(e=>!e.disabled).length,2);assert.equal(h.run('Game.deaths'),4)}});
test('old 30-level saves unlock 31 and preserve statistics, without completing expansion',()=>{const done=Object.fromEntries(Array.from({length:30},(_,i)=>[i,true]));const h=boot({fd_done:JSON.stringify(done),fd_deaths:'123'});assert.equal(h.run('Game.deaths'),123);assert.equal(h.elements.get('level-grid').children.filter(e=>!e.disabled).length,31);assert.equal(h.run('Object.keys(getDone()).length'),30);assert.equal(h.run('getDone()[30]'),undefined)});
test('release packaging always overwrites developer configuration',()=>{
 execFileSync(process.execPath,['scripts/build.js','--android-release']);
 const source=fs.readFileSync('android/app/build/generated/releaseWeb/assets/public/game-config.js','utf8');const context={window:{}};vm.runInNewContext(source,context);assert.equal(context.window.DEVIL_DOMAIN_CONFIG.BUILD_MODE,'release');assert.equal(context.window.DEVIL_DOMAIN_CONFIG.DEVELOPER_UNLOCK_ALL_LEVELS,false);
 for(const name of ['game.js','index.html'])assert.equal(fs.readFileSync(`android/app/build/generated/releaseWeb/assets/public/${name}`,'utf8'),fs.readFileSync(name,'utf8'));
 assert.match(fs.readFileSync('android/app/build.gradle','utf8'),/task.dependsOn\(generateReleaseWebAssets\)/);
});
test('original levels 1-29 definitions match the pre-expansion inventory',()=>{const h=boot();const expected=require('../docs/level-inventory-1-30.json');const actual=h.run(`LEVELS.slice(0,29).map((d,i)=>{const l=d.build();return {number:i+1,name:d.name,spawn:l.spawn,exit:l.door.positions,solids:l.solids,traps:l.traps.map(t=>({type:t.constructor.name,...t}))}})`);for(const l of actual)for(const t of l.traps)delete t.closeSpeed;assert.deepEqual(JSON.parse(JSON.stringify(actual)),expected.slice(0,29))});
test('gate close-speed option preserves original default',()=>{const h=boot();assert.equal(h.run('new Gate(R(0,0,20,100),"x").closeSpeed'),4);assert.equal(h.run('LEVELS[38].build().traps.find(t=>t instanceof Gate).closeSpeed'),1.5)});

test('level 34 gates allow a normal forward run; the old timing pushes the player back',()=>{
 for(const oldTiming of [true,false]){
  const h=boot();h.run("Game.loadLevel(33);Game.state='play';keys.ArrowRight=true");
  if(oldTiming)h.run('Game.level.traps.filter(t=>t instanceof Gate).forEach(t=>t.closeSpeed=4)');
  h.run('for(let i=0;i<312;i++)Game.update(STEP)');
  if(oldTiming)assert.equal(h.run('Game.player.x'),314);
  else {assert.ok(h.run('Game.player.x')>720);assert.equal(h.run('Game.deaths'),0);assert.equal(h.run('Game.player.grounded'),true);}
 }
 for(const jumpAt of [725,737,750]){
  const h=boot();h.run("Game.loadLevel(33);Game.state='play';keys.ArrowRight=true");
  h.run('while(Game.player.x<'+jumpAt+'&&Game.state===\"play\")Game.update(STEP)');
  h.run('jumpBuffered=.12;keys.Space=true;for(let i=0;i<120&&Game.state===\"play\";i++)Game.update(STEP)');
  assert.equal(h.run('Game.state'),'win');assert.equal(h.run('Game.deaths'),0);
 }
});
