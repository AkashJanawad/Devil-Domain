const {chromium}=require('playwright-core'),assert=require('node:assert/strict'),fs=require('node:fs');
const origin='http://127.0.0.1:8091';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const errors=[],external=[];
 async function context(){const c=await browser.newContext({viewport:{width:960,height:540},isMobile:true,hasTouch:true});
  await c.route('**/game-config.js',r=>r.fulfill({contentType:'text/javascript',body:'window.DEVIL_DOMAIN_CONFIG={BUILD_MODE:"release",DEVELOPER_UNLOCK_ALL_LEVELS:false}'}));
  c.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(origin))external.push(r.url());});});return c;}
 try{
  const c=await context(),p=await c.newPage();await p.goto(origin+'/game');
  await p.evaluate(()=>{localStorage.setItem('dd_done','{"0":true}');localStorage.setItem('dd_deaths','17');});await p.reload();
  assert.equal(await p.locator('#level-grid').isVisible(),false);
  await p.locator('#chapter-list button').first().click();
  await p.waitForFunction(()=>document.getElementById('chapter-video').currentTime>0.2);
  assert.equal(await p.evaluate(()=>localStorage.getItem('dd_chapter1_intro_seen_v1')),'1');
  await p.screenshot({path:'test-results/chapter-1-cinematic.png'});
  await p.evaluate(()=>dispatchEvent(new Event('devildomain-pause')));
  assert.equal(await p.locator('#chapter-video').evaluate(v=>v.paused),true);
  await p.getByRole('button',{name:'Resume introduction',exact:true}).click();
  await p.waitForFunction(()=>document.getElementById('chapter-cinematic').hidden,null,{timeout:26000});
  assert.equal(await p.locator('#season-list button').count(),2);
  assert.equal(await p.locator('#season-list button').nth(1).isDisabled(),true);
  assert.deepEqual(await p.evaluate(()=>({done:localStorage.getItem('dd_done'),deaths:localStorage.getItem('dd_deaths')})),{done:'{"0":true}',deaths:'17'});
  await p.screenshot({path:'test-results/chapter-1-seasons.png'});
  await p.locator('#season-list button').first().click();assert.equal(await p.locator('#level-grid button:visible').count(),50);
  await p.locator('#level-grid button').nth(1).click();assert.equal(await p.evaluate(()=>Game.levelIndex),1);
  await p.keyboard.press('Escape');await p.getByRole('button',{name:'← Seasons',exact:true}).click();await p.getByRole('button',{name:'← Chapters',exact:true}).click();
  await p.locator('#chapter-list button').first().click();assert.equal(await p.locator('#chapter-cinematic').isVisible(),false);
  await p.reload();await p.locator('#chapter-list button').first().click();assert.equal(await p.locator('#chapter-cinematic').isVisible(),false);
  await p.evaluate(()=>localStorage.setItem('dd_done',JSON.stringify(Object.fromEntries(Array.from({length:50},(_,i)=>[i,true])))));await p.reload();
  await p.locator('#chapter-list button').first().click();await p.locator('#season-list button').nth(1).click();assert.equal(await p.locator('#level-grid button:visible').count(),50);
  assert.equal(await p.locator('#level-grid button:visible').first().textContent(),'51');
  await p.screenshot({path:'test-results/chapter-1-season-2.png'});await c.close();
  const fresh=await context(),q=await fresh.newPage();await q.goto(origin+'/game');await q.locator('#chapter-list button').first().click();await q.getByRole('button',{name:'Skip introduction',exact:true}).click();
  await q.reload();await q.locator('#chapter-list button').first().click();assert.equal(await q.locator('#chapter-cinematic').isVisible(),false);await fresh.close();
  const failed=await context();await failed.route('**/chapter-1.mp4',r=>r.abort());const z=await failed.newPage();await z.goto(origin+'/game');await z.locator('#chapter-list button').first().click();
  await z.waitForFunction(()=>document.getElementById('cinematic-status').textContent.includes('could not play'));
  await z.getByRole('button',{name:'Skip introduction',exact:true}).click();assert.equal(await z.locator('#season-list').isVisible(),true);await failed.close();
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  fs.writeFileSync('test-results/chapters-browser.json',JSON.stringify({naturalVideoCompletion:true,skip:true,reloadDoesNotRepeat:true,freshInstallPlays:true,pauseResume:true,videoErrorRecovery:true,seasonsOf50:true,releaseUnlocks:true,previousSavesPreserved:true,externalRequests:external,pageErrors:errors},null,2));
  console.log('PASS: real video completion, once-only playback, skip, pause/resume, failure recovery, chapter/season navigation, release unlocks and saves.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
