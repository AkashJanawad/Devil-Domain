# 100-level campaign and Level 34 repair

15 November 2026. Levels 91–100 are individually authored and integrated into the campaign at the user’s request. No procedural generator created these layouts. The first 90 levels retain their previous geometry; only the two Level 34 gate-closing options changed. Physics, controls, camera, saves and offline operation are preserved.

## Level 34: HOLD YOUR BREATH

Normal rightward movement reproduced the fault: the first momentary gate closed during passage and pushed the player back to x=314. The old recorded route relied on jumps and direction changes, despite the intended stay-low route. Both gates now use the existing closeSpeed option at 1.2 instead of the default 4. No Gate implementation or physics change was made.

The new replay runs right and jumps once over the final spikes, completing in **3.125 seconds**, with zero deaths. Regression tests cover three jump positions and show that reinstating the old gate timing reproduces the blocked run. Live Chrome verification completed twice with native keyboard input and once with emulated mobile touch input on the unmodified animation clock, all with zero deaths. This is browser touch verification, not a physical-device playtest.

Evidence: `tests/replays/level-34.json`, `test-results/level-34-live.json`, `test-results/level-34-touch-win.png`, `test-results/level-34-regression.txt`.

Because replay fingerprints include the whole game source, the Level 34 data edit changed that fingerprint. Before rebinding the current fixture records, **79 existing traces were freshly replayed successfully**. Archived generation/history records and historical browser reports were left unchanged.

## Levels 91–100

| Level | Name | Target | Mechanics | Hidden surprise | Replay | Verification |
|---|---|---|---|---|---|---|
| 91 | THE TURNSTILE | HARD | Spring, Button, Teleporter, MovingPlatform, Laser, Gate, PopSpikes | The turnstile arms concealed teeth beside the final gate. | 5.492 s | Node + Chrome PASS |
| 92 | HIGH WATER MARK | HARD | Crusher, CrumblePlatform, Teleporter, FallBlock | A submerged step breaks away, and entering the drain drops a block above the exit well. | 4.792 s | Node + Chrome PASS |
| 93 | SPLIT DECISION | HARD | Teleporter, MovingPlatform, Button, Gate, PopSpikes, FallBlock | Returning with the release wakes a hidden spike strip in the left-hand exit corridor. | 4.783 s | Node + Chrome PASS |
| 94 | PAPER MOON | EXPERT | Spring, Button, MovingPlatform, Gate, FallBlock | The door falls into a locked pocket; approaching the ferry releases a paperweight into that pocket. | 4.642 s | Node + Chrome PASS |
| 95 | THE LONG FUSE | HARD | Button, Gate, Teleporter, CrumblePlatform, Saw, PopSpikes | The transfer arms the last holder with concealed teeth. | 5.100 s | Node + Chrome PASS |
| 96 | OFF THE RECORD | EXPERT | MovingPlatform, Button, Gate, Teleporter, FallBlock, BlinkPlatform, CrumblePlatform | An archived weight falls as you enter the tube, and the lower shelf gives way beneath you. | 6.083 s | Node + Chrome PASS |
| 97 | THE BACKDRAFT | HARD | Button, Crusher, Gate, Teleporter, Laser, PopSpikes | Entering the flue arms the hidden teeth at the far end of the upper escape. | 6.075 s | Node + Chrome PASS |
| 98 | MISSING RUNG | HARD | CrumblePlatform, Spring, Teleporter, PopSpikes | The missing rung is a crumbling step; the exit room grows spikes as you cross its gap. | 3.783 s | Node + Chrome PASS |
| 99 | THE LAST RECEIPT | HARD | Conveyor, CrumblePlatform, Button, FallBlock, Teleporter, Gate, Laser, PopSpikes | Stamping the receipt drops a weight into the outgoing passage; the portal wakes teeth near the exit. | 6.525 s | Node + Chrome PASS |
| 100 | THE HUNDREDTH DOOR | EXPERT | MovingPlatform, Button, Spring, Teleporter, Gate, Laser, CrumblePlatform, PopSpikes | The door flees twice. Its final retreat arms hidden teeth on your original starting bank. | 6.975 s | Node + Chrome PASS |

| Level | Active traversal | Idle | Repeated traversal | Jump presses | Required observations | Ordered stages |
|---|---|---|---|---|---|---|
| 91 | 5.433 s | 0.017 s | 0.100 s | 7 | 7 | 6 |
| 92 | 4.775 s | 0.008 s | 0.017 s | 4 | 3 | 8 |
| 93 | 4.750 s | 0.017 s | 0.133 s | 7 | 6 | 5 |
| 94 | 4.642 s | 0.000 s | 0.000 s | 6 | 6 | 7 |
| 95 | 5.092 s | 0.000 s | 0.000 s | 6 | 5 | 6 |
| 96 | 6.075 s | 0.000 s | 0.017 s | 4 | 6 | 7 |
| 97 | 6.067 s | 0.000 s | 0.008 s | 11 | 5 | 7 |
| 98 | 3.775 s | 0.000 s | 0.000 s | 4 | 4 | 6 |
| 99 | 6.508 s | 0.008 s | 0.000 s | 7 | 7 | 6 |
| 100 | 6.908 s | 0.000 s | 0.333 s | 12 | 9 | 9 |

The seven Hard / three Expert labels express design intent. Replay times are successful execution times, not expected human first-attempt times. Repetition uses the existing 20px-cell revisit heuristic. Required observations prove the recorded route, not the necessity of every mechanic on all possible alternative routes. Both ground-only directional bypass tests fail to win for every new level.

All ten completion replays passed through the persistent local Forge server on port 8091 with native keyboard events and a stepped simulation clock, with zero deaths. Live movement/jump/restart/return controls were also checked. Chrome campaign verification covers all 100 menu entries, 61 completion replays, mobile layout, saves, and the 90 → 91 unlock.

- Campaign: http://127.0.0.1:8091/game
- Isolated developer playtests: http://127.0.0.1:8091/season2-lab
- New fixture evidence: `forge/season2/results/91.json` through `100.json`
- Browser evidence: `test-results/campaign-100-browser-tests.txt`, `test-results/campaign-100-lab-tests.txt`, `test-results/season2-browser.json`
- Each completion screenshot: `test-results/season2-91-complete.png` through `season2-100-complete.png`

Final checks: **193/193 regression tests** and **45/45 basic checks** passed. The Android debug APK built successfully offline. Its packaged assets match the verified source, include the Level 34 repair and all 100 campaign levels, and use the same signing certificate as the previous 90-level test APK. All levels are unlocked for mobile testing. Physical-device testing remains with the user.

APK: `android/app/build/outputs/apk/debug/Devil-Domain-100-levels.apk`. Verification: `test-results/campaign-100-apk-verification.json`. Regression output: `test-results/campaign-100-node-tests.txt`.
