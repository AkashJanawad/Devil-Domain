/* Serialized level adapter. Existing constructors and physics remain authoritative. */
class WindZone {
  constructor(rect, opts = {}) { this.rect={...rect};this.force=opts.force??80;this.trigger=opts.trigger??null;this.reset(); }
  reset(){this.active=!this.trigger;this.t=0;}
  update(dt,g){if(this.trigger&&aabb(g.player,this.trigger))this.active=true;this.t+=dt;if(this.active&&aabb(g.player,this.rect))g.player.x+=this.force*dt;}
  solids(){return [];} kills(){return [];}
  draw(){if(!this.active)return;ctx.save();ctx.globalAlpha=.25;ctx.strokeStyle=theme.accent;for(let y=this.rect.y+16;y<this.rect.y+this.rect.h;y+=28){const x=this.rect.x+((this.t*70)%Math.max(1,this.rect.w));ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.sign(this.force)*20,y);ctx.stroke();}ctx.restore();}
}
const ForgeRuntime=(()=>{
 const registry=new Map();
 function register(name,ctor){if(registry.has(name)||typeof ctor!=='function')throw Error('Invalid or duplicate mechanic');registry.set(name,ctor);}
 for(const ctor of [CollapseFloor,PopSpikes,FallBlock,Crusher,CrumblePlatform,SlidingHole,StaticSpikes,InvertZone,MovingPlatform,Conveyor,Spring,Saw,Laser,Teleporter,Button,Gate,BlinkPlatform,Pendulum,Turret,FakeDoor,Note,WindZone])register(ctor.name,ctor);
 function build(d){return {spawn:{...d.spawn},solids:d.platforms.map(r=>({...r})),door:new Door(d.exit.positions,d.exit.options||{}),traps:d.traps.map(t=>{const C=registry.get(t.type);if(!C)throw Error('Unknown mechanic '+t.type);return new C(...JSON.parse(JSON.stringify(t.args)));})};}
 return {register,build,types:()=>[...registry.keys()]};
})();
