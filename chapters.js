// Chapter navigation and offline first-visit cinematic; gameplay stays in game.js.
(()=>{
 if(location.pathname==='/preview')return;
 const seenKey='dd_chapter1_intro_seen_v1';
 const chapters=Array.from({length:5},(_,i)=>({id:i+1,first:i*100+1,last:(i+1)*100,name:i===0?'The Stolen Light':'Coming soon'}));
 const byId=id=>document.getElementById(id),grid=byId('level-grid'),list=byId('season-list'),chapterList=byId('chapter-list');
 const overlay=byId('chapter-cinematic'),video=byId('chapter-video'),resume=byId('cinematic-play'),status=byId('cinematic-status');
 let view='chapters',chapterId=1,seasonId=1,active=false,afterIntro=null;
 const allowed=id=>{const p=seasonProgress(id);return p.available&&(DEVELOPER_UNLOCK_ALL_LEVELS||p.unlocked)};
 const nextLevel=chapter=>{const done=getDone(),first=(chapter-1)*100,end=Math.min(chapter*100,LEVELS.length);for(let i=first;i<end;i++)if(!done[i])return i;return first;};
 const button=(label,fn,disabled=false)=>{const b=document.createElement('button');b.textContent=label;b.disabled=disabled;b.onclick=fn;return b;};
 function render(){
  byId('menu').dataset.view=view;
  chapterList.innerHTML='';list.innerHTML='';
  chapterList.hidden=view!=='chapters';list.hidden=view!=='seasons';grid.hidden=view!=='levels';
  byId('chapter-back').hidden=view==='chapters';
  byId('chapter-back').textContent=view==='levels'?'← Seasons':'← Chapters';
  byId('level-mode-label').textContent=view==='chapters'?'CHAPTERS':view==='seasons'?'CHAPTER '+chapterId+' — '+chapters[chapterId-1].name:'SEASON '+seasonId+' · LEVELS '+((seasonId-1)*50+1)+'–'+Math.min(seasonId*50,LEVELS.length);
  byId('play-btn').textContent=view==='chapters'?'CHOOSE CHAPTER':'CONTINUE CHAPTER '+chapterId;
  for(const c of chapters){
   const total=Math.max(0,Math.min(LEVELS.length,c.last)-c.first+1),done=getDone();
   const completed=Array.from({length:total},(_,i)=>!!done[c.first+i-1]).filter(Boolean).length;
   chapterList.appendChild(button('CHAPTER '+c.id+(total?' · '+c.name+' · '+completed+'/'+total:' · Coming soon'),()=>openChapter(c.id),!total||!allowed((c.id-1)*2+1)));
  }
  for(const id of [(chapterId-1)*2+1,chapterId*2]){const p=seasonProgress(id);list.appendChild(button('SEASON '+id+' · Levels '+((id-1)*50+1)+'–'+Math.min(id*50,LEVELS.length)+' · '+p.completed+'/'+p.total,()=>openSeason(id),!allowed(id)));}
  Array.from(grid.children).forEach((b,i)=>b.hidden=Math.floor(i/50)!==seasonId-1);
 }
 function finish(){if(!active)return;active=false;video.pause();video.removeAttribute('src');video.load();overlay.hidden=true;document.body.classList.remove('cinematic-active');byId('menu').inert=false;byId('topbar').inert=false;const callback=afterIntro;afterIntro=null;callback?.();byId('chapter-back').focus();}
 function playVideo(){if(!active)return;resume.hidden=true;status.textContent='';video.play().catch(()=>{if(active){resume.hidden=false;status.textContent=video.error?'Video could not play. Retry or continue to the chapter.':'Tap to play the chapter introduction.';}});}
 function intro(callback){
  if(readValue(seenKey)==='1'){callback();return;}
  afterIntro=callback;active=true;clearInput();setTouchControlsVisible(false);Game.state='menu';
  overlay.hidden=false;byId('menu').inert=true;byId('topbar').inert=true;document.body.classList.add('cinematic-active');
  video.muted=AudioFX.isMuted();video.src='content/chapter-1.mp4';video.currentTime=0;byId('cinematic-skip').focus();playVideo();
 }
 function openChapter(id){if(!chapters[id-1]||!allowed((id-1)*2+1)||active)return;chapterId=id;const show=()=>{view='seasons';render();};if(id===1)intro(show);else show();}
 function openSeason(id){if(!allowed(id)||active)return;chapterId=Math.ceil(id/2);seasonId=id;view='levels';render();}
 function back(){if(active){saveValue(seenKey,'1');finish();return;}view=view==='levels'?'seasons':'chapters';render();}
 byId('chapter-back').onclick=back;
 video.addEventListener('playing',()=>{if(active)saveValue(seenKey,'1');});
 video.addEventListener('ended',finish);
 video.addEventListener('error',()=>{if(active){resume.hidden=false;status.textContent='Video could not play. Retry or continue to the chapter.';}});
 resume.onclick=()=>{if(video.error)video.load();playVideo();};
 byId('cinematic-skip').onclick=()=>{saveValue(seenKey,'1');finish();};
 const pause=()=>{if(active){video.pause();resume.hidden=false;resume.textContent='Resume introduction';}};
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
 addEventListener('devildomain-pause',pause);
 for(const name of ['keydown','devildomain-back'])addEventListener(name,e=>{if(name==='keydown'&&e.code!=='Escape')return;if(active||Game.state==='menu'){e.preventDefault();e.stopImmediatePropagation();back();}},true);
 // Replace the old Play listener: entering a chapter always goes through its introduction.
 const oldPlay=byId('play-btn'),play=oldPlay.cloneNode(true);oldPlay.replaceWith(play);
 play.onclick=()=>{if(view==='chapters'){openChapter(Math.ceil((nextLevel(1)+1)/100));return;}const next=nextLevel(chapterId);openSeason(Math.floor(next/50)+1);startGame(next);};
 byId('end-menu-btn').textContent='BACK TO CHAPTERS';byId('end-menu-btn').onclick=()=>{view='chapters';showMenu();};
 renderSeasons=render;
 window.ChapterUI={openChapter,openSeason,home(){view='chapters';render();},get introActive(){return active;}};
 render();
})();
