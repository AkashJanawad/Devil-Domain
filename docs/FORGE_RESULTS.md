# Level Forge delivery — 4 November 2026

## Trial results

All ten are engineering-approved and integrated. Human playtesting and Android
device execution remain NOT TESTED. Difficulty is an estimate.

| ID | Name | Estimated difficulty | Hidden traps | Schema | Solver | Replay | Production approval |
|---|---|---|---:|---|---|---|---|
| 41 | BELT UNDER FIRE | MEDIUM (33/100) | 1 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 42 | CROSSWIND DELIVERY | MEDIUM (39/100) | 2 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 43 | THE MOVING VERDICT | MEDIUM (40/100) | 1 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 44 | FALSE SHELTER | HARD (46/100) | 2 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 45 | GUST AND HAMMER | HARD (50/100) | 2 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 46 | WIND OVER NOTHING | HARD (50/100) | 3 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 47 | THE LATE SHIFT | HARD (51/100) | 1 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 48 | SWITCH IN THE WIND | HARD (55/100) | 2 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 49 | FINAL NOTICE | HARD (56/100) | 2 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |
| 50 | REVERSE THE VERDICT | HARD (59/100) | 1 | PASSED | VERIFIED | VERIFIED (Node + Chrome) | APPROVED; human review pending |

## Verification

Baseline: 119 tests passed. Final: those 119 plus 19 Forge tests (138 total).
Chrome smoke checks cover all 50 renders, save restoration, mobile multitouch,
cancellation and menu selection. Eleven prior level 30–40 keyboard replays pass.
Ten additional Forge keyboard replays win in Chrome, with zero deaths/page errors.
Forge preview, manual-entry action, replay and approved JSON download were tested.
Manual-entry testing is not a claim of a completed human playthrough.

The original 40 level definitions are byte-identical to the pre-task snapshot;
levels 30 and 34 retain passing input replays. The only game.js edit is a season
unlock gate outside the level registry and physics. No save keys changed.

Android assembleDebug and bundleRelease succeeded. Both archives were inspected:
final runtime source bytes match, developer tools/tests/docs are absent, and the
release AAB has developer unlocking disabled. AAB remains unsigned. No emulator
or physical-device execution was performed.

Logs: test-results/forge-baseline.txt, forge-tests.txt, forge-regression.txt,
forge-browser-regression.txt, forge-browser.json and forge-android-build.txt.

## Files

Created: forge/core.js, server.js, worker.js, index.html, app.js, batch.js,
promote-trial.js, browser-test.js, original-levels.txt, work/batch.json;
level-runtime.js, content/season-one.js, campaign.js, tests/forge.test.js,
docs/FORGE_ARCHITECTURE.md, docs/LEVEL_FORGE.md and this report.
Updated: game.js (season selection gate only), index.html, style.css,
scripts/build.js, package.json, tests/browser-smoke.js, tests/browser-replays.js,
README.md and ANDROID_BUILD.md. Generated web/native assets and test evidence
were refreshed. Existing 40-level layouts, names, mechanics and physics unchanged.
