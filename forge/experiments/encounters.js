// Manually authored lab fixtures. Not imported by the dashboard or campaign.
// IDs are lab-local metadata, not allocated production or candidate slots.
const R=(x,y,w,h)=>({x,y,w,h}), T=(type,...args)=>({type,args});
const walls=[R(-40,-200,40,940),R(960,-200,40,940)];
const requirement=(trap,event,minTicks=1)=>({trap,event,minTicks});
function fixture(id,name,platforms,traps,trapIds,stages,required){return {
 schemaVersion:1,id,season:10,name,seed:id,targetDifficulty:'MEDIUM',experimental:true,developerOnly:true,
 spawn:{x:55,y:440},exit:{positions:[{x:884,y:416}]},platforms:[...platforms,...walls],traps,checkpoints:[],
 experiment:{version:1,trapIds,stages,required}
};}
module.exports=[
 fixture(491,'LAB A — LAND THEN WARP',
  [R(0,480,260,60),R(620,480,340,60),R(330,280,220,16),R(560,0,20,540)],
  [T('Spring',180,480,{power:-1100,w:60}),T('Teleporter',480,232,680,432,{twoWay:false}),T('PopSpikes',800,480,55,R(735,320,25,160),{delay:.16}),T('StaticSpikes',260,540,360,{size:40})],
  ['launch','portal','escape','pit'],
  [
   {label:'Launch',target:{x:190,y:448},requires:[requirement('launch','activate')]},
   {label:'Land on upper ledge',target:{x:390,y:248},reach:R(330,245,130,5),grounded:true,requires:[requirement('platform:2','land')]},
   {label:'Portal transition',target:{x:480,y:248},requires:[requirement('portal','activate')]},
   {label:'Hidden escape',target:{x:884,y:416},reach:R(855,350,100,130),requires:[requirement('escape','trigger')]}
  ],[requirement('launch','activate'),requirement('platform:2','land'),requirement('portal','activate'),requirement('escape','trigger')]),
 fixture(492,'LAB B — CROSS THE PULSE',
  [R(0,480,250,60),R(760,480,200,60)],
  [T('MovingPlatform',R(250,450,110,16),{toX:650,speed:130,pause:0}),T('Laser',{x:530,y:50,len:430,vertical:true,period:1.7,warn:.35,fire:.5,phase:.2}),T('PopSpikes',830,480,45,R(775,320,25,160),{delay:.3}),T('StaticSpikes',250,540,510,{size:40})],
  ['carrier','pulse','escape','pit'],
  [
   {label:'Board the carrier',target:{trap:'carrier',dx:35,dy:-32},requires:[requirement('carrier','ride',12)]},
   {label:'Cross the pulse while riding',target:{x:560,y:418},requires:[requirement('pulse','beamCrossRiding')]},
   {label:'Reach the far bank',target:{x:785,y:448},reach:R(760,400,70,80)},
   {label:'Escape the ambush',target:{x:884,y:416},reach:R(855,350,100,130),requires:[requirement('escape','trigger')]}
  ],[requirement('carrier','ride',12),requirement('pulse','beamCrossRiding'),requirement('escape','trigger')]),
 fixture(493,'LAB C — OPEN THE ESCAPE',
  [R(0,480,960,60),R(180,420,90,16),R(300,360,100,16),R(420,300,140,16)],
  [T('Button',475,290,'escape'),T('Gate',R(600,0,24,480),'escape'),T('PopSpikes',720,480,65,R(650,330,25,150),{delay:.18})],
  ['switch','route-gate','ambush'],
  [
   {label:'First step',target:{x:220,y:388},reach:R(180,380,90,10),grounded:true},
   {label:'Second step',target:{x:340,y:328},reach:R(300,320,100,10),grounded:true},
   {label:'Change the route',target:{x:475,y:268},requires:[requirement('switch','activate')]},
   {label:'Pass the opened gate',target:{x:655,y:448},reach:R(625,0,70,480),requires:[requirement('route-gate','pass')]},
   {label:'Hidden escape',target:{x:884,y:416},reach:R(855,350,100,130),requires:[requirement('ambush','trigger')]}
  ],[requirement('switch','activate'),requirement('route-gate','open'),requirement('route-gate','pass'),requirement('ambush','trigger')])
];
