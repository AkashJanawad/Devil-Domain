// Desktop Chrome comparison, NOT a measurement of any physical Android phone.
const {chromium}=require('playwright-core');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'..'),label=process.argv[2]||'after';
(async()=>{
 const server=http.createServer((req,res)=>{let name=req.url.split('?')[0].slice(1)||'index.html';if(name.includes('..'))return res.writeHead(403).end();const file=path.join(root,name);if(!fs.existsSync(file)||!fs.statSync(file).isFile())return res.writeHead(404).end();res.setHeader('Content-Type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':name.endsWith('.png')?'image/png':name.endsWith('.mp4')?'video/mp4':'text/html');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const result={label,environment:'Desktop headless Chrome; CPU throttle is synthetic, not phone FPS',profiles:[]};
 try{
  for(const rate of [1,4,6]){
   const c=await browser.newContext({viewport:{width:800,height:360},isMobile:true,hasTouch:true,deviceScaleFactor:2});
   const p=await c.newPage(),cdp=await c.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate});
   await p.goto(`http://127.0.0.1:${server.address().port}`);
   await p.evaluate(()=>{AudioFX.toggleMute();document.documentElement.requestFullscreen=()=>Promise.resolve();});
   const data=await p.evaluate(async()=>{
    const stats={updates:0,draws:0,updateMs:0,drawMs:0},oldUpdate=Game.update,oldDraw=Game.draw;
    Game.update=function(dt){const t=performance.now();oldUpdate.call(this,dt);stats.updateMs+=performance.now()-t;stats.updates++};
    Game.draw=function(){const t=performance.now();oldDraw.call(this);stats.drawMs+=performance.now()-t;stats.draws++};
    const snapshot=()=>({...stats}),diff=(a,b)=>Object.fromEntries(Object.keys(a).map(k=>[k,a[k]-b[k]]));
    let before=snapshot();await new Promise(r=>setTimeout(r,1200));const menu=diff(snapshot(),before);
    startGame(98);Game.wipe=0;Game.wipeDir=0;
    // Constant, hazard-rich scene: draw work benchmark independent of deaths/restarts.
    const nativeUpdate=Game.update;Game.update=function(dt){stats.updates++;Game.time+=dt;};
    const samples=[];let prior=0;before=snapshot();const start=performance.now();
    await new Promise(resolve=>{function sample(now){if(prior)samples.push(now-prior);prior=now;if(now-start>=3500)resolve();else requestAnimationFrame(sample);}requestAnimationFrame(sample);});
    const scene=diff(snapshot(),before);Game.update=nativeUpdate;
    const sorted=samples.slice().sort((a,b)=>a-b),mean=samples.reduce((a,b)=>a+b,0)/samples.length;
    return {menu,scene,frameIntervalMeanMs:mean,frameIntervalP95Ms:sorted[Math.floor(sorted.length*.95)],sampledFrames:samples.length,canvas:[cv.width,cv.height],renderInfo:window.GamePresentation?.stats||null};
   });
   result.profiles.push({cpuThrottle:rate,...data});await c.close();
  }
  fs.writeFileSync(`test-results/mobile-performance-${label}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
