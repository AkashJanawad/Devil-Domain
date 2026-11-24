// Hand-authored Season 2 drafts. No generator, random layout, or composer calls.
// Helpers below serialize rectangles, named mechanics and verification milestones only.
const R=(x,y,w,h)=>({x,y,w,h});
const T=(name,type,...args)=>({name,type,args});
const N=(trap,event,minTicks=1)=>({trap,event,minTicks});
const S=(label,x,y,reach,requires=[],grounded=false)=>({label,target:{x,y},...(reach?{reach}:{}),requires,grounded});
function level(d){
 const {traps,stages,required,...data}=d;
 return {schemaVersion:1,season:2,seed:d.id,experimental:true,developerOnly:true,checkpoints:[],
  ...data,platforms:[...d.platforms,R(-40,-200,40,940),R(960,-200,40,940),R(0,-20,960,20)],
  traps:traps.map(({type,args})=>({type,args})),
  experiment:{version:2,trapIds:traps.map(t=>t.name),stages,required},
  review:{authorship:'Handcrafted; explicit coordinates',productionReady:false,manualReview:'PENDING'}};
}
module.exports={R,T,N,S,level};
