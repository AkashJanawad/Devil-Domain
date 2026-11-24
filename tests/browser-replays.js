// Browser replay verification uses genuine key events and the real game update/draw.
const {chromium}=require('playwright-core');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
(async()=>{
 require('node:child_process').execFileSync(process.execPath,['scripts/build.js','--android-release']);
 const root=path.resolve(__dirname,'..'),results=[];
 const allowed=['index.html','game-config.js','game.js','level-runtime.js','campaign.js','chapters.js','presentation.js','privacy.js','privacy.html','content/branding/menu-art.jpg','content/branding/logo.png','content/branding/icon.png','content/chapter-1.mp4','content/chapter-1-poster.jpg','content/season-one.js','content/season-two.js','style.css'];
 const server=http.createServer((req,res)=>{const release=req.url.startsWith('/release/');let name=req.url.replace(/^\/(?:release\/)?/,'')||'index.html';if(!allowed.includes(name)){res.writeHead(404).end();return}const base=release?'android/app/build/generated/releaseWeb/assets/public':'';res.setHeader('Content-Type',name.endsWith('.html')?'text/html':name.endsWith('.mp4')?'video/mp4':name.endsWith('.jpg')?'image/jpeg':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(path.join(root,base,name)))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 try{
  const context=await browser.newContext({viewport:{width:960,height:540},hasTouch:true,isMobile:true});
  // Deterministic test clock; gameplay still runs through the shipped update method.
  await context.addInitScript(()=>{window.requestAnimationFrame=()=>0});
  await context.addInitScript(()=>localStorage.setItem('dd_chapter1_intro_seen_v1','1'));
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const origin=`http://127.0.0.1:${server.address().port}`;
  await page.goto(origin);await page.locator('#btn-mute').click();
  const legacy=Array.from({length:11},(_,i)=>require('./replays/level-'+(30+i)+'.json'));
  const promoted=require('../forge/season2/catalog').approved.map(d=>{
   const trace=require('../forge/season2/results/'+d.id+'.json').solution.trace;
   return {level:d.id,actions:trace.actions,framesPerAction:trace.duration};
  });
  for(const replay of [...legacy,...promoted]){
   const level=replay.level;
   await page.evaluate(scale=>GamePresentation.setRenderScale(scale),[1,.75,2/3][level%3]);
   await page.evaluate(()=>showMenu());await page.evaluate(i=>ChapterUI.openSeason(Math.floor(i/50)+1),level-1);await page.locator('#level-grid button').nth(level-1).click();
   const result=await page.evaluate(r=>{
    const startingDeaths=Game.deaths;let tick=0;
    const apply=(code,on)=>{if(!!keys[code]!==on)window.dispatchEvent(new KeyboardEvent(on?'keydown':'keyup',{code,bubbles:true}))};
    for(const[d,j]of r.actions){apply('ArrowLeft',d<0);apply('ArrowRight',d>0);apply('Space',j);for(let i=0;i<r.framesPerAction&&Game.state==='play';i++){Game.update(STEP);tick++;if(tick%24===0)Game.draw()}if(Game.state!=='play')break}
    apply('ArrowLeft',false);apply('ArrowRight',false);apply('Space',false);Game.draw();
    return {level:r.level,state:Game.state,deaths:Game.deaths-startingDeaths,tick};
   },replay);
   assert.equal(result.state,'win');assert.equal(result.deaths,0);results.push(result);
   if(level===40)await page.screenshot({path:'test-results/level-40-browser-victory.png'});
  }
  await context.close();
  const production=await browser.newContext();const releasePage=await production.newPage();
  await releasePage.goto(origin+'/release/');
  assert.equal(await releasePage.locator('#level-grid button').count(),100);
  assert.equal(await releasePage.locator('#level-grid button:disabled').count(),99);
  assert.equal(await releasePage.evaluate(()=>DEVELOPER_UNLOCK_ALL_LEVELS),false);
  await releasePage.evaluate(()=>{localStorage.setItem('dd_done',JSON.stringify(Object.fromEntries(Array.from({length:30},(_,i)=>[i,true]))));localStorage.setItem('dd_deaths','77')});
  await releasePage.reload();assert.equal(await releasePage.locator('#level-grid button:disabled').count(),69);assert.equal(await releasePage.evaluate(()=>Game.deaths),77);
  await releasePage.evaluate(()=>localStorage.setItem('dd_done',JSON.stringify(Object.fromEntries(Array.from({length:50},(_,i)=>[i,true])))));
  await releasePage.reload();assert.equal(await releasePage.locator('#level-grid button').nth(50).isEnabled(),true);
  assert.equal(await releasePage.locator('#level-grid button').nth(51).isEnabled(),false);
  await releasePage.evaluate(i=>ChapterUI.openSeason(Math.floor(i/50)+1),50);await releasePage.locator('#level-grid button').nth(50).click();
  assert.equal(await releasePage.locator('#hud-levelname').textContent(),require('../forge/season2/levels')[0].name);
  // A save from the previous 60-level release can enter its first new level.
  await releasePage.evaluate(()=>localStorage.setItem('dd_done',JSON.stringify(Object.fromEntries(Array.from({length:60},(_,i)=>[i,true])))));
  await releasePage.reload();
  assert.equal(await releasePage.locator('#level-grid button').nth(61).isDisabled(),true);
  await releasePage.evaluate(i=>ChapterUI.openSeason(Math.floor(i/50)+1),60);await releasePage.locator('#level-grid button').nth(60).click();
  assert.equal(await releasePage.locator('#hud-levelname').textContent(),require('../forge/season2/next')[0].name);
  assert.equal(await releasePage.evaluate(()=>Game.deaths),77);
  // A completed 70-level save unlocks the newly approved batch, without unlocking its successors.
  await releasePage.evaluate(()=>localStorage.setItem('dd_done',JSON.stringify(Object.fromEntries(Array.from({length:70},(_,i)=>[i,true])))));
  await releasePage.reload();
  assert.equal(await releasePage.locator('#level-grid button').nth(70).isEnabled(),true);
  assert.equal(await releasePage.locator('#level-grid button').nth(71).isDisabled(),true);
  await releasePage.evaluate(i=>ChapterUI.openSeason(Math.floor(i/50)+1),70);await releasePage.locator('#level-grid button').nth(70).click();
  assert.equal(await releasePage.locator('#hud-levelname').textContent(),require('../forge/season2/levels-71-80')[0].name);
  assert.equal(await releasePage.evaluate(()=>Game.deaths),77);
  // The previous 80-level save unlocks Level 81, preserving deaths and progression.
  await releasePage.evaluate(()=>localStorage.setItem('dd_done',JSON.stringify(Object.fromEntries(Array.from({length:80},(_,i)=>[i,true])))));
  await releasePage.reload();
  assert.equal(await releasePage.locator('#level-grid button').nth(80).isEnabled(),true);
  assert.equal(await releasePage.locator('#level-grid button').nth(81).isDisabled(),true);
  await releasePage.evaluate(i=>ChapterUI.openSeason(Math.floor(i/50)+1),80);await releasePage.locator('#level-grid button').nth(80).click();
  assert.equal(await releasePage.locator('#hud-levelname').textContent(),require('../forge/season2/levels-81-90')[0].name);
  assert.equal(await releasePage.evaluate(()=>Game.deaths),77);
  // An existing 90-level save can continue with Level 91.
  await releasePage.evaluate(()=>localStorage.setItem('dd_done',JSON.stringify(Object.fromEntries(Array.from({length:90},(_,i)=>[i,true])))));
  await releasePage.reload();
  assert.equal(await releasePage.locator('#level-grid button').nth(90).isEnabled(),true);
  assert.equal(await releasePage.locator('#level-grid button').nth(91).isDisabled(),true);
  await releasePage.evaluate(i=>ChapterUI.openSeason(Math.floor(i/50)+1),90);await releasePage.locator('#level-grid button').nth(90).click();
  assert.equal(await releasePage.locator('#hud-levelname').textContent(),require('../forge/season2/levels-91-100')[0].name);
  assert.equal(await releasePage.evaluate(()=>Game.deaths),77);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('test-results/browser-replays.json',JSON.stringify(results,null,2)+'\n');
  console.log('PASS: 61 campaign victories including levels 51–100; release unlocks and legacy progress verified.');
 }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});
