const fs=require('node:fs'),crypto=require('node:crypto');
const {boot}=require('../tests/harness');
const clone=o=>JSON.parse(JSON.stringify(o));
const tiers=['BEGINNER','EASY','MEDIUM','HARD','EXPERT','EXTREME','ULTIMATE'];
function engine(d){const h=boot();h.run(fs.readFileSync('level-runtime.js','utf8'));if(d){h.run('(d)=>{LEVELS.push({name:d.name,build:()=>ForgeRuntime.build(d)});Game.loadLevel(LEVELS.length-1);Game.state="play";}')(clone(d));}return h;}
const types=engine().run('ForgeRuntime.types()');
function hidden(d){return d.traps.filter(t=>t.type==='CollapseFloor'||t.type==='FallBlock'||t.type==='FakeDoor'||t.type==='PopSpikes'&&t.args[3]||t.type==='WindZone'&&t.args[1]?.trigger).length+(d.exit.positions.length>1?1:0);}
function engineHash(){return crypto.createHash("sha256").update(fs.readFileSync("game.js")).update(fs.readFileSync("level-runtime.js")).digest("hex");}
function hash(d){return crypto.createHash('sha256').update(JSON.stringify(d)).digest('hex');}
function validate(d){const errors=[];try{
 if(d.schemaVersion!==1||!Number.isInteger(d.id)||d.id<41||d.id>500||d.season!==Math.ceil(d.id/50))throw Error('Version, ID or season mismatch');
 if(typeof d.name!=='string'||!d.name.trim()||![...tiers,'VERY HARD','EXTREME','INSANE','DEMONIC'].includes(d.targetDifficulty))throw Error('Missing name/difficulty');
 if(!Number.isInteger(d.seed)||!Array.isArray(d.platforms)||!Array.isArray(d.traps)||d.traps.length>24)throw Error('Invalid seed/collections');
 for(let i=0;i<d.platforms.length;i++)for(let j=i+1;j<d.platforms.length;j++){const a=d.platforms[i],b=d.platforms[j];if(a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y)throw Error('Overlapping platforms');}
 if(d.checkpoints?.length)throw Error('Checkpoints are reserved, not supported by this engine');
 const finite=o=>{if(typeof o==='number'&&!Number.isFinite(o))throw Error('Non-finite parameter');if(o&&typeof o==='object')Object.values(o).forEach(finite);};finite(d);
 if(d.spawn.x<0||d.spawn.x>934||d.spawn.y<0||d.spawn.y>508)throw Error('Spawn outside world');
 if(!d.exit.positions.length||d.exit.positions.some(p=>p.x<0||p.x>922||p.y<0||p.y>476))throw Error('Exit outside world');
 for(const r of d.platforms)if(!['x','y','w','h'].every(k=>Number.isFinite(r[k]))||r.w<=0||r.h<=0)throw Error('Invalid platform');
 for(const t of d.traps)for(const a of t.args||[])if(a&&typeof a==='object')for(const k of ['period','speed'])if(a[k]!==undefined&&(!(a[k]>0)||!Number.isFinite(a[k])))throw Error('Non-positive timing/speed');
 for(const t of d.traps)if(!types.includes(t.type)||!Array.isArray(t.args))throw Error('Unknown trap or arguments');
 if(hidden(d)<1)throw Error('Missing hidden surprise');
 if(d.generation){const o=d.generation,used=d.traps.map(t=>t.type);if(used.some(t=>!o.allowed.includes(t)||o.excluded.includes(t))||o.required.some(t=>!used.includes(t))||hidden(d)<o.minHidden||d.traps.length>o.maxDensity||new Set(used).size<o.complexity)throw Error('Generation constraints not satisfied');}
 const h=engine(d);if(h.run('Game.collectSolids().some(s=>aabb(Game.player,s))||Game.level.traps.some(t=>t.kills().some(k=>aabb(Game.player,k)))'))throw Error('Spawn intersects solid/hazard');
 const buttons=d.traps.filter(t=>t.type==='Button').map(t=>t.args[2]);for(const t of d.traps.filter(t=>t.type==='Gate'))if(!buttons.includes(t.args[1]))throw Error('Gate has no matching switch');
 h.run('for(let n=0;n<12;n++){Game.update(STEP);if(Game.state!=="play")throw Error("Immediate spawn death");for(const t of Game.level.traps)for(const r of [...t.solids(),...t.kills()])if(![r.x,r.y,r.w,r.h].every(Number.isFinite)||r.w<0||r.h<0)throw Error("Invalid trap geometry")}');
 }catch(e){errors.push(e.message);}return {status:errors.length?'FAILED':'PASSED',errors,warning:'Static validation is not a completion proof.'};}
const simulation=`
function deep(o){if(o===null||typeof o!=='object')return o;const c=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o));for(const k of Object.keys(o))c[k]=deep(o[k]);return c;}
function snap(){return {game:deep(Game),jump:jumpBuffered,held:!!keys.Space,tracking:globalThis.forgeTracking?deep(forgeTracking):null};}
function restore(s){Object.assign(Game,deep(s.game));clearInput();jumpBuffered=s.jump;keys.Space=s.held;if(s.tracking)globalThis.forgeTracking=deep(s.tracking);particles.length=0;stains=[];}
function act(a,n=12){keys.ArrowLeft=a[0]<0;keys.ArrowRight=a[0]>0;if(a[1]&&!keys.Space)jumpBuffered=.12;keys.Space=a[1];let ticks=0;globalThis.discontinuity=false;while(ticks<n&&Game.state==='play'){const x=Game.player.x,y=Game.player.y;const before=globalThis.forgeTracking?forgeBeforeTick():null;const portals=Game.level.traps.filter(t=>t.constructor.name==='Teleporter').map(t=>t.cool);Game.update(STEP);const warped=Game.level.traps.filter(t=>t.constructor.name==='Teleporter').some((t,i)=>t.cool>portals[i]);if(!warped&&(Math.abs(Game.player.x-x)>20||Math.abs(Game.player.y-y)>40))globalThis.discontinuity=true;if(before)forgeAfterTick(before,a);ticks++;}return ticks;}
`;
function replay(d,trace){if(!trace||trace.engineHash!==engineHash()||trace.hash!==hash(d)||trace.step!==1/120||![1,3,6,12].includes(trace.duration)||!Array.isArray(trace.actions))return {status:'FAILED',reason:'Stale or invalid trace'};const h=engine(d);h.run(simulation);let ticks=0,surprise=false;for(const a of trace.actions){if(!Array.isArray(a)||![-1,0,1].includes(a[0])||typeof a[1]!=='boolean')return {status:'FAILED',reason:'Invalid input'};ticks+=h.run('act')(a,trace.duration);surprise ||= h.run('Game.level.door.i>0||Game.level.traps.some(t=>(t instanceof PopSpikes&&t.trigger&&t.state==="popping")||(t instanceof CollapseFloor&&t.state!=="idle")||(t instanceof FallBlock&&t.state!=="idle")||(t instanceof FakeDoor&&t.sprung)||(t instanceof WindZone&&t.trigger&&t.active))');if(h.run('discontinuity'))return {status:'FAILED',reason:'Collision displacement exceeds normal motion; possible ejection exploit'};if(h.run('Game.state')!=='play')break;}return {status:h.run('Game.state')==='win'&&h.run('Game.deaths')===0&&surprise?'VERIFIED':'FAILED',surprise,ticks,seconds:ticks/120,end:clone(h.run('[Game.player.x,Game.player.y,Game.state]'))};}

// Exact equality, not a quantized position/velocity approximation. Include every
// serialized Game field, all trap state, input buffer, and observation history.
// Functions/prototypes are fixed within a search; particles and stains are cosmetic.
function stateKey(s,stage=0){return JSON.stringify([stage,s]);}

function solve(d,{width=70,depth=140,actionTicks=12,maxExpanded=500000}={}){
 const v=validate(d);if(v.errors.length)return {status:'FAILED',validation:v};
 if(![1,3,6,12].includes(actionTicks))throw Error('Unsupported action duration');
 width=Math.min(200,Math.max(1,width));depth=Math.min(Math.floor(3600/actionTicks),Math.max(1,depth));
 const h=engine(d);h.run(simulation);
 if(d.experiment){h.run(require('./telemetry').runtime);h.run('initForgeTracking')(d.experiment,false);}
 const snapshot=h.run('snap'),restore=h.run('restore'),act=h.run('act');
 let beam=[{s:snapshot(),actions:[],stage:0}],expanded=0,rejectedWins=0,furthestStage=0,progress=null;
 for(let k=0;k<depth;k++){
  const next=[],seen=new Set();
  for(const b of beam)for(const a of [[1,false],[1,true],[0,false],[0,true],[-1,false],[-1,true]]){
   if(expanded>=maxExpanded)return {status:'UNVERIFIED',expanded,rejectedWins,reason:'Expansion budget exhausted; not a proof of impossibility'};
   restore(b.s);act(a,actionTicks);expanded++;
   if(h.run('discontinuity')||h.run('Game.state')==='dead')continue;
   const actions=[...b.actions,a],s=snapshot(),p=s.game.player,door=s.game.level.door.pos,flags=s.game.flags;
   let stage=s.tracking?.stage??b.stage;
   if(stage>furthestStage){furthestStage=stage;progress={stage,label:d.experiment?.stages?.[stage]?.label,seconds:(k+1)*actionTicks/120,position:{x:p.x,y:p.y}};}
   if(s.game.state==='win'){
    if(d.experiment && (stage!==d.experiment.stages.length || !(d.experiment.required||[]).every(r=>(s.tracking.counts[r.trap+':'+r.event]||0)>=(r.minTicks||1)))){rejectedWins++;continue;}
    const trace={engineHash:engineHash(),hash:hash(d),seed:d.seed,initial:{spawn:d.spawn,trapState:'fresh constructor reset',deaths:0},step:1/120,duration:actionTicks,actions};
    const check=replay(d,trace);
    if(check.status==='VERIFIED')return {status:'VERIFIED',trace,replay:check,expanded,rejectedWins};
    rejectedWins++;continue;
   }
   const wp=d.design?.waypoints?.[stage];
   if(!d.experiment && wp&&p.x>=wp.reach.x&&p.x<wp.reach.x+wp.reach.w&&p.y>=wp.reach.y&&p.y<wp.reach.y+wp.reach.h)stage++;
   const key=stateKey(s,stage);if(seen.has(key))continue;seen.add(key);
   let target;
   if(d.experiment) target=h.run('forgeTarget')(d.experiment.stages[stage]);
   else {
    target=d.design?.waypoints?.[stage]||door;
    if(stage===0&&d.design){const t=s.game.level.traps.find(t=>['Spring','Teleporter','MovingPlatform'].includes(t.constructor.name));if(t)target=t.a?{x:t.a.x,y:t.a.y}:t.constructor.name==='MovingPlatform'?{x:t.px,y:t.py-30}:t;}
    const unpressed=s.game.level.traps.find(t=>t.constructor.name==='Button'&&!flags[t.key]);if(unpressed)target=unpressed;
   }
   const score=stage*2200-Math.abs(p.x-target.x)-.65*Math.abs(p.y-target.y)+Object.values(flags).filter(Boolean).length*1200+s.game.level.door.i*1500;
   next.push({s,actions,score,stage});
  }
  next.sort((a,b)=>b.score-a.score);
  // Beam pruning is explicit and remains incomplete. Retain different positions
  // before filling spare slots; spatial buckets never claim state equivalence.
  const buckets=new Map(),selected=[],overflow=[];
  for(const b of next){const p=b.s.game.player,key=[b.stage,Math.floor(p.x/20),Math.floor(p.y/20),p.grounded,Math.sign(p.vy),b.s.held].join();const n=buckets.get(key)||0;buckets.set(key,n+1);(n<2?selected:overflow).push(b);}
  beam=[...selected,...overflow].slice(0,width);if(!beam.length)break;
 }
 return {status:'UNVERIFIED',expanded,rejectedWins,progress,reason:'Bounded search exhausted; not a proof of impossibility'};
}
function features(d){return {geometry:d.platforms.map(r=>[Math.round(r.x/80),Math.round(r.y/60),Math.round(r.w/80)]).sort().map(String),mechanics:d.traps.map(t=>t.type).filter(t=>t!=='Note').sort(),sequence:d.traps.map(t=>t.type).filter(t=>t!=='Note'),timing:d.traps.map(t=>{const opts=t.args?.find(a=>a&&typeof a==='object'&&!Array.isArray(a)&&(a.period||a.delay||a.speed||a.trigger))||t.raw||{};return t.type+':'+JSON.stringify(Object.fromEntries(['period','delay','speed','phase','trigger','path'].filter(k=>opts[k]!==undefined).map(k=>[k,opts[k]])))}),exit:d.exit.positions.map(p=>[Math.round(p.x/120),Math.round(p.y/80)]).map(String)};}
function similarity(a,b){const x=features(a),y=features(b),j=(a,b)=>{const A=new Set(a),B=new Set(b);return [...A].filter(v=>B.has(v)).length/Math.max(1,new Set([...A,...B]).size)};const score=.30*j(x.geometry,y.geometry)+.30*j(x.mechanics,y.mechanics)+.15*(JSON.stringify(x.sequence)===JSON.stringify(y.sequence)?1:0)+.1*j(x.exit,y.exit)+.15*j(x.timing,y.timing);return {score,reason:'30% geometry cells + 30% mechanic overlap + 15% activation order + 10% exits + 15% timing/trigger/path parameters; names/colors ignored'};}
function existing(excludeId){const old=engine().run('LEVELS.map((l,i)=>{const d=l.build();return {id:i+1,platforms:d.solids,exit:{positions:d.door.positions},traps:d.traps.map(t=>({type:t.constructor.name,args:[],raw:t}))}})');const context={window:{}};for(const file of ['content/season-one.js','content/season-two.js'])require('node:vm').runInNewContext(fs.readFileSync(file,'utf8'),context);return [...old,...clone(context.window.FORGE_CONTENT.levels).filter(d=>d.id!==excludeId)];}
function quality(d,trace,others=[]){const actions=trace?.actions||[],jumps=actions.filter((a,i)=>a[1]&&!actions[i-1]?.[1]).length,turns=actions.filter((a,i)=>i&&a[0]&&a[0]!==actions[i-1][0]).length,timed=d.traps.filter(t=>['Laser','Crusher','Saw','MovingPlatform','BlinkPlatform','Turret','Pendulum'].includes(t.type)).length,switches=d.traps.filter(t=>t.type==='Button').length;
 const score=Math.min(100,jumps*3+turns*2+timed*6+hidden(d)*4+switches*7+new Set(d.traps.map(t=>t.type)).size*2+actions.length/12);const nearest=others.map(o=>({id:o.id,...similarity(d,o)})).sort((a,b)=>b.score-a.score)[0];return {estimate:true,score:Math.round(score),tier:tiers[Math.min(6,Math.floor(score/15))],jumps,turns,timed,switches,hidden:hidden(d),nearest,unique:!nearest||nearest.score<.88,warnings:['Estimated difficulty; human review of precision and fun required.','Similarity is a structural heuristic, not proof of originality.']};}
function generate(options={}){const o={season:1,difficulty:'HARD',count:10,seed:4100,minHidden:1,maxDensity:12,complexity:4,allowed:types,excluded:[],required:[],...options};if(!tiers.includes(o.difficulty)||!Number.isInteger(o.seed)||o.count<1||o.count>20||o.season<1||o.season>10)throw Error('Invalid generation parameters');let state=o.seed>>>0;const rand=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};const out=[];
 const R=(x,y,w,h)=>({x,y,w,h}),T=(type,...args)=>({type,args});
 for(let i=0;i<o.count;i++){const n=i%10,shift=Math.floor(rand()*21)-10,spike=T('PopSpikes',680+shift,480,60,R(570,320,30,160),{delay:.35});let platforms=[R(0,480,960,60)],traps=[],concept='';
 const wind=T('WindZone',R(280,300,220,180),{force:70,trigger:R(200,320,30,160)});
 switch(n){
 case 0:concept='GUST AND HAMMER';traps=[wind,T('Crusher',430,70,{topY:40,period:2.5,phase:.2}),spike];break;
 case 1:concept='BELT UNDER FIRE';traps=[T('Conveyor',R(160,480,280,60),{dir:1,force:90}),T('Turret',940,410,{period:1.7,speed:240}),T('FallBlock',R(600,40,65,50),R(480,300,30,180),{shakeTime:.55})];break;
 case 2:concept='SWITCH IN THE WIND';traps=[wind,T('Button',520,470,'wind'),T('Gate',R(740,300,24,180),'wind'),T('Laser',{x:620,y:100,len:380,vertical:true,period:2.7,warn:.6,fire:.4}),spike];break;
 case 3:concept='THE MOVING VERDICT';platforms=[];traps=[T('SlidingHole',0,960,{gapW:80,startGap:750,speed:105,trigger:R(180,300,30,180)}),T('FallBlock',R(430,40,65,50),R(310,300,30,180),{shakeTime:.5}),T('Saw',[{x:720,y:180},{x:720,y:430}],{speed:120,r:18})];break;
 case 4:concept='CROSSWIND DELIVERY';platforms=[R(0,480,350,60),R(620,480,340,60)];traps=[T('Teleporter',280,432,640,432,{twoWay:false}),T('WindZone',R(620,320,270,160),{force:-65,trigger:R(630,320,30,160)}),T('Pendulum',790,40,{len:380,amp:.65,speed:1.5,r:16}),spike];break;
 case 5:concept='FALSE SHELTER';traps=[T('FakeDoor',320,416,{label:'shelter'}),T('Laser',{x:480,y:100,len:380,vertical:true,period:2.8,warn:.7,fire:.4}),T('Conveyor',R(600,480,210,60),{dir:-1,force:100}),T('PopSpikes',820,480,45,R(730,320,25,160),{delay:.5})];break;
 case 6:concept='WIND OVER NOTHING';platforms=[R(0,480,350,60),R(490,480,470,60)];traps=[T('CollapseFloor',R(350,480,140,60),R(280,300,30,180),{delay:.25}),wind,T('Pendulum',720,40,{len:390,amp:.7,speed:1.4,r:16}),spike];break;
 case 7:concept='REVERSE THE VERDICT';traps=[T('InvertZone',R(220,0,280,480)),T('Button',380,470,'verdict'),T('Gate',R(620,300,24,180),'verdict'),T('FallBlock',R(740,40,70,50),R(650,300,25,180),{shakeTime:.6})];break;
 case 8:concept='THE LATE SHIFT';platforms=[R(0,480,300,60),R(560,480,400,60)];traps=[T('MovingPlatform',R(300,450,120,16),{toX:450,speed:85,pause:.4}),T('Turret',940,395,{period:2,speed:220}),T('Crusher',730,60,{topY:40,trigger:R(640,300,30,180)}),spike];break;
 case 9:concept='FINAL NOTICE';traps=[T('Button',230,470,'a'),T('Gate',R(350,300,22,180),'a'),T('FallBlock',R(500,40,70,50),R(400,300,25,180),{shakeTime:.55}),T('Button',640,470,'b'),T('Gate',R(780,300,22,180),'b'),T('Turret',940,390,{period:1.9,speed:220}),spike];break;
 }
 platforms.push(R(-40,-200,40,940),R(960,-200,40,940));
 const d={schemaVersion:1,id:(o.season===1?41:(o.season-1)*50+1)+i,season:o.season,name:concept,seed:(o.seed+i)>>>0,targetDifficulty:o.difficulty,theme:'minimal',concept:n,spawn:{x:55,y:440},exit:{positions:[{x:884,y:416}]},platforms,traps,checkpoints:[],generation:o};
 const used=traps.map(t=>t.type);const reason=used.some(t=>!o.allowed.includes(t)||o.excluded.includes(t))?'Template requires a disallowed mechanic':o.required.some(t=>!used.includes(t))?'Required mechanic unavailable':hidden(d)<o.minHidden?'Insufficient surprises':traps.length>o.maxDensity?'Trap density exceeded':new Set(used).size<o.complexity?'Complexity requirement unmet':null;
 out.push({data:d,status:reason?'FAILED':'GENERATING',reason});}return out;}
function verify(candidate,others=existing(candidate.data.id),budget={}){const c=clone(candidate);c.validation=validate(c.data);if(c.validation.errors.length){c.repairs=[];for(let i=0;i<2&&c.validation.errors.length;i++){if(!c.validation.errors.some(x=>x.includes('Exit outside')))break;for(const p of c.data.exit.positions){p.x=Math.max(0,Math.min(922,p.x));p.y=Math.max(0,Math.min(476,p.y));}c.repairs.push('Clamped exit into world');c.validation=validate(c.data);}if(c.validation.errors.length){c.status='FAILED';return c;}}
 c.solution=solve(c.data,budget);c.quality=quality(c.data,c.solution.trace,others);c.status=c.solution.status==='VERIFIED'?(c.quality.unique?'VERIFIED':'NEEDS HUMAN REVIEW'):c.solution.status;c.approved=false;return c;}
module.exports={engineHash,types,tiers,engine,validate,hidden,hash,replay,solve,quality,similarity,existing,generate,verify,simulation,stateKey};
