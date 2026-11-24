// Independent keyboard-input replay in Chrome. Uses a temporary loopback server;
// never starts the mutating Forge dashboard or changes the campaign package.
const {chromium}=require('playwright-core'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const F=require('../core'),{runtime}=require('../telemetry'),{summarize}=require('../measure');
async function main(){
 const composites=process.argv.includes('--composites');
 const root=path.resolve(__dirname,'../..'),output=path.join(__dirname,composites?'../composition/results':'results');
 const allowed=['index.html','game-config.js','game.js','level-runtime.js','campaign.js','content/season-one.js','style.css'];
 const server=http.createServer((req,res)=>{
  const name=req.url==='/'?'index.html':req.url.slice(1);
  if(!allowed.includes(name)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':'text/html');
  res.end(fs.readFileSync(path.join(root,name)));
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try {
  browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const context=await browser.newContext({viewport:{width:1280,height:720}}),errors=[],external=[];
  await context.addInitScript(()=>window.requestAnimationFrame=()=>0);
  const page=await context.newPage(),origin='http://127.0.0.1:'+server.address().port;
  await page.route('**/*',route=>{if(new URL(route.request().url()).origin!==origin){external.push(route.request().url());return route.abort();}return route.continue();});
  page.on('pageerror',e=>errors.push(e.message));await page.goto(origin);
  assert.equal(await page.evaluate(()=>LEVELS.length),50);
  await page.evaluate(code=>(0,eval)(code),runtime);
  const experiments=require(composites?'../composition/levels':'./encounters').map(d=>JSON.parse(fs.readFileSync(path.join(output,d.id+'.json'))));
  const variants=composites?[]:[{...JSON.parse(fs.readFileSync(path.join(output,'492-fine.json'))),artifactKey:'492-fine'}];
  const records=[...experiments,...variants,...require('../fixtures/approved-v1.json')],results=[];
  for(const record of records){
   const artifactKey=record.artifactKey||record.data.id;
   assert.equal(F.replay(record.data,record.solution.trace).status,'VERIFIED');
   await page.evaluate(d=>{
    LEVELS.push({name:d.name,build:()=>ForgeRuntime.build(d)});startGame(LEVELS.length-1);
    Game.deaths=0;Game.wipe=0;Game.wipeDir=0;
    for(const k of Object.keys(AudioFX))AudioFX[k]=()=>false;
    if(d.developerOnly)document.getElementById('hud-levelnum').textContent=(d.composition?'CMP ':'LAB ')+String.fromCharCode(65+d.id-(d.composition?481:491));
    initForgeTracking(d.experiment||{},true);Game.draw();
   },record.data);
   if(record.data.developerOnly)await page.screenshot({path:path.join(output,artifactKey+'-layout.png')});
   const result=await page.evaluate(trace=>{
    const press=(code,on)=>{if(!!keys[code]!==on)window.dispatchEvent(new KeyboardEvent(on?'keydown':'keyup',{code,bubbles:true}));};
    for(const a of trace.actions){
     press('ArrowLeft',a[0]<0);press('ArrowRight',a[0]>0);press('Space',a[1]);
     for(let i=0;i<trace.duration&&Game.state==='play';i++){
      const before=forgeBeforeTick();Game.update(STEP);forgeAfterTick(before,a);
     }
     Game.draw();if(Game.state!=='play')break;
    }
    clearInput();return {state:Game.state,deaths:Game.deaths,ticks:forgeTracking.tick,end:[Game.player.x,Game.player.y],tracking:forgeTracking};
   },record.solution.trace);
   const proof=F.replay(record.data,record.solution.trace);
   assert.equal(result.state,'win');assert.equal(result.deaths,0);assert.equal(result.ticks,proof.ticks);assert.deepEqual(result.end,proof.end.slice(0,2));
   if(record.data.developerOnly){
    const m=summarize(result.tracking.samples,result.tracking.events,record.data.experiment);
    assert.deepEqual(m.seconds,record.measurements.seconds);assert.deepEqual(m.events,record.measurements.events);
    assert.deepEqual(result.tracking.counts,record.measurements.interactionTicks);
    if(record.data.composition)assert.deepEqual(result.tracking.encounters.map(({baseline,...r})=>r),record.measurements.encounters);
    await page.screenshot({path:path.join(output,artifactKey+'-win.png')});
   }
   results.push({id:record.data.id,actionTicks:record.solution.trace.duration,hash:F.hash(record.data),state:result.state,deaths:result.deaths,ticks:result.ticks,seconds:result.ticks/120,...(record.data.composition?{encounters:result.tracking.encounters.map(({baseline,...r})=>r)}:{})});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  fs.writeFileSync(path.join(output,'browser.json'),JSON.stringify({engineHash:F.engineHash(),results,pageErrors:errors,externalRequests:external},null,2)+'\n');
  console.log('PASS: '+(composites?'three composites':'three experiments and one 25ms-input variant')+' plus ten production Chrome keyboard replays; exact Node tick/position parity; no external requests.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
