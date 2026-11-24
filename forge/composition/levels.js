const {compose}=require('./compose'),{R,port,springPortal,movingPulse,switchEscape}=require('./modules');
const walls=[R(-40,-200,40,940),R(960,-200,40,940),R(0,-20,960,20)];
const separator=R(0,220,960,16);
module.exports=[
 compose({id:481,name:'COMPOSITE A — LAUNCH INTO THE PULSE',infrastructure:[...walls,separator],modules:[
  springPortal('launch',{to:{x:55,floorY:180}}),
  movingPulse('pulse',{floorY:180,top:0,pitY:220,carrierPhase:.74})
 ]}),
 compose({id:482,name:'COMPOSITE B — CARRY THE KEY',exit:{x:884,y:196},infrastructure:walls,modules:[
  movingPulse('ride',{floorY:480,top:276,pitY:540,portalTo:{x:55,floorY:260}}),
  switchEscape('switch',{floorY:260})
 ]}),
 compose({id:483,name:'COMPOSITE C — THREE TERMS',infrastructure:[...walls,separator],modules:[
  springPortal('launch',{to:{x:55,floorY:180}}),
  switchEscape('switch',{floorY:180,compact:true}),
  movingPulse('pulse',{floorY:180,top:0,pitY:220,start:450,shore:850,toX:760,speed:110,carrierPhase:.6,withStart:false,entry:port(R(444,0,30,180),{x:448,y:148})})
 ]})
];
