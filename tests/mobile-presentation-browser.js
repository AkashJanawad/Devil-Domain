const {chromium}=require('playwright-core'),fs=require('node:fs'),assert=require('node:assert/strict');
const origin='http://127.0.0.1:8091';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const report={viewports:[],pixels:[],clock:[],errors:[]};
 try {
  for(const [width,height,dpr] of [[800,360,2],[915,412,2.625],[960,432,3],[740,360,2],[568,320,2],[360,800,2],[412,915,2.625],[1024,768,2],[1280,800,2]]){
   const c=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr,hasTouch:true,isMobile:true});
   const p=await c.newPage();p.on('pageerror',e=>report.errors.push(e.message));
   await p.goto(origin+'/game');await p.locator('.brand-logo').evaluate(i=>i.decode());
   await p.evaluate(()=>Promise.all(document.querySelector('#menu').getAnimations().map(a=>a.finished)));
   await p.evaluate(()=>{document.documentElement.requestFullscreen=()=>Promise.resolve();for(const [side,n]of [['left',28],['right',12],['bottom',16]])document.documentElement.style.setProperty('--safe-area-inset-'+side,n+'px');});
   const bounds=await p.locator('#menu').boundingBox();assert(Math.abs(bounds.width-width)<1&&Math.abs(bounds.height-height)<1);
   const overflow=await p.locator('.menu-options').evaluate(e=>e.scrollWidth>e.clientWidth+1);assert.equal(overflow,false,`${width} menu horizontal overflow`);
   await p.screenshot({path:`test-results/mobile-menu-${width}x${height}.png`});
   await p.locator('#chapter-list button').first().click();await p.waitForFunction(()=>document.querySelector('#chapter-video').currentTime>.1);
   const vb=await p.locator('#chapter-video').boundingBox(),skip=await p.locator('#cinematic-skip').boundingBox();
   assert(vb.x>=0&&vb.y>=0&&vb.width<=width+1&&vb.height<=height+1);
   assert(skip.x>=0&&skip.y>=0&&skip.x+skip.width<=width&&skip.y+skip.height<=height);
   const introDraws=await p.evaluate(()=>GamePresentation.stats.draws);await p.waitForTimeout(150);assert.equal(await p.evaluate(()=>GamePresentation.stats.draws),introDraws);
   if(width===800)await p.screenshot({path:'test-results/mobile-cinematic-800x360.png'});
   await p.locator('#cinematic-skip').click();await p.locator('#season-list button').first().click();
   await p.locator('#level-grid button').nth(49).scrollIntoViewIfNeeded();
   const last=await p.locator('#level-grid button').nth(49).boundingBox();assert(last.y>=0&&last.y+last.height<=height&&last.width>=43.9&&last.height>=43.9);
   assert.equal(await p.locator('.menu-options').evaluate(e=>e.scrollWidth>e.clientWidth+1),false,`${width} level grid overflow`);
   await p.locator('#level-grid button').first().click();assert.equal(await p.evaluate(()=>Game.levelIndex),0);
   const touch=await p.locator('#tc-jump').boundingBox();assert(touch.y+touch.height<=height&&touch.x+touch.width<=width);
   assert.equal(await p.locator('#tc-jump').evaluate(e=>getComputedStyle(e).backdropFilter),'none');
   report.viewports.push({width,height,dpr,fullViewportMenu:true,cinematicContained:true,level50Reachable:true,minTouchTarget:44});await c.close();
  }
  const c=await browser.newContext({viewport:{width:960,height:540},hasTouch:true,isMobile:true});
  await c.addInitScript(()=>{requestAnimationFrame=()=>0;});
  await c.route('**/presentation.js',r=>r.fulfill({contentType:'text/javascript',body:'window.__originalDraw=Game.draw;\n'+fs.readFileSync('presentation.js','utf8')}));
  const p=await c.newPage();await p.goto(origin+'/game');
  report.pixels=await p.evaluate(()=>{
   AudioFX.toggleMute();const results=[];
   for(const mode of ['light','dark'])for(const id of [0,33,71,99]){
    applyTheme(mode,false);Game.loadLevel(id);Game.state='play';Game.wipe=0;Game.shakeAmt=0;Game.time=1;
    __originalDraw.call(Game);const old=ctx.getImageData(0,0,960,540).data;
    Game.draw();const next=ctx.getImageData(0,0,960,540).data;let changed=0,max=0;
    for(let i=0;i<old.length;i+=4){let diff=0;for(let k=0;k<4;k++)diff=Math.max(diff,Math.abs(old[i+k]-next[i+k]));if(diff>8)changed++;max=Math.max(max,diff);}
    results.push({mode,level:id+1,pixelsDifferentByMoreThan8:changed,maxChannelDifference:max});
   }return results;
  });
  for(const item of report.pixels)assert(item.pixelsDifferentByMoreThan8<960*540*.01,JSON.stringify(item));
  report.clock=await p.evaluate(()=>{
   const results=[],update=Game.update;
   for(const fps of [24,30,40,60,90,120]){
    Game.loadLevel(0);Game.state='play';Game.time=0;Game.wipe=0;Game.wipeDir=0;Game.shakeAmt=0;last=1000;accumulator=0;suspended=false;let ticks=0;
    Game.update=function(dt){if(dt!==1/120)throw Error('Physics step changed');ticks++;update.call(this,dt);};
    for(let i=1;i<=fps;i++)frame(1000+i*1000/fps);
    results.push({fps,ticks,player:{...Game.player}});
   }Game.update=update;return results;
  });
  for(const sample of report.clock){assert.equal(sample.ticks,120);assert.deepEqual(sample.player,report.clock[0].player);}
  // Start with a fresh sampling window and cooldown after the mixed-clock test.
  await p.reload();
  report.adaptive=await p.evaluate(()=>{
   Game.loadLevel(0);Game.state='play';
   GamePresentation.setRenderScale(1);
   for(let i=0;i<16;i++)GamePresentation.observeFrame(125,45);
   Game.draw();const sustainedStalls=GamePresentation.stats;
   for(let i=0;i<260;i++)GamePresentation.observeFrame(40,10);
   Game.draw();const slow=GamePresentation.stats;
   for(let i=0;i<1900;i++)GamePresentation.observeFrame(16.667,1);
   Game.draw();return {sustainedStalls,slow,recovered:GamePresentation.stats};
  });
  assert.equal(report.adaptive.sustainedStalls.width,720);assert.equal(report.adaptive.slow.width,640);assert.equal(report.adaptive.recovered.width,960);
  const beforePlayer=await p.evaluate(()=>({...Game.player}));await p.evaluate(()=>{Game.draw();Game.draw();});assert.deepEqual(await p.evaluate(()=>({...Game.player})),beforePlayer);
  await c.close();assert.deepEqual(report.errors,[]);
  fs.writeFileSync('test-results/mobile-presentation-browser.json',JSON.stringify(report,null,2));console.log('PASS: 9 viewports, cutout insets, intro, grid/touch sizing, renderer equivalence, adaptive recovery and 24–120 Hz fixed-step equivalence.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
