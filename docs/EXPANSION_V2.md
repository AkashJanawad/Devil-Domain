# Expansion V2 — developer walkthroughs and verification

Developer-only: this directory, scripts and input replays are excluded from web
and Android runtime assets. Report date: 1 November 2026.

## Result

The existing campaign now contains exactly 40 levels. Levels 1–29 retain their
pre-expansion definitions; level 30 has one geometry correction. Every new level
and corrected level 30 has a recorded, repeatable, zero-death input-only win.
No player coordinates, velocities, trap states, completion flags or hazards are
changed during a verification replay. Only direction and jump input are applied
following a fresh normal level load. Portals move the player through their real
implementation. Search may restore candidate states, but the independent replay
verification starts over and never restores snapshots.

## Level 30 correction

The original upper shelf was R(40,300,210,16), ending at x250. The spring at
x150,y480 fired the player directly into its underside at y316. A 32-pixel-tall
player starting at y448 had only 132 pixels of head clearance; the -1000 impulse
was cut off before the intended upper return landing.

Only the shelf width changed: 210 -> 110 (right edge x150). The spring, floor,
ferry, saw, laser, pop spikes, lethal pit and moving door remain unchanged. The
38-pixel door at x110 still fits on the shelf (right edge x148). The opening next
to the shelf permits a spring ascent followed by left steering onto the exit.

Verified route: cross the ferry and hazards, approach the right door until it
flees, reverse across the pit, then spring up beside the shortened left shelf
and steer into the real exit. Replay completes in 5.825 simulated seconds.
The same recorded inputs fail with the old shelf width and win after correction.
This establishes the corrected route, not an assertion that no unintended route
could ever have existed in the old geometry.

## Physics envelope

Actual update-loop measurements at 120 simulation steps/sec, full held jump,
flat test floor, and initial horizontal speed 265 px/sec:

| Vertical impulse | Rise (px) | Same-height airtime (s) | Horizontal travel (px) |
|---|---:|---:|---:|
| Normal -645 | 94.06 | 0.600 | 159.00 |
| Spring -1000 | 228.40 | 0.925 | 245.12 |
| Spring -1100 | 276.83 | 1.025 | 271.62 |
| Spring -1150 | 302.78 | 1.075 | 284.87 |
| Spring -1220 | 341.06 | 1.142 | 302.54 |

Gravity remains 2150 px/s²; ground/air acceleration remains 2600/1800 px/s²;
maximum fall speed remains 980. Starting from rest shortens travel. Player width,
height, coyote time, landing height and platform motion also affect reachable
landings. These measurements inform design; actual full-route replays provide
completion evidence. No general-purpose physics constants were changed.

## New level report

Status for every row: **VERIFIED BY GAMEPLAY SIMULATION**, including independent
Chrome runs with KeyboardEvents and the actual game update/draw functions.
Times are reference replay times, not difficulty or human speedrun targets.

| # | Name | Unique concept | Hidden surprise | Intended strategy | Replay time | Verification status |
|---|---|---|---|---|---:|---|
| 31 | THE RECEIPT | Raised switch beyond a disposable approach | Approach bridge collapses | Jump the bridge, climb two ledges, press the high switch, pass the gate | 3.125 s | VERIFIED BY GAMEPLAY SIMULATION |
| 32 | HEADROOM | A threat becomes the necessary staircase | Approach releases a falling block; later ledge spikes | Bait the block, use its landed top, climb the shelves and jump the delayed spikes | 13.283 s | VERIFIED BY GAMEPLAY SIMULATION |
| 33 | RETURN POLICY | One-way delivery to a reverse upper route | Spikes deploy behind the portal landing | Warp right, then jump left over spikes and between upper shelves | 3.592 s | VERIFIED BY GAMEPLAY SIMULATION |
| 34 | HOLD YOUR BREATH | Two momentary gates reward staying low | Ceiling spikes deploy above switches | Run across each switch under its opening gate; save the jump for the final ground spikes | 3.125 s | VERIFIED BY GAMEPLAY SIMULATION |
| 35 | FALSE SUMMIT | Spring ascent becomes a descending escape | The summit exit flees; the descent stone crumbles | Reach the false summit, chase right over the crumble stone, cross the laser window | 3.125 s | VERIFIED BY GAMEPLAY SIMULATION |
| 36 | COUNTERMAND | Opposing belt plus reversed air steering | Delayed spikes beyond the inverted zone | Reverse input through the zone, clear the gap, restore normal input, jump spikes and time the saw | 3.150 s | VERIFIED BY GAMEPLAY SIMULATION |
| 37 | AFTERIMAGE | Outbound blink bridge and gated return portal | Switch island collapses on approach | Cross the blink platforms, press the island switch, warp back and pass the now-open upper gate | 3.600 s | VERIFIED BY GAMEPLAY SIMULATION |
| 38 | DELAYED APPLAUSE | Two different impact delays and fragile escape | Triggered ceiling blocks and crumbling bridge | Outrun the first impact, clear the second landed block, cross the fragile span while respecting the high shot lane | 3.808 s | VERIFIED BY GAMEPLAY SIMULATION |
| 39 | CLOSED CIRCUIT | Charge a temporary opening across a teleport | Arrival spikes activate from the departure side | Charge the floor switch, enter the portal, immediately run through the closing gate | 1.717 s | VERIFIED BY GAMEPLAY SIMULATION |
| 40 | THE LAST WORD | Two-launch switch/portal/door relay | Switch summit collapses and the final door relocates | Launch to switch, warp off the summit, pass its gate, chase the fleeing exit using the right spring | 3.250 s | VERIFIED BY GAMEPLAY SIMULATION |

### Walkthrough details and countermeasures

31. Start (55,440), exit (884,416). Approach x260 triggers the bridge at x300–400:
0.22-second delay plus shaking. Jump it. The ledges at (460,420) and (570,360)
provide two 60-pixel climbs. Press receipt at x590,y350; gate x740 opens. Dropping
back to the floor is safe. Learning goal: look up for the switch rather than
repeatedly pushing a closed gate.

32. Start (55,440), exit (874,226) on the y290 shelf. Crossing x300 releases the
block at x390–490 after a 0.35-second shake. Wait to its left; its landed top is
y420, 60 pixels above the floor. Jump to it, then to x520,y350 (70-pixel rise),
then x680,y290 (60-pixel rise). The trigger near x645 starts spikes at x740 after
0.65 seconds. Jump that strip rather than assuming the upper shelf is safe.
The reference replay includes several positioning/waiting hops; a human route
can be simpler, but only the recorded route is claimed verified.

33. Start (55,440), exit (100,296). Reach the lower portal at x300. It deposits
you on the right upper shelf at x830. Moving left through x780 triggers spikes
at x670 after 0.3 seconds. Jump them, then traverse the y390 middle shelf and
y360 left shelf. The upper shelves cannot be reached with a normal ground jump
from the initial floor, making delivery and return the intended solution.

34. Start (55,440), exit (884,416). Walk over buttons x260 and x560 to raise gates
x340 and x640. Ceiling traps above the gates emerge after 0.2 seconds. Stay low:
their tips leave enough room for the grounded player. Continue through before
the momentary gates close. The Level 34 gates now close at 1.2 (formerly 4), giving the player time to clear them after leaving each plate. Jump only after clearing the second corridor, over
x790–845 ground spikes. Surprise teaches restraint, not an arbitrary death.

35. Start (55,440). Use the x220 spring (-1220) to reach the y260 shelf at x400.
Approaching the apparent exit x480 relocates it to (884,416). Jump right to the
x640,y310 crumble stone (0.4 seconds of grace), then onto the right floor. Watch
the x775 laser's warning/off interval before committing to the descending jump.

36. Start (55,440), exit (884,416). The belt at x120–340 pushes left. The region
x280–600 reverses controls. Change to LEFT input to move right inside that region,
and use a held jump to clear the 140-pixel gap x360–500. Switch back to RIGHT
when leaving the zone. Trigger x520 arms the x630 strip with a 0.45-second delay;
jump it and pass the x780 vertical saw when it is above the route.

37. Start (55,440), exit (60,256) behind the upper-left gate. Time the x300,y430
and x490,y390 blink stones. The x700–840 switch island starts collapsing when you
cross x660 (0.7-second delay plus shake). Land, press return at x760 and proceed
to the portal x850. It places you at x230 on the upper-left shelf, right of the
now-open gate. Move left to the exit. Do not wait on the switch island.

38. Start (55,440), exit (884,416). Crossing x240 arms the first overhead block
with a long 0.9-second shake; keep moving to leave its impact area. Crossing x430
arms the second block with only 0.25 seconds. Adjust pace/jump over its landed
60-pixel step. Cross the x640–760 crumble bridge without stopping. Shots run at
y388, so jumping indiscriminately can put you into their lane.

39. Start (55,440), exit (884,416). Button x260 is momentary and 60 pixels wide;
spend enough time on it to raise the gate, then enter the x320 portal. Arrival
is x680. Continue right immediately through gate x740 before it closes; don't
wait on the arrival pad, whose spikes were armed on departure with 0.6 seconds'
notice. This gate alone uses closeSpeed 1.5 instead of the original 4. Tests keep
the old default intact. Without the longer closing interval, travel plus portal
velocity reset consumed the available opening. No global gate behavior changed.

40. Start (55,440). Spring x200 (-1150) launches toward the switch summit x420,
y300. Press last at x470,y290, then enter the portal x525 before the summit falls
(0.8-second delay plus shake). Arrive on the right floor, pass gate x800 and
approach the apparent exit x884. It relocates to (610,236). The x880 spring
(-1100) provides the return launch to the y300 central shelf. Steer left beneath
the saw when its phase leaves room, then enter the real exit. No spikes or saws
are disabled by the switch.

## Evidence and repeatability

- `npm test`: 45 legacy checks plus 74 runtime/configuration tests: **119 passed,
  0 failed**. Includes 40 level build/safe-spawn/simulation/reset checks, unchanged
  definitions 1–29, legacy saves, developer/release unlocks, 30→31 and 40→end.
- Levels 30–40 each win three consecutive input replay runs with zero deaths;
  recorded outcome/trajectory equality is asserted. A replay is also exercised
  after a death/respawn cycle. Existing per-trap reset tests cover all 40 builds.
- Every new replay actually activates a surprise; the test asserts that event,
  rather than only checking for a trap class in source.
- `npm run test:browser`: real-time Chrome smoke test plus eleven deterministic
  KeyboardEvent replay victories. Smoke test covers direct level 40→12 selection,
  unmodified saves, all 40 renders, actual browser multitouch delivery/release/
  cancellation, small landscape grid, progression and reload. Browser replay
  clock is controlled; this is simulation, not a claimed human playthrough.
- Input files: tests/replays/level-30.json through level-40.json. Each action is
  [direction (-1/0/1), jump held], lasting 12 fixed ticks (0.1 s). Jump buffers
  are set only on a false→true jump edge. Driver: tests/replay-driver.js.
- Outcomes and trajectories: test-results/replay-results.json; browser results:
  test-results/browser-replays.json. Search helper: scripts/search-route.js, with
  developer waypoints in scripts/route-goals.json. Search is not run by tests.

## Developer access and release safety

Local game-config.js enables DEVELOPER_UNLOCK_ALL_LEVELS in development mode.
Change its value to false to test normal progression locally. The menu clearly
labels developer access; selecting a level never writes completion or death data.
Completion still saves genuine wins normally.

`npm run build:release` generates release/false configuration in www.
`npm run cap:sync:release` synchronizes it. More importantly, every native release
build automatically runs generateReleaseWebAssets, generating a separate release
asset overlay with release/false configuration. This overrides a prior developer
sync, even if local game-config.js remains true. Direct `bundleRelease` is guarded.
Release mode also ignores a true unlock flag at runtime. Do not remove the Gradle
generation task or use a development web folder for a production web deployment.

## Android artifacts

The existing project was synchronized and `assembleDebug bundleRelease` succeeded.
The resulting ZIP entries were inspected, not just the source settings:

- Debug APK: android/app/build/outputs/apk/debug/app-debug.apk — all 40 selectable.
- Release AAB: android/app/build/outputs/bundle/release/app-release.aab — genuine
  progression, developer flag false; unsigned, not upload-ready.
- Both contain final game.js/index.html/style.css bytes matching source.
- Neither includes developer docs, search scripts or replay files.
- Debug APK SHA-256: E817D8B23D5022B1DCF32F83EC518EC49E22FB33268B5FFB36F36C205EB1278A.

## Remaining verification

Physical Android/emulator gameplay is NOT VERIFIED. Device touch ergonomics,
frame pacing, notch layouts, audio and human difficulty/fun still need playtesting.
A zero-death input sequence establishes one repeatable route; it does not prove
all routes safe or every surprise intuitive. No human playthrough is claimed.
Levels 2–29 still lack full automated completion proofs; their existing definitions
and simulation/reset regressions pass. This expansion does not relabel them as
fully verified. The previously documented development dependency advisories and
unsigned release workflow remain unchanged.

## Files changed

Game/configuration: game.js, game-config.js (new), index.html, scripts/build.js,
package.json, android/app/build.gradle. Existing style.css and physics constants
were preserved. Tests: harness.js, gameplay.test.js, run-tests.js, browser-smoke.js;
new expansion.test.js, replay-driver.js, browser-replays.js and eleven replay JSONs.
Developer tools: search-route.js, route-goals.json, shorten-route.js,
write-inventory.js. Documentation: README.md, ANDROID_BUILD.md, this report,
LEVEL_INVENTORY.md, level-inventory-1-30.json; historical AUDIT_REPORT.md is marked
as superseded for current counts/artifacts. Generated www/Android assets and
verification logs/screenshots were refreshed. No save keys were reset or renamed.
