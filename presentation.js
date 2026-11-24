// Display and touch input retain the original drawing and physics methods. The world
// stays 960x540 and simulation stays at 120 Hz at every display/raster resolution.
(()=>{
 const nativeDraw=Game.draw,tiers=[1,.75,2/3];
 let scale=1,tier=0,draws=0,screen=Game.state;
 let intervalTotal=0,intervalCount=0,slowFrames=0,stableMs=0,cooldown=0;
 document.body.dataset.gameScreen=screen;
 // Interpret a tap in simulation time starting at takeoff, including a tap
 // buffered just before landing. Read the finger duration from pointer events
 // so even a down/up pair between paints has the intended height.
 const jumpButton=document.getElementById('tc-jump');
 const jumpFingers=new Set();
 let gesture=null;
 jumpButton.addEventListener('pointerdown',event=>{
  if(!jumpFingers.size){
   gesture={pressedAt:event.timeStamp,holdFor:Infinity,age:null};
  }
  jumpFingers.add(event.pointerId);
 });
 jumpButton.addEventListener('pointerup',event=>{
  if(!jumpFingers.delete(event.pointerId)||jumpFingers.size||!gesture)return;
  const pressedSeconds=Math.max(0,(event.timeStamp-gesture.pressedAt)/1000);
  gesture.holdFor=Math.min(.21,.10+.75*pressedSeconds);
 });
 function cancelFinger(event){
  if(jumpFingers.delete(event.pointerId)&&!jumpFingers.size){
   gesture=null;
   jumpBuffered=0;
  }
 }
 jumpButton.addEventListener('pointercancel',cancelFinger);
 jumpButton.addEventListener('lostpointercapture',cancelFinger);
 inputResets.push(()=>{gesture=null;jumpFingers.clear();});
 function updateStep(){
  const active=gesture;
  if(!active||Game.state!=='play'){Game.update(STEP);return;}
  const physical=touch.jump;
  const waiting=active.age===null;
  const canConsumeBuffer=waiting&&jumpBuffered>STEP;
  touch.jump=physical||waiting||active.age+1e-9<active.holdFor;
  Game.update(STEP);
  if(gesture!==active)return; // Loading a level clears every input.
  touch.jump=physical;
  if(waiting){
   if(jumpBuffered>0)return;
   if(!canConsumeBuffer||!Game.player.jumping){gesture=null;return;}
   active.age=0;
  }
  active.age+=STEP;
  if(!Game.player.jumping||active.age>=active.holdFor)gesture=null;
 }
 function setScale(value){
  const next=tiers.indexOf(value);if(next<0)throw Error('Unsupported render scale');
  tier=next;scale=value;
 }
 // Use measured frame delivery, not RAM/model detection. Hysteresis avoids
 // quality flicker. A slow device gets a smaller raster, never different physics.
 function observe(ms,cost){
  if(!IS_TOUCH||ms<=0||ms>250)return;
  cooldown=Math.max(0,cooldown-ms);intervalTotal+=ms;intervalCount++;
  if(ms>25)slowFrames++;
  stableMs=ms<19&&cost<6?stableMs+ms:0;
  if(intervalTotal<1800||intervalCount<16)return;
  if(!cooldown&&slowFrames/intervalCount>.2&&tier<tiers.length-1){setScale(tiers[tier+1]);cooldown=5000;stableMs=0;}
  else if(!cooldown&&stableMs>12000&&tier>0){setScale(tiers[tier-1]);cooldown=15000;stableMs=0;}
  intervalTotal=intervalCount=slowFrames=0;
 }
 Game.draw=function(){
  // Resize immediately before repaint so changing quality never clears a frame
  // that was just submitted. CSS display size and world coordinates stay fixed.
  if(cv.width!==Math.round(W*scale)){cv.width=Math.round(W*scale);cv.height=Math.round(H*scale);}
  ctx.setTransform(scale,0,0,scale,0,0);nativeDraw.call(this);draws++;
 };
 // The original first rAF schedules the current 'frame' binding next. Existing
 // focus/native lifecycle handlers still own suspended, last and accumulator.
 frame=function(now){
  if(screen!==Game.state){screen=Game.state;document.body.dataset.gameScreen=screen;}
  const elapsed=Math.max(0,now-last),dt=Math.min(elapsed/1000,.1);last=now;
  if(suspended||document.hidden||Game.state==='menu'||Game.state==='end'){
   accumulator=0;intervalTotal=intervalCount=slowFrames=stableMs=0;
  }else{
   const start=performance.now();accumulator+=dt;
   while(accumulator+1e-10>=STEP){updateStep();accumulator-=STEP;}
   Game.draw();observe(elapsed,performance.now()-start);
  }
  requestAnimationFrame(frame);
 };
 window.GamePresentation={setRenderScale:setScale,observeFrame:observe,get stats(){return {width:cv.width,height:cv.height,scale,draws};}};
})();
