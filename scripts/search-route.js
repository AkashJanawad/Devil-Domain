// Developer-only route search. Expands real fixed-step movement, never teleports.
const fs=require('node:fs');
const {boot}=require('../tests/harness');
const h=boot();
h.run(`
function copyState(o){if(o===null||typeof o!=='object')return o;const c=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o));for(const k of Object.keys(o))c[k]=copyState(o[k]);return c}
function snapshot(){return {game:copyState(Game),jump:jumpBuffered,held:!!keys.Space}}
function restore(s){Object.assign(Game,copyState(s.game));clearInput();jumpBuffered=s.jump;keys.Space=s.held;particles.length=0;stains=[]}
function advance(action,frames){const [dir,jump]=action;keys.ArrowLeft=dir<0;keys.ArrowRight=dir>0;if(jump&&!keys.Space)jumpBuffered=.12;keys.Space=jump;for(let i=0;i<frames&&Game.state==='play';i++)Game.update(STEP)}
`);
const level=Number(process.argv[2]||30), max=Number(process.argv[3]||260), width=Number(process.argv[4]||160);
h.run(`Game.loadLevel(${level-1});Game.state='play';`);
const goals=JSON.parse(process.env.ROUTE_GOALS||JSON.stringify(require('./route-goals.json')[level]||[]));
h.run(`globalThis.goals=${JSON.stringify(goals)};globalThis.levelNumber=${level}`);
let beam=[{s:h.run('snapshot()'),route:[],stage:0}],seen=new Map();
const actions=[[-1,false],[-1,true],[0,false],[0,true],[1,false],[1,true]];
const frames=12;
for(let depth=0;depth<max;depth++){
 const next=[];
 for(const n of beam)for(let a=0;a<actions.length;a++){
  // Keep cross-context objects; prototypes and methods originate in the game VM.
  // harness supplies run only; expose setter through VM function.
  h.run('(s)=>restore(s)')(n.s);
  h.run(`advance(${JSON.stringify(actions[a])},${frames})`);
  const state=h.run('Game.state');
  if(state==='dead')continue;
  const route=[...n.route,a];
  if(state==='win'){
   const result={level,step:1/120,framesPerAction:frames,actions:route.map(i=>actions[i]),ticks:(depth+1)*frames};
   fs.mkdirSync('tests/replays',{recursive:true});fs.writeFileSync(`tests/replays/level-${level}.json`,JSON.stringify(result,null,2)+'\n');
   console.log('WIN',level,'seconds',result.ticks/120,'actions',route.length);process.exit(0);
  }
  const p=h.run('({...Game.player})');let stage=n.stage;
  while(stage<goals.length){const g=goals[stage];if(p.x>=(g.minX??-999)&&p.x<=(g.maxX??9999)&&p.y>=(g.minY??-999)&&p.y<=(g.maxY??9999)&&(!g.door||h.run('Game.level.door.i')>=g.door)&&(!g.flag||h.run(`!!Game.flags[${JSON.stringify(g.flag)}]`)))stage++;else break}
  const target=goals[stage]||{x:h.run('Game.level.door.pos.x'),y:h.run('Game.level.door.pos.y')};
  const score=stage*10000-Math.abs(p.x-target.x)-Math.abs(p.y-(target.y??448))*.7;
  const key=[stage,Math.round(p.x/12),Math.round(p.y/12),Math.round(p.vx/100),Math.round(p.vy/160),!!p.grounded,h.run('Game.level.door.i'),Math.floor(depth%60/3),JSON.stringify(h.run('Game.flags'))].join(',');
  if((seen.get(key)??-Infinity)>=score)continue;seen.set(key,score);
  next.push({s:h.run('snapshot()'),route,stage,score});
 }
 next.sort((a,b)=>b.score-a.score);beam=next.slice(0,width);
 if(depth%20===0)console.log(depth,beam.length,beam[0]&&{score:beam[0].score,stage:beam[0].stage,p:beam[0].s.game.player});
 if(!beam.length)break;
}
console.log('NO ROUTE',level);process.exitCode=1;
