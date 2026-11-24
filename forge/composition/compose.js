const F=require('../core');
const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const contains=(r,p)=>p.x>=r.x&&p.x<r.x+r.w&&p.y>=r.y&&p.y<r.y+r.h;

function compose({id,name,modules,infrastructure=[],spawn={x:55,y:440},exit={x:884,y:116}}){
 if(modules.length<2||modules.length>3)throw Error('This bounded composer accepts two or three encounters');
 if(new Set(modules.map(m=>m.key)).size!==modules.length)throw Error('Duplicate encounter key');
 const platforms=[],traps=[],trapIds=[],stages=[],required=[],encounters=[],connections=[];
 for(let n=0;n<modules.length;n++){
  const m=modules[n],surfaceMap={};
  for(const field of ['entry','exit','required','connection','geometry'])if(!m[field])throw Error('Missing encounter contract: '+field);
  const room=m.geometry.room;
  if(!room||room.h<m.geometry.minRoomHeight||room.x<0||room.y<0||room.x+room.w>960||room.y+room.h>540)throw Error('Encounter does not fit fixed world: '+m.key);
  if(new Set(m.traps.map(t=>t.name)).size!==m.traps.length||new Set(m.platforms.map(s=>s.name)).size!==m.platforms.length)throw Error('Duplicate mechanic or surface name');
  for(const {rect:r} of m.platforms)if(r.x<room.x||r.y<room.y||r.x+r.w>room.x+room.w||r.y+r.h>room.y+room.h)throw Error('Surface outside encounter bounds');
  if(m.geometry.stepRise>90||m.geometry.landingRise>230)throw Error('Ascent exceeds module geometry contract');
  if(m.geometry.requiresSeparator&&!infrastructure.some(r=>r.x===0&&r.w===960&&r.y+r.h===room.y))throw Error('Launch module requires separating ceiling');
  if(m.geometry.beamSpansRoom&&!m.traps.some(t=>t.type==='Laser'&&t.args[0].vertical&&t.args[0].y<=room.y&&t.args[0].y+t.args[0].len>=room.y+room.h))throw Error('Timed beam does not span room');
  if(m.geometry.gateReachesCeiling&&!m.traps.some(t=>t.type==='Gate'&&t.args[0].y===room.y&&t.args[0].y+t.args[0].h===m.platforms.find(s=>s.name==='floor')?.rect.y))throw Error('Route gate must close the full room height');
  for(const s of m.platforms){surfaceMap['surface:'+s.name]='platform:'+platforms.length;platforms.push({...s.rect});}
  for(const t of m.traps){traps.push({type:t.type,args:structuredClone(t.args)});trapIds.push(m.key+'/'+t.name);}
  const qualify=id=>id.startsWith('surface:')?surfaceMap[id]:m.key+'/'+id;
  const requirement=r=>{const trap=qualify(r.trap);if(!trap)throw Error('Unknown surface '+r.trap);return {...r,trap,sinceEncounterEntry:true};};
  const needs=m.required.map(requirement),firstStage=stages.length;
  stages.push({label:m.key+': enter',entryOf:m.key,target:m.entry.target,reach:m.entry.region,grounded:m.entry.grounded});
  for(const s of m.stages)stages.push({...s,label:m.key+': '+s.label,requires:(s.requires||[]).map(requirement),target:s.target?.trap?{...s.target,trap:qualify(s.target.trap)}:s.target});
  stages.push({label:m.key+': complete',exitOf:m.key,target:m.exit.target,reach:m.exit.region,grounded:m.exit.grounded,requires:needs});
  required.push(...needs.map(({sinceEncounterEntry,...r})=>r));
  encounters.push({key:m.key,kind:m.kind,origin:m.origin,entry:m.entry,exit:m.exit,required:needs,connection:m.connection,geometry:m.geometry,firstStage,lastStage:stages.length-1});
  const next=modules[n+1];
  if(next){
   if(!overlap(m.exit.region,next.entry.region))throw Error('Incompatible encounter ports: '+m.key+' -> '+next.key);
   if(m.connection.kind==='portal'){
    const t=m.traps.find(t=>t.name===m.connection.trap);
    if(t?.type!=='Teleporter'||t.args[4]?.twoWay!==false)throw Error('Connection requires a one-way portal');
    const landing={x:t.args[2]+2,y:t.args[3]+16};
    if(!contains(next.entry.region,landing))throw Error('Portal receiver misses entry region');
    if(!next.platforms.some(s=>Math.abs(s.rect.y-(landing.y+32))<1e-8&&landing.x>=s.rect.x&&landing.x+26<=s.rect.x+s.rect.w))throw Error('Portal receiver lacks safe support');
   }else if(m.connection.kind==='walk'){
    if(m.connection.supportY!==next.entry.target.y+32)throw Error('Walk connection has incompatible support height');
   }else throw Error('Nonterminal encounter has no supported connection');
   connections.push({from:m.key,to:next.key,kind:m.connection.kind,exitRegion:m.exit.region,entryRegion:next.entry.region});
  }else if(m.connection.kind!=='finish')throw Error('Last encounter must terminate at the exit');
 }
 platforms.push(...infrastructure);
 const supported={Spring:['activate'],Teleporter:['activate'],MovingPlatform:['ride'],Laser:['beamCross','beamCrossRiding'],PopSpikes:['trigger'],Button:['activate'],Gate:['open','pass']};
 for(const r of required){
  if(!Number.isInteger(r.minTicks)||r.minTicks<1)throw Error('Required interaction count must be positive');
  if(/^platform:\d+$/.test(r.trap)){
   if(!platforms[Number(r.trap.split(':')[1])]||r.event!=='land')throw Error('Invalid landing requirement');
  }else if(!supported[traps[trapIds.indexOf(r.trap)]?.type]?.includes(r.event))throw Error('Unknown required mechanic/event: '+r.trap+':'+r.event);
 }
 const d={schemaVersion:1,id,season:Math.ceil(id/50),name,seed:id,targetDifficulty:'MEDIUM',experimental:true,developerOnly:true,
  spawn,exit:{positions:[exit]},platforms,traps,checkpoints:[],
  experiment:{version:2,trapIds,stages,required,encounters},composition:{version:1,manual:true,encounters,connections}};
 const validation=F.validate(d);if(validation.errors.length)throw Error(validation.errors.join('; '));
 if(!contains(encounters[0].entry.region,spawn))throw Error('Spawn misses first entry');
 if(!contains(encounters.at(-1).exit.region,exit))throw Error('Exit misses final encounter');
 return d;
}
module.exports={compose};
