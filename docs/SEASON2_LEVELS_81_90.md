# Season 2: campaign 71–90

Update — 8 November 2026: the user approved Levels 81–90 for campaign integration and mobile testing. All 90 levels are included in the new Android test APK. The experiment report below records the earlier verification and review status.

Approved Levels 71–80 (including the repaired Dovetail) are now in the offline campaign. Levels 81–90 remain developer-only, awaiting personal review. No procedural generator created these layouts.

Play campaign: http://127.0.0.1:8091/game
Play new levels: http://127.0.0.1:8091/season2-lab

Move with arrows or A/D; jump with Space, Up or W; R restarts; Esc returns to the lab.

## Level designs and evidence

Times below are successful fresh-engine replay times, not expected first-attempt human times. All ten passed Node replay and Chrome keyboard replay with zero deaths, required mechanic events and ordered stage completion. Chrome completion replays use a deterministic clock; live movement/jump/restart/return controls were checked separately on the persistent server at port 8091. Human review remains pending.

| Level | Name | Target | Mechanics | Hidden surprise | Replay | Verification |
|---|---|---|---|---|---|---|
| 81 | THE SWITCHBACK ARCHIVE | HARD | Button, Gate, Teleporter, PopSpikes, Laser | Entering the chute wakes a row of hidden teeth in the gallery. | 5.892 s | Node + Chrome PASS |
| 82 | COUNTERWEIGHT POST | HARD | MovingPlatform, Button, Gate, Teleporter, FallBlock | The final delivery dislodges a weight over the exit landing. | 5.833 s | Node + Chrome PASS |
| 83 | THE DOUBLE HELIX | HARD | Spring, Button, Gate, Teleporter, CrumblePlatform, PopSpikes | The portal exit is a brittle shelf; the last low landing grows spikes. | 3.375 s | Node + Chrome PASS |
| 84 | THE SILENT FOUNDRY | EXPERT | Crusher, Button, Gate, Laser, PopSpikes | The apparent exit drops to the cooling channel, arming teeth below the press. | 6.708 s | Node + Chrome PASS |
| 85 | BORROWED SECONDS | HARD | Button, Gate, CrumblePlatform, FallBlock | The summit drops a block onto the last broad landing. | 3.083 s | Node + Chrome PASS |
| 86 | UNDER THE ORCHARD | HARD | Teleporter, MovingPlatform, FallBlock, PopSpikes | A hanging fruit falls as the ferry leaves; hidden thorns guard its destination. | 6.875 s | Node + Chrome PASS |
| 87 | THE PRISM LOCK | EXPERT | Spring, Button, Teleporter, Laser, Gate, PopSpikes | The portal wakes teeth on the final landing before you can see them. | 5.075 s | Node + Chrome PASS |
| 88 | THE EMPTY BALCONY | HARD | Spring, MovingPlatform, CrumblePlatform, Saw | The balcony door flees and its escape ledge crumbles behind you. | 3.350 s | Node + Chrome PASS |
| 89 | THE FLOODGATE | HARD | Button, Gate, Teleporter, PopSpikes, CrumblePlatform, Laser | The drain opens onto a floor spike ambush; the next landing is fragile. | 6.500 s | Node + Chrome PASS |
| 90 | CLOSING THE VAULT | EXPERT | MovingPlatform, Button, Gate, Spring, Laser, PopSpikes | The exit abandons its roof perch and exposes hidden spikes at the lower vault entrance. | 4.592 s | Node + Chrome PASS |

## Measurement details

| Level | Active traversal | Idle | Repeated traversal | Jump presses | Required events | Ordered stages |
|---|---|---|---|---|---|---|
| 81 | 5.883 s | 0.000 s | 0.000 s | 5 | 5 | 6 |
| 82 | 5.825 s | 0.000 s | 0.000 s | 5 | 5 | 7 |
| 83 | 3.358 s | 0.000 s | 0.000 s | 3 | 7 | 7 |
| 84 | 6.708 s | 0.000 s | 0.042 s | 6 | 5 | 7 |
| 85 | 3.083 s | 0.000 s | 0.000 s | 5 | 5 | 6 |
| 86 | 6.242 s | 0.017 s | 0.217 s | 7 | 4 | 6 |
| 87 | 5.067 s | 0.000 s | 0.000 s | 4 | 6 | 8 |
| 88 | 3.350 s | 0.000 s | 0.000 s | 2 | 4 | 6 |
| 89 | 6.483 s | 0.008 s | 0.275 s | 8 | 6 | 7 |
| 90 | 4.592 s | 0.000 s | 0.058 s | 4 | 7 | 6 |

Mean replay time: **5.13 s**, versus **5.26 s** for 71–80. Both sets have seven Hard and three Expert design labels. This is a comparable target, not a validated equivalence in human difficulty.

Repetition is the existing 20px-cell revisit heuristic, not an assessment of player intent. Carrier motion is counted separately from active traversal. Required observations verify this route, not every possible alternative route. Ground-only input in either direction is rejected by regression tests.

## Preserved content and packaging

- Existing Levels 1–70 and the approved 71–80 fixture coordinates are preserved. The campaign receives serialized copies of the approved fixtures; draft metadata and experimental levels are not bundled.
- Engine, physics, camera, controls, local-save code and offline runtime are unchanged.
- Chrome verifies the 70 → 71 unlock from an old save, all 80 level buttons, 41 campaign completion replays and release progression locking.
- The Android debug APK was rebuilt offline with the 80-level campaign. This verifies packaging; no device installation or device playtest is claimed.

Evidence: `forge/season2/results/81.json` through `90.json`, `test-results/season2-browser.json`, `test-results/season2-81-90-browser-tests.txt`, `test-results/campaign-80-browser-tests.txt`, `test-results/campaign-80-browser.json`, `test-results/campaign-80-android-build.log`. Browser completion screenshots are `test-results/season2-81-complete.png` through `season2-90-complete.png`.

Level 88 also completed with native keyboard input and an unmodified browser animation clock, with zero deaths (	est-results/level-88-live.json). Its parapet prevents the continuous-Left shortcut caught during regression testing.

Final regression results: **182/182 Node tests**, **45/45 basic checks**, Chrome mobile smoke checks, **41 campaign replays**, and **10/10 new lab replays** passed. Full output: `test-results/campaign-80-node-tests.txt`.
