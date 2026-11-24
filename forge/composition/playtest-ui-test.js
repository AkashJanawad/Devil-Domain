const {chromium}=require('playwright-core'),fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const origin='http://127.0.0.1:8091',records=[481,482,483].map(id=>require('./results/'+id+'.json'));
const files=[...Object.keys(require('../fixtures/production-hashes.json')),'forge/work/batch.json',...records.map(r=>'forge/composition/results/'+r.data.id+'.json')];
const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
async function main(){
 const before=Object.fromEntries(files.map(p=>[p,digest(p)])),browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const errors=[],external=[],posts=[],results=[];
 async function context(deterministic){
  const c=await browser.newContext({viewport:{width:1280,height:850}});
  if(deterministic)await c.addInitScript(()=>window.requestAnimationFrame=()=>0);
  await c.route('**/*',route=>{if(new URL(route.request().url()).origin!==origin){external.push(route.request().url());return route.abort();}return route.continue();});
  const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});return {c,p};
 }
 async function open(p,id){
  await p.goto(origin+'/#composite-playtest-lab');
  assert.equal(await p.locator('main').isVisible(),false);
  assert.equal(await p.locator('#preview').getAttribute('src'),null);
  const play=p.getByRole('button',{name:'PLAY '+String.fromCharCode(65+id-481),exact:true});
  const bounds=await play.boundingBox();assert.ok(bounds.y>=0&&bounds.y+bounds.height<=850);
  await play.click();
  await p.waitForFunction(()=>document.getElementById('lab-status').textContent.startsWith('Playing'),undefined,{polling:50});
  const frame=p.frames().find(f=>f.url().includes('/preview?composite='));
  assert.deepEqual(await frame.evaluate(()=>window.compositeFixture),records.find(r=>r.data.id===id).data);
  assert.equal(await frame.evaluate(()=>LEVELS.length),71);
  assert.equal(await frame.locator('#hud-levelname').textContent(),records.find(r=>r.data.id===id).data.name);
  assert.equal(await frame.locator('#hud-levelnum').textContent(),'CMP '+String.fromCharCode(65+id-481));
  assert.equal(await frame.locator('#menu').isVisible(),false);return frame;
 }
 try {
  // Live animation loop and native keyboard input: movement, jump, R and button restart.
  const live=await context(false);
  for(const r of records){
   const frame=await open(live.p,r.data.id);
   await frame.waitForFunction(()=>Game.player.grounded);
   const start=await frame.evaluate(()=>({x:Game.player.x,y:Game.player.y}));
   await live.p.keyboard.down('ArrowRight');await live.p.waitForTimeout(150);await live.p.keyboard.up('ArrowRight');
   assert.ok(await frame.evaluate(x=>Game.player.x>x+10,start.x));
   await live.p.keyboard.down('Space');await live.p.waitForTimeout(100);await live.p.keyboard.up('Space');
   assert.ok(await frame.evaluate(y=>Game.player.y<y-10,start.y));
   await live.p.keyboard.press('KeyR');assert.equal(await frame.evaluate(()=>Game.player.x),55);
   assert.equal(await frame.locator('#hud-levelnum').textContent(),'CMP '+String.fromCharCode(65+r.data.id-481));
   await live.p.getByRole('button',{name:'Restart level',exact:true}).click();assert.equal(await frame.evaluate(()=>Game.state),'play');
   assert.equal(await frame.locator('#hud-levelnum').textContent(),'CMP '+String.fromCharCode(65+r.data.id-481));
   await live.p.getByRole('button',{name:'Return to laboratory',exact:true}).click();await live.p.waitForURL(origin+'/#composite-playtest-lab');
  }
  await live.c.close();
  // Deterministic clock only; every input still goes through real keyboard events
  // in the exact UI the user opens. No solver or coordinate writes during play.
  const {c,p}=await context(true);await p.goto(origin);
  const saved={dd_done:'{"0":true}',dd_deaths:'41',dd_theme:'dark',lab_sentinel:'unchanged'};
  await p.evaluate(values=>{localStorage.clear();for(const [k,v]of Object.entries(values))localStorage.setItem(k,v);},saved);
  for(const record of records){
   const frame=await open(p,record.data.id);let direction=0,jump=false,ticks=0;
   for(const [d,j] of record.solution.trace.actions){
    if(direction!==d){if(direction)await p.keyboard.up(direction<0?'ArrowLeft':'ArrowRight');if(d)await p.keyboard.down(d<0?'ArrowLeft':'ArrowRight');direction=d;}
    if(jump!==j){await p.keyboard[j?'down':'up']('Space');jump=j;}
    ticks+=await frame.evaluate(n=>{let tick=0;for(;tick<n&&Game.state==='play';tick++)Game.update(STEP);Game.draw();return tick;},record.solution.trace.duration);
    if(await frame.evaluate(()=>Game.state)!=='play')break;
   }
   if(direction)await p.keyboard.up(direction<0?'ArrowLeft':'ArrowRight');if(jump)await p.keyboard.up('Space');
   await p.waitForFunction(()=>document.getElementById('lab-status').textContent.includes('LEVEL COMPLETE'),undefined,{polling:50});
   assert.equal(await frame.evaluate(()=>Game.state),'win');assert.equal(await frame.evaluate(()=>Game.deaths),0);
   assert.equal(ticks,record.measurements.ticks);
   await frame.evaluate(()=>{for(let i=0;i<240;i++)Game.update(STEP)});assert.equal(await frame.evaluate(()=>Game.state),'win');
   assert.deepEqual(await p.evaluate(()=>Object.fromEntries(Object.entries(localStorage))),saved);
   await p.screenshot({path:'test-results/composite-lab-'+record.data.id+'-complete.png'});
   await p.keyboard.press('KeyR');assert.equal(await frame.evaluate(()=>Game.state),'play');assert.equal(await frame.evaluate(()=>window.compositeFinished),false);
   await p.keyboard.press('Escape');await p.waitForURL(origin+'/#composite-playtest-lab');
   results.push({id:record.data.id,state:'win',deaths:0,ticks,seconds:ticks/120,liveControls:true,restart:true,returnToLab:true,savesUnchanged:true});
  }
  const invalid=await p.request.get(origin+'/api/composite?level=999');assert.equal(invalid.status(),400);
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(posts,[]);
  for(const [file,hash]of Object.entries(before))assert.equal(digest(file),hash,file+' changed');
  await c.close();fs.writeFileSync('test-results/composite-playtest-ui.json',JSON.stringify({results,pageErrors:errors,externalRequests:external,postRequests:posts,filesUnchanged:true},null,2)+'\n');
  console.log('PASS: three lab launches, live keyboard movement/jumps, restart, genuine keyboard victories, persistent completion, return controls, save isolation and unchanged fixture/production/batch bytes.');
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
