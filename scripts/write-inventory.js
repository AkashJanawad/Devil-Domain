const fs=require('fs');const inventory=require('../docs/level-inventory-1-30.json');
const notes=[
['Movement tutorial','Walk right to the exit.','Intro'],
['Triggered bridge collapse','Jump across the 100-pixel section after approaching its trigger.','Intro'],
['Three crumble stepping stones','Jump from the left ledge onto each stone without lingering.','Easy'],
['Phased pop spikes','Wait or jump to cross five offset spike cycles.','Easy'],
['Approach-triggered falling ceiling','Bait or outrun blocks, then jump their landed bodies.','Easy'],
['Horizontal ferry with exit ambush','Ride the ferry over the 320-pixel pit; jump the exit spikes.','Moderate'],
['Door chase ending upstairs','Follow the fleeing door, then climb the right-hand stairs.','Moderate'],
['Opposing belt','Run against the conveyor, then jump the triggered exit spikes.','Moderate'],
['Tracking gap','Stay ahead of the moving hole and jump over it when it catches up.','Moderate'],
['Spring ascent','Launch from x360 to the y290 shelf; jump the delayed spikes.','Moderate'],
['Reversed controls over two gaps','Reverse directional input in the marked zone; jump both pits.','Moderate'],
['Phased disappearing bridge','Time three blink-platform landings and jump the exit ambush.','Moderate'],
['Decoy exits','Avoid both fake doors and react to delayed spikes/falling block.','Moderate'],
['Crossing saw patrols','Separate horizontal and vertical saw timings, then jump exit spikes.','Moderate'],
['Staggered crushers','Cross in recovery windows; bait the final triggered crusher.','Hard'],
['Vertical laser timing','Cross on warning/off phases and jump exit spikes.','Moderate'],
['One-way portal over lethal gap','Use the portal, then jump the exit spike strip.','Moderate'],
['Three pendulum timings','Pass each bob near the ends of its swing; jump the exit ambush.','Hard'],
['Two projectile lanes','Move through ground spikes while avoiding shots at two heights.','Hard'],
['Latching floor switch','Press g1, pass the gate, avoid the fake door and spike ambush.','Moderate'],
['Two vertical lifts','Ride the left lift, traverse the middle shelf and right lift.','Hard'],
['Forward belt into crushers','Brake against belt movement and use crusher recovery windows.','Hard'],
['Two spring-assisted gaps','Run into each spring and steer onto the next floor segment.','Moderate'],
['Blink bridge with vertical saw','Time the two platforms around the central saw patrol.','Hard'],
['Turret and laser crossfire','Choose laser windows while managing the horizontal shot lane.','Hard'],
['Ferry into upper portal','Ride the moving platform, use the portal and exit on the upper shelf.','Hard'],
['Mixed rhythm sequence','Cross staggered spikes and laser phases; remember the last ambush.','Hard'],
['Conveyor, ferry, saw, crusher','Use the belt and ferry, then time saw/crusher windows.','Hard'],
['Fake exits and collapsing bridge','Skip both decoys, clear the collapsing span and falling block.','Hard'],
['Out-and-back finale','Approach the right door; return over the ferry and spring up to its new left exit.','Hard']
];
let text='# Developer inventory: levels 1–30\n\nThis inventory was captured after the level 30 ceiling correction and before adding\n31–40. Exact geometry, spawns, every exit position, trap constructors, trigger\nrectangles, delays and phases are in [level-inventory-1-30.json](level-inventory-1-30.json).\nLevels 1–29 are compared against this snapshot in regression tests. Difficulty\nratings are design estimates, not human playtest ratings.\n\n';
text+='| Level | Name | Main mechanism / expected route | Difficulty | Known issues / evidence |\n|---|---|---|---|---|\n';
for(let i=0;i<30;i++)text+=`| ${i+1} | ${inventory[i].name} | ${notes[i][0]}. ${notes[i][1]} | ${notes[i][2]} | ${i===29?'Overhead spring obstruction fixed; zero-death input replay.':i===0?'Movement-to-exit browser test passes.':'No full route proof; manual completion remains necessary.'} |\n`;
text+='\n## Pattern analysis used for the expansion\n\nMost existing levels traverse left-to-right and reuse an exit-side PopSpikes ambush.\nExisting combined pairs include conveyor/crusher, blink/saw, turret/laser, and\nferry/portal. Ordinary latching switches appear in 20; momentary switches were\nnot used in the original campaign. Door chases appear in 7 and 30. Springs were\nprimarily launch devices, and falling blocks primarily overhead threats.\n\nThe expansion introduces switch elevation as a route requirement (31), a falling\nblock used as a necessary stair (32), a portal that starts a reverse upper route\n(33), low-running momentary gate corridors with ceiling traps (34), a descending\nfalse summit (35), belt plus inverted air steering (36), a switch-and-return-portal\ncircuit (37), mismatched delayed impacts over a fragile escape bridge (38), a\ncharged momentary gate across a portal (39), and a two-launch switch/portal/door\nrelay (40). These reuse trap classes without copying a complete prior layout.\n';
fs.writeFileSync('docs/LEVEL_INVENTORY.md',text);
