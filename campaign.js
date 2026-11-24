// Offline metadata reserves ranges, never creates empty playable levels.
const SEASONS=Array.from({length:10},(_,i)=>({id:i+1,name:i?'Domain '+(i+1):'The First Domain',theme:'minimal',first:i*50+1,last:(i+1)*50,packageVersion:1,unlockAfter:i||null}));
for(const d of window.FORGE_CONTENT.levels){if(d.id!==LEVELS.length+1)throw Error('Non-contiguous approved level package');LEVELS.push({name:d.name,build:()=>ForgeRuntime.build(d)});}
function seasonProgress(id) {
 const season=SEASONS[id-1], done=getDone();
 const total=Math.max(0,Math.min(LEVELS.length,season.last)-season.first+1);
 const completed=Array.from({length:total},(_,i)=>!!done[season.first+i-1]).filter(Boolean).length;
 const unlocked=id===1||Array.from({length:50},(_,i)=>!!done[(id-2)*50+i]).every(Boolean);
 return {available:total>0,total,completed,unlocked};
}
function renderSeasons() {
 const list=document.getElementById('season-list');
 if(!list)return;
 list.innerHTML='';
 for(const season of SEASONS){
  const progress=seasonProgress(season.id),button=document.createElement('button');
  button.textContent=season.name+' · '+(progress.available?progress.completed+'/'+progress.total:'Coming soon');
  button.disabled=!progress.available||(!DEVELOPER_UNLOCK_ALL_LEVELS&&!progress.unlocked);
  button.onclick=()=>{
   const first=document.getElementById('level-grid').children[season.first-1];
   first?.scrollIntoView?.({block:'nearest'});first?.focus?.();
  };
  list.appendChild(button);
 }
}
// The engine rebuilds its grid whenever the menu opens. Refresh the counters there too.
const buildCampaignButtons=buildLevelGrid;
buildLevelGrid=function(){buildCampaignButtons();renderSeasons();};
buildLevelGrid();
