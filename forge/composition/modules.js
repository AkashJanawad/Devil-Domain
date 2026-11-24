// Small manually parameterized encounter library, derived from Phase 1's A/B/C.
// Positions are authored in world coordinates; this is not a random generator.
const R=(x,y,w,h)=>({x,y,w,h});
const surface=(name,rect)=>({name,rect});
const trap=(name,type,...args)=>({name,type,args});
const need=(trap,event,minTicks=1)=>({trap,event,minTicks});
const port=(region,target,grounded=false)=>({region,target,grounded});
function finish(key,kind,body){return {key,kind,...body,
 geometry:{world:{w:960,h:540},noStaticOverlap:true,entryClearance:{w:26,h:32},...body.geometry}};}

function springPortal(key,{to,floorY=480,ledgeY=330}){
 return finish(key,'spring-landing-portal',{
  origin:'Phase 1 A: spring activation, actual landing, then one-way portal',
  platforms:[surface('start',R(0,floorY,260,60)),surface('ledge',R(330,ledgeY,220,16))],
  traps:[trap('spring','Spring',180,floorY,{power:-1000,w:60}),trap('portal','Teleporter',480,ledgeY-48,to.x,to.floorY-48,{twoWay:false}),trap('pit','StaticSpikes',260,540,700,{size:40})],
  entry:port(R(40,floorY-48,100,48),{x:60,y:floorY-32}),
  exit:port(R(to.x-10,to.floorY-100,100,100),{x:to.x,y:to.floorY-32}),
  required:[need('spring','activate'),need('surface:ledge','land'),need('portal','activate')],
  stages:[
   {label:'Spring launch',target:{x:190,y:floorY-32},requires:[need('spring','activate')]},
   {label:'Land before warping',target:{x:390,y:ledgeY-32},reach:R(330,ledgeY-35,130,5),grounded:true,requires:[need('surface:ledge','land')]},
   {label:'Portal to next encounter',target:{x:480,y:ledgeY-32},requires:[need('portal','activate')]}
  ],
  connection:{kind:'portal',trap:'portal',preservesVerticalVelocity:true},
  geometry:{room:R(0,236,960,304),landingRise:floorY-ledgeY,requiresSeparator:true,minRoomHeight:240}
 });
}

function movingPulse(key,{floorY,top,pitY,start=250,shore=760,toX=650,speed=130,phase=.2,carrierPhase=0,entry,withStart=true,portalTo=null}){
 const exitX=portalTo?portalTo.x:884,exitY=portalTo?portalTo.floorY:floorY;
 const platforms=[...(withStart?[surface('start',R(0,floorY,start,16))]:[]),surface('bank',R(shore,floorY,960-shore,16))];
 const spikeX=Math.min(shore+70,865),triggerX=Math.min(shore+15,775),laserX=Math.round((start+shore)/2)+25;
 return finish(key,'moving-platform-timed-hazard',{
  origin:'Phase 1 B: carried beam crossing, dismount and triggered escape',platforms,
  traps:[trap('carrier','MovingPlatform',R(start,floorY-30,110,16),{toX,speed,pause:0,phase:carrierPhase}),
   trap('laser','Laser',{x:laserX,y:top,len:pitY-top,vertical:true,period:1.7,warn:.35,fire:.5,phase}),
   trap('ambush','PopSpikes',spikeX,floorY,45,R(triggerX,floorY-160,25,160),{delay:.3}),
   trap('pit','StaticSpikes',start,pitY,shore-start,{size:pitY===540?40:18}),
   ...(portalTo?[trap('portal','Teleporter',890,floorY-48,portalTo.x,portalTo.floorY-48,{twoWay:false})]:[])],
  entry:entry||port(R(40,floorY-100,100,100),{x:60,y:floorY-32}),
  exit:port(portalTo?R(exitX-10,exitY-100,100,100):R(855,floorY-130,100,130),{x:exitX,y:exitY-32}),
  required:[need('carrier','ride',12),need('laser','beamCrossRiding'),need('ambush','trigger'),...(portalTo?[need('portal','activate')]:[])],
  stages:[
   {label:'Board moving support',target:{trap:'carrier',dx:35,dy:-32},requires:[need('carrier','ride',12)]},
   {label:'Cross timed beam while carried',target:{x:laserX+30,y:floorY-62},requires:[need('laser','beamCrossRiding')]},
   {label:'Reach new bank',target:{x:shore+25,y:floorY-32},reach:R(shore,floorY-80,70,80)},
   {label:'Clear hidden bank trap',target:{x:884,y:floorY-64},reach:R(855,floorY-130,100,130),requires:[need('ambush','trigger')]},
   ...(portalTo?[{label:'Portal handoff',target:{x:890,y:floorY-32},requires:[need('portal','activate')]}]:[])
  ],connection:portalTo?{kind:'portal',trap:'portal',preservesVerticalVelocity:true}:{kind:'finish'},
  geometry:{room:R(withStart?0:444,top,withStart?960:516,pitY-top),gap:shore-start,carrierWidth:110,beamSpansRoom:true,minRoomHeight:140}
 });
}

function switchEscape(key,{floorY=260,compact=false}){
 const steps=compact?[[150,floorY-60,80],[270,floorY-120,100]]:[[180,floorY-60,90],[300,floorY-120,100],[420,floorY-180,140]];
 const switchX=compact?300:475,switchY=steps.at(-1)[1]-10,gateX=compact?420:600;
 return finish(key,compact?'switch-ascent-route':'switch-route-hidden-escape',{
  origin:'Phase 1 C: elevation-dependent switch, full-height gate, downstream escape',
  platforms:[surface('floor',R(0,floorY,compact?450:960,16)),...steps.map(([x,y,w],i)=>surface('step'+i,R(x,y,w,16)))],
  traps:[trap('button','Button',switchX,switchY,key+':route'),trap('gate','Gate',R(gateX,0,24,floorY),key+':route'),
   ...(!compact?[trap('ambush','PopSpikes',720,floorY,65,R(650,floorY-150,25,150),{delay:.18})]:[])],
  entry:port(R(40,floorY-100,100,100),{x:60,y:floorY-32}),
  exit:compact?port(R(444,0,30,floorY),{x:448,y:floorY-32}):port(R(855,floorY-130,100,130),{x:884,y:floorY-32}),
  required:[need('button','activate'),need('gate','open'),need('gate','pass'),...(!compact?[need('ambush','trigger')]:[])],
  stages:[...steps.slice(0,-1).map(([x,y,w],i)=>({label:'Climb step '+(i+1),target:{x:x+40,y:y-32},reach:R(x,y-40,w,10),grounded:true})),
   {label:'Activate elevated switch',target:{x:switchX,y:switchY-22},requires:[need('button','activate')]},
   {label:'Use newly opened route',target:{x:gateX+55,y:floorY-32},reach:R(gateX+25,0,65,floorY),requires:[need('gate','pass')]},
   ...(!compact?[{label:'Jump hidden escape trap',target:{x:884,y:floorY-64},reach:R(855,floorY-130,100,130),requires:[need('ambush','trigger')]}]:[])],
  connection:{kind:compact?'walk':'finish',supportY:floorY},
  geometry:{room:R(0,0,compact?474:960,floorY+16),stepRise:60,gateReachesCeiling:true,minRoomHeight:compact?180:260}
 });
}
module.exports={R,port,springPortal,movingPulse,switchEscape};
