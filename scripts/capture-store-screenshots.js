// Real-engine screenshots from the locked release web assets; no fabricated art.
const {chromium}=require('playwright-core'),fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),assets=path.join(root,'android/app/build/generated/releaseWeb/assets/public');
(async()=>{
 const server=http.createServer((req,res)=>{const name=req.url.slice(1)||'index.html';if(name.includes('..'))return res.writeHead(403).end();const file=path.join(assets,name);if(!fs.existsSync(file))return res.writeHead(404).end();res.setHeader('Content-Type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':name.endsWith('.png')?'image/png':'text/html');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),evidence=[];
 try{
  const c=await browser.newContext({viewport:{width:960,height:540},deviceScaleFactor:2,hasTouch:true,isMobile:true});
  await c.addInitScript(()=>{requestAnimationFrame=()=>0;localStorage.setItem('dd_chapter1_intro_seen_v1','1');});
  const p=await c.newPage();await p.goto(`http://127.0.0.1:${server.address().port}`);
  await p.evaluate(()=>{AudioFX.toggleMute();document.documentElement.requestFullscreen=()=>Promise.resolve();});
  fs.mkdirSync('releases/v1-production/screenshots',{recursive:true});
  for(const [index,level,mode,ticks]of [[1,72,'dark',120],[2,91,'light',160],[3,100,'dark',150]]){
   const trace=require('../forge/season2/results/'+level+'.json').solution.trace;
   const state=await p.evaluate(({level,mode,ticks,trace})=>{
    if(DEVELOPER_UNLOCK_ALL_LEVELS)throw Error('Not release configuration');
    applyTheme(mode,false);startGame(level-1);Game.wipe=0;Game.wipeDir=0;
    let count=0;
    const key=(code,value)=>{if(!!keys[code]!==value)dispatchEvent(new KeyboardEvent(value?'keydown':'keyup',{code,bubbles:true}));};
    for(const [direction,jump]of trace.actions){key('ArrowLeft',direction<0);key('ArrowRight',direction>0);key('Space',jump);for(let i=0;i<trace.duration&&count<ticks;i++){Game.update(STEP);count++;}if(count>=ticks||Game.state!=='play')break;}
    Game.draw();return {level,name:Game.level.name,state:Game.state,ticks:count,player:{x:Game.player.x,y:Game.player.y}};
   },{level,mode,ticks,trace});
   assert.equal(state.state,'play');
   await p.waitForTimeout(450); // Let the real theme transition finish before capture.
   const file=`screenshots/0${index}-level-${level}.jpg`;await p.screenshot({path:'releases/v1-production/'+file,type:'jpeg',quality:95});evidence.push({...state,file,width:1920,height:1080,source:'Locked release assets in Chrome touch viewport; actual physics replay; not a physical-device screenshot'});
  }
  fs.writeFileSync('releases/v1-production/screenshots/CAPTURE_NOTES.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence));
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
