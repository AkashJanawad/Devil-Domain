# Developer inventory: levels 1–30

This inventory was captured after the level 30 ceiling correction and before adding
31–40. Exact geometry, spawns, every exit position, trap constructors, trigger
rectangles, delays and phases are in [level-inventory-1-30.json](level-inventory-1-30.json).
Levels 1–29 are compared against this snapshot in regression tests. Difficulty
ratings are design estimates, not human playtest ratings.

| Level | Name | Main mechanism / expected route | Difficulty | Known issues / evidence |
|---|---|---|---|---|
| 1 | WELCOME TO THE DOMAIN | Movement tutorial. Walk right to the exit. | Intro | Movement-to-exit browser test passes. |
| 2 | NOT SO FAST | Triggered bridge collapse. Jump across the 100-pixel section after approaching its trigger. | Intro | No full route proof; manual completion remains necessary. |
| 3 | UNSTABLE GROUND | Three crumble stepping stones. Jump from the left ledge onto each stone without lingering. | Easy | No full route proof; manual completion remains necessary. |
| 4 | FIND THE BEAT | Phased pop spikes. Wait or jump to cross five offset spike cycles. | Easy | No full route proof; manual completion remains necessary. |
| 5 | THE SKY IS WATCHING | Approach-triggered falling ceiling. Bait or outrun blocks, then jump their landed bodies. | Easy | No full route proof; manual completion remains necessary. |
| 6 | FREE RIDE | Horizontal ferry with exit ambush. Ride the ferry over the 320-pixel pit; jump the exit spikes. | Moderate | No full route proof; manual completion remains necessary. |
| 7 | CATCH ME IF YOU CAN | Door chase ending upstairs. Follow the fleeing door, then climb the right-hand stairs. | Moderate | No full route proof; manual completion remains necessary. |
| 8 | GOING THE WRONG WAY | Opposing belt. Run against the conveyor, then jump the triggered exit spikes. | Moderate | No full route proof; manual completion remains necessary. |
| 9 | THE FLOOR HATES YOU | Tracking gap. Stay ahead of the moving hole and jump over it when it catches up. | Moderate | No full route proof; manual completion remains necessary. |
| 10 | BOUNCE HOUSE | Spring ascent. Launch from x360 to the y290 shelf; jump the delayed spikes. | Moderate | No full route proof; manual completion remains necessary. |
| 11 | EVERYTHING IS BACKWARDS | Reversed controls over two gaps. Reverse directional input in the marked zone; jump both pits. | Moderate | No full route proof; manual completion remains necessary. |
| 12 | NOW YOU SEE IT | Phased disappearing bridge. Time three blink-platform landings and jump the exit ambush. | Moderate | No full route proof; manual completion remains necessary. |
| 13 | PICK YOUR DOOM | Decoy exits. Avoid both fake doors and react to delayed spikes/falling block. | Moderate | No full route proof; manual completion remains necessary. |
| 14 | SPINNING DEATH | Crossing saw patrols. Separate horizontal and vertical saw timings, then jump exit spikes. | Moderate | No full route proof; manual completion remains necessary. |
| 15 | FLAT ENOUGH | Staggered crushers. Cross in recovery windows; bait the final triggered crusher. | Hard | No full route proof; manual completion remains necessary. |
| 16 | LASER FOCUS | Vertical laser timing. Cross on warning/off phases and jump exit spikes. | Moderate | No full route proof; manual completion remains necessary. |
| 17 | QUANTUM LEAP | One-way portal over lethal gap. Use the portal, then jump the exit spike strip. | Moderate | No full route proof; manual completion remains necessary. |
| 18 | TICK TOCK | Three pendulum timings. Pass each bob near the ends of its swing; jump the exit ambush. | Hard | No full route proof; manual completion remains necessary. |
| 19 | INCOMING | Two projectile lanes. Move through ground spikes while avoiding shots at two heights. | Hard | No full route proof; manual completion remains necessary. |
| 20 | PRESS TO PROCEED | Latching floor switch. Press g1, pass the gate, avoid the fake door and spike ambush. | Moderate | No full route proof; manual completion remains necessary. |
| 21 | ELEVATOR SHAFT | Two vertical lifts. Ride the left lift, traverse the middle shelf and right lift. | Hard | No full route proof; manual completion remains necessary. |
| 22 | PRODUCTION LINE | Forward belt into crushers. Brake against belt movement and use crusher recovery windows. | Hard | No full route proof; manual completion remains necessary. |
| 23 | SPRING FEVER | Two spring-assisted gaps. Run into each spring and steer onto the next floor segment. | Moderate | No full route proof; manual completion remains necessary. |
| 24 | PHASE BLADE | Blink bridge with vertical saw. Time the two platforms around the central saw patrol. | Hard | No full route proof; manual completion remains necessary. |
| 25 | CROSSFIRE | Turret and laser crossfire. Choose laser windows while managing the horizontal shot lane. | Hard | No full route proof; manual completion remains necessary. |
| 26 | PORTAL HOPPER | Ferry into upper portal. Ride the moving platform, use the portal and exit on the upper shelf. | Hard | No full route proof; manual completion remains necessary. |
| 27 | RHYTHM DOMAIN | Mixed rhythm sequence. Cross staggered spikes and laser phases; remember the last ambush. | Hard | No full route proof; manual completion remains necessary. |
| 28 | THE FULL DOMAIN | Conveyor, ferry, saw, crusher. Use the belt and ferry, then time saw/crusher windows. | Hard | No full route proof; manual completion remains necessary. |
| 29 | TRUST NOBODY | Fake exits and collapsing bridge. Skip both decoys, clear the collapsing span and falling block. | Hard | No full route proof; manual completion remains necessary. |
| 30 | THE FINAL DOMAIN | Out-and-back finale. Approach the right door; return over the ferry and spring up to its new left exit. | Hard | Overhead spring obstruction fixed; zero-death input replay. |

## Pattern analysis used for the expansion

Most existing levels traverse left-to-right and reuse an exit-side PopSpikes ambush.
Existing combined pairs include conveyor/crusher, blink/saw, turret/laser, and
ferry/portal. Ordinary latching switches appear in 20; momentary switches were
not used in the original campaign. Door chases appear in 7 and 30. Springs were
primarily launch devices, and falling blocks primarily overhead threats.

The expansion introduces switch elevation as a route requirement (31), a falling
block used as a necessary stair (32), a portal that starts a reverse upper route
(33), low-running momentary gate corridors with ceiling traps (34), a descending
false summit (35), belt plus inverted air steering (36), a switch-and-return-portal
circuit (37), mismatched delayed impacts over a fragile escape bridge (38), a
charged momentary gate across a portal (39), and a two-launch switch/portal/door
relay (40). These reuse trap classes without copying a complete prior layout.
