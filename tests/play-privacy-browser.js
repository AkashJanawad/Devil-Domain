const {chromium}=require('playwright-core'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),report=[];
 try{
  for(const [width,height]of [[568,320],[800,360],[360,800]]){
   const c=await browser.newContext({viewport:{width,height},hasTouch:true,isMobile:true});
   const p=await c.newPage(),external=[],errors=[];
   p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8091/'))external.push(r.url());});
   await p.goto('http://127.0.0.1:8091/game');
   const button=await p.locator('#privacy-open').boundingBox();assert(button.y>=0&&button.y+button.height<=height,`${width} privacy link clipped`);
   const before=await p.evaluate(()=>({done:localStorage.getItem('dd_done'),deaths:localStorage.getItem('dd_deaths'),intro:localStorage.getItem('dd_chapter1_intro_seen_v1')}));
   await p.locator('#privacy-open').click();await p.locator('#privacy-content h1').waitFor();
   assert((await p.locator('#privacy-content').innerText()).includes('janawada2@gmail.com'));
   assert((await p.locator('#privacy-content').innerText()).includes('Akash AJ'));
   const dialog=await p.locator('#privacy-dialog').boundingBox();assert(dialog.x>=0&&dialog.y>=0&&dialog.x+dialog.width<=width&&dialog.y+dialog.height<=height);
   await p.locator('#privacy-content h2').last().scrollIntoViewIfNeeded();
   await p.screenshot({path:`test-results/play-privacy-${width}x${height}.png`});
   await p.keyboard.press('Escape');assert.equal(await p.locator('#privacy-dialog').evaluate(d=>d.open),false);
   await p.locator('#privacy-open').click();await p.evaluate(()=>dispatchEvent(new Event('devildomain-back')));assert.equal(await p.locator('#privacy-dialog').evaluate(d=>d.open),false);
   await p.locator('#privacy-open').click();await p.locator('#privacy-close').click();
   assert.deepEqual(await p.evaluate(()=>({done:localStorage.getItem('dd_done'),deaths:localStorage.getItem('dd_deaths'),intro:localStorage.getItem('dd_chapter1_intro_seen_v1')})),before);
   assert.deepEqual(external,[]);assert.deepEqual(errors,[]);
   report.push({width,height,localPolicyLoaded:true,closeEscapeNativeBack:true,savesUnchanged:true,externalRequests:external});await c.close();
  }
  fs.writeFileSync('test-results/play-privacy-browser.json',JSON.stringify(report,null,2));console.log('PASS: offline privacy viewer, contact, small-phone layout, close/Escape/native Back and unchanged saves.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
