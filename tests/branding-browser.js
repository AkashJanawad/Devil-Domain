// Visual QA against the persistent local server, plus native asset previews.
const {chromium}=require('playwright-core');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),origin='http://127.0.0.1:8091';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const evidence={screens:[],errors:[],failedAssets:[]};
 try {
  for(const [width,height,mobile] of [[960,540,true],[740,360,true],[1280,800,false]]) {
   const c=await browser.newContext({viewport:{width,height},isMobile:mobile,hasTouch:mobile});
   const p=await c.newPage();p.on('pageerror',e=>evidence.errors.push(e.message));
   p.on('response',r=>{if(r.status()>=400)evidence.failedAssets.push(r.url());});
   await p.goto(origin+'/game');
   await p.locator('.brand-logo').evaluate(img=>img.decode());
   await p.evaluate(()=>Promise.all(document.querySelector('#menu').getAnimations().map(a=>a.finished)));
   assert.equal(await p.locator('.brand-logo').evaluate(img=>img.naturalWidth),1200);
   assert.equal(await p.locator('#chapter-list button').count(),5);
   assert.equal(await p.evaluate(()=>LEVELS.length),100);
   const box=await p.locator('.brand-logo').boundingBox();assert(box.y>=0&&box.y+box.height<height);
   await p.screenshot({path:`test-results/branding-menu-${width}x${height}.png`});
   await p.locator('#chapter-list button').first().click();
   await p.waitForFunction(()=>document.querySelector('#chapter-video').currentTime>0.1);
   await p.locator('#cinematic-skip').click();
   await p.locator('#season-list button').first().click();
   await p.locator('#level-grid button').first().click();
   assert.equal(await p.evaluate(()=>Game.levelIndex),0);
   evidence.screens.push({width,height,mobile,logoLoaded:true,chapterAndGameplayReachable:true});
   await c.close();
  }
  const xml=fs.readFileSync(path.join(root,'android/app/src/main/res/drawable/ic_launcher_monochrome.xml'),'utf8');
  const paths=[...xml.matchAll(/android:pathData="([^"]+)"/g)].map(m=>`<path fill="white" fill-rule="evenodd" d="${m[1]}"/>`).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="432" height="432" viewBox="0 0 108 108"><g transform="translate(5.4 5.4) scale(.9)">${paths}</g></svg>`;
  fs.writeFileSync(path.join(root,'branding/exports/monochrome-adaptive.svg'),svg);
  const p=await browser.newPage({viewport:{width:432,height:432}});
  await p.setContent(`<style>body{margin:0;background:transparent}</style>${svg}`);
  await p.screenshot({path:'branding/exports/monochrome-adaptive-432.png',omitBackground:true});
  const image=(file)=>'data:image/png;base64,'+fs.readFileSync(path.join(root,'branding/exports',file)).toString('base64');
  await p.setViewportSize({width:1100,height:850});
  await p.setContent(`<style>body{margin:0;padding:28px;background:#100b1a;color:#eee;font:16px system-ui}h1{margin:0 0 20px;font-size:25px}.row{display:flex;gap:28px;align-items:center;margin:22px 0}figure{margin:0;text-align:center}figcaption{margin-top:10px;color:#c5b9d7}.icon{width:128px;height:128px;background:#805aa6;overflow:hidden;position:relative}.circle{border-radius:50%}.squircle{border-radius:28%}.adaptive img{position:absolute;width:150%;height:150%;left:-25%;top:-25%}.theme{background:#514061}.theme img{filter:drop-shadow(0 0 0 #fff)}.logo{height:180px}.feature{width:820px}</style><h1>DEVIL DOMAIN · VERSION 1 BRAND ASSETS</h1><div class="row"><img class="logo" src="${image('logo-transparent-512.png')}"><figure><img width="128" src="${image('play-store-icon-512.png')}"><figcaption>Play Store</figcaption></figure><figure><div class="icon circle adaptive"><img src="${image('adaptive-foreground-432.png')}"></div><figcaption>Adaptive · circle</figcaption></figure><figure><div class="icon squircle adaptive"><img src="${image('adaptive-foreground-432.png')}"></div><figcaption>Adaptive · squircle</figcaption></figure><figure><div class="icon circle adaptive theme"><img src="${image('monochrome-adaptive-432.png')}"></div><figcaption>Themed · vector</figcaption></figure></div><img class="feature" src="${image('play-store-feature-1024x500.png')}"><p>Original full logo · Launcher emblem · Mask-safe layers · Store feature artwork</p>`);
  await p.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
  await p.screenshot({path:'branding/brand-preview.png'});
  assert.deepEqual(evidence.errors,[]);assert.deepEqual(evidence.failedAssets,[]);
  fs.writeFileSync('test-results/branding-browser.json',JSON.stringify(evidence,null,2));
  console.log(JSON.stringify(evidence));
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
