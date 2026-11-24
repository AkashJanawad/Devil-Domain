// Loaded only by the developer preview. The preview already isolates localStorage.
(async()=>{
 const notify=(action,message)=>parent.postMessage({type:'composite-playtest',action,message},location.origin);
 try {
  suspendGame();
  const params=new URLSearchParams(location.search),season2=params.has('season2');
  const id=Number(params.get(season2?'season2':'composite'));
  const response=await fetch((season2?'/api/season2':'/api/composite')+'?level='+id);
  if(!response.ok)throw Error('Could not load the experimental fixture');
  const data=await response.json();
  const slot=LEVELS.length;
  LEVELS.push({name:data.name,build:()=>ForgeRuntime.build(data)});
  window.compositeFixture=data;
  window.compositeFinished=false;
  // The engine reloads on death and restart; keep the developer identity each time.
  const loadLevel=Game.loadLevel;
  Game.loadLevel=function(i){
   loadLevel.call(this,i);
   if(i===slot)document.getElementById('hud-levelnum').textContent=season2?'S2 · '+id:'CMP '+String.fromCharCode(65+id-481);
  };
  const update=Game.update;
  // Keep the genuine win visible instead of advancing into campaign/end screens.
  Game.update=function(dt){
   if(window.compositeFinished)return;
   update.call(this,dt);
   if(this.state==='win'){
    window.compositeFinished=true;clearInput();suspendGame();
    notify('complete','LEVEL COMPLETE — well played!');
   }
  };
  window.restartComposite=()=>{
   window.compositeFinished=false;Game.wipeNext=null;Game.wipe=0;Game.wipeDir=0;
   Game.restartLevel(true);Game.draw();resumeGame();window.focus();notify('ready','Playing — progress is not saved');
  };
  const returnToLab=()=>{clearInput();suspendGame();notify('return','');};
  addEventListener('devildomain-back',event=>{event.stopImmediatePropagation();returnToLab();},true);
  addEventListener('keydown',event=>{
   if(event.code==='Escape'){
    event.preventDefault();event.stopImmediatePropagation();returnToLab();
   }else if(event.code==='KeyR'&&window.compositeFinished){
    event.preventDefault();event.stopImmediatePropagation();window.restartComposite();
   }
  },true);
  startGame(slot);Game.wipe=0;Game.wipeDir=0;
  Game.draw();resumeGame();window.focus();notify('ready','Playing — progress is not saved');
 }catch(error){suspendGame();notify('error',error.message);}
})();
