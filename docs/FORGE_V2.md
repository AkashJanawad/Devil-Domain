# Level Forge V2 — delivery report

Launch: npm run forge; http://127.0.0.1:8091. The server is running.

## Root causes

The saved Season 2 batch allowed only PopSpikes, required PopSpikes and demanded four distinct mechanics. All ten FAILED before solving with “Template requires a disallowed mechanic”. IDs 51–60 and season 2 were correct. Similarity and replay were not reached. V2 makes those constraints opt-in and uses compositional generation. The saved failure evidence is forge/fixtures/season2-failures.json.

Preview inspection found no persisted save influence (storage was already isolated). There was no iframe readiness handshake, candidate selection changed before preview injection, and reload/respawn could restore the temporary level index in the HUD. Those are confirmed lifecycle defects; the exact historical screenshot transition cannot be reproduced from the saved image alone. Preview now waits for runtime readiness, discards superseded selections, injects exact data, checks ID/seed/data/SHA-256, and keeps the candidate ID through respawn. Replay actions reject selection races and data-fingerprint changes.

The baseline command did NOT pass all prior tests: the 119 game checks passed, but 13 of 19 Forge tests failed because they read the developer’s mutable failed batch instead of approved-level fixtures. Those tests now use archived immutable approved data.

## Difficulty

Only two primary score inputs remain: 60% estimated completion time and 40% local trap concentration. Estimated time is 2 × solver route duration + 2 seconds per hidden discovery + 3 seconds per exit relocation/portal. These coefficients are explicit calibration assumptions, not measured human times. Concentration is the maximum number of trap anchors within a sliding 200-pixel horizontal section. This is a local-density proxy, not an occupancy heatmap. Human seconds are separately recordable. Six active categories: BEGINNER, MEDIUM, VERY HARD, EXTREME, INSANE, DEMONIC. Future categories are configuration-only.

## Generation and UX

V2 composes ambush, falling block, switch/gate, wind, pendulum, laser, saw, conveyor and fake-door sections independently with direct, elevated or return routes. It reuses existing mechanics. Sections, timing, positioning and combinations are seeded. No old level is regenerated. Count 1–50 and difficulty are the only primary inputs; the remaining controls are collapsed and mechanic constraints require an explicit checkbox. Background workers process one candidate at a time with bounded search; progress and counts remain visible. IDs allocate above production/current reservations and cross season boundaries automatically. Failed records retain their ID; no automatic reuse. The first 51–60 retry explicitly replaces the archived failed batch.

Existing real-engine solver, independent hash-bound replay, hidden-activation requirement, displacement guard, similarity threshold and manual approval/export remain intact. Candidate comparison includes the current batch and approved production levels. Failed diagnostics include identity, seed, stage, category, reasons, geometry and repair history. Existing safe exit repair remains bounded. Some generic validation diagnostics still use INVALID_GEOMETRY; finer mechanic-specific categories are future work.

## Batch 51–60 — no production approval

| ID | Name | Estimated difficulty | Estimated seconds | Hidden | Generation | Solver | Replay | Approval |
|---|---|---|---:|---:|---|---|---|---|
| 51 | SCARLET RELAY | BEGINNER | 10.2 | 2 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 52 | SILENT SHELTER | MEDIUM | 12.4 | 3 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 53 | ASH THRESHOLD | MEDIUM | 20.6 | 3 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 54 | ASH RELAY | BEGINNER | 8.0 | 1 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 55 | ASH ECHO | MEDIUM | 10.8 | 2 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 56 | HOLLOW RETURN | MEDIUM | 18.4 | 2 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 57 | OBSIDIAN PASSAGE | MEDIUM | 12.2 | 3 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 58 | SCARLET RETURN | MEDIUM | 10.2 | 2 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 59 | HOLLOW PROMISE | MEDIUM | 20.6 | 3 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |
| 60 | OBSIDIAN RECKONING | BEGINNER | 10.4 | 2 | VALID | VERIFIED | Node + Chrome VERIFIED | Awaiting your playtest/approval |

## Tests and delivery

138 existing checks pass after fixture repair; 14 V2 checks pass. Existing Chrome regressions pass, including 41–50 coverage in the Forge browser fixture. Ten 51–60 keyboard-input Chrome replays win with zero deaths. Production-file SHA-256 tests confirm all game/runtime/HTML/CSS/content files remain unchanged. Android assembleDebug and bundleRelease succeed; device execution NOT TESTED. Forge remains outside the production allowlist. No candidate is integrated or approved; the production campaign remains exactly 50 levels.

Modified: forge/core.js (accept new category metadata), server.js, worker.js, app.js, index.html; stable fixture references in tests/forge.test.js and forge/browser-test.js. New: forge/v2.js, trial-v2.js, browser-v2-test.js, tests/forge-v2.test.js and fixtures/report. package.json adds test:forge:v2. Names are unique within each batch, without numeric suffixes. Production game files and levels unchanged.

## Remaining limits

The composer uses bounded screen-sized sections, not an unrestricted multi-room planner. Higher tiers increase section targets but are not guaranteed to reach human-calibrated target times. Density uses anchors rather than exact playable-area intersections. Backward surprise portals and deceptive-switch route mutation are not newly implemented; verified existing moving exits and elevated/return routes are used. Similarity remains heuristic and seed variations can still be rejected. Manual playtesting is required to assess fun, tolerance and target-band fit. There is no claim that every high-tier request or 50-candidate batch will verify. The old V1 promotion helper is not used for these candidates; JSON export is available only after explicit approval.
