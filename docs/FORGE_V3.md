# Level Forge V3 — experimental design report

Existing production files and all 50 definitions are unchanged (SHA-256 regression). No preview rebuild, physics changes, new trap classes, APIs, or dependencies. Five new slots only: 81–85; older candidates retained. No approvals or integration.

## Algorithms
forge/v3.js composes ascent (spring, stairs, forward portal, lift), traversal (bridge, collapsing floor, shuttle), and encounter (hidden spikes, falling block, laser, switch/gate) stages. Four seeded alternative designs are evaluated per slot with real-engine bounded beam search (55 states, 220 action groups) and independent replay. Solver waypoint progress guides elevation without changing actual gameplay physics. Ranking prefers accepted, playable designs, then route-quality score. A second selection pass on slot 84 removed a duplicated stage/mechanic combination. Twenty initial alternatives plus four reevaluations, not 24 published levels.

Exit relocation is limited to one forward/upward move, with unique destinations. No repeated endpoints. Ground remains a recovery surface, upper paths contain connected challenges. Every candidate has a triggered hidden spike. Existing static validation and similarity threshold 0.88 are preserved. V3 additionally rejects repeated ascent/traversal/encounter signatures, skipped stages, >45% idle frames, >0.6 revisits per unique route cell, <1.5s routes, bypassed spring/portal/shuttle/collapse dependencies, and insufficient input tolerance. Metrics are heuristics, not proof of fun or human fairness.

Tolerance: five deterministic 100ms horizontal-input interruptions, each replayed with up to one second of finish allowance; at least two must still win. Successful original traces remain hash-bound to exact candidate data and unchanged engine.

Regular dashboard generation keeps the prior exact selected/preceding difficulty quotas and rejects out-of-band outputs. These five trials are explicitly experimental with measured tiers, not a claimed requested tier distribution. Estimated time remains twice route duration plus disclosed surprise/relocation allowances; concentration is local trap anchors per 200px window. No claim of measured human times.

## Results
| ID | Name | Stage combination | Measured tier | Estimated seconds | Perturbed wins | Engine + Chrome |
|---|---|---|---|---:|---|---|
| 81 | COILED PASSAGE — SWITCH | spring / shuttle / switch | MEDIUM | 13.2 | 5/5 | VERIFIED |
| 82 | COILED PROMISE — SWITCH | spring / bridge / switch | MEDIUM | 13.4 | 3/5 | VERIFIED |
| 83 | FOLDED PASSAGE — FALL | portal / shuttle / fall | MEDIUM | 11.6 | 2/5 | VERIFIED |
| 84 | FOLDED PASSAGE — SPIKES | portal / shuttle / spikes | MEDIUM | 11.8 | 2/5 | VERIFIED |
| 85 | COILED FOOTHOLD — SWITCH | spring / collapse / switch | MEDIUM | 15.4 | 3/5 | VERIFIED |

All five: schema/geometry, actual gameplay search, independent engine replay, Chrome keyboard replay, unchanged similarity threshold, semantic novelty, route quality, and input-tolerance checks pass. All remain unapproved.

## GPU
Local nvidia-smi reports NVIDIA RTX 3050-class hardware, 4096 MiB VRAM and driver 621.01. CUDA driver interface is reported; nvcc is not on PATH (not proof that no toolkit exists anywhere). The solver executes JavaScript object graphs in a Node VM. No CUDA kernel path exists. A GPU port would duplicate authoritative physics and require equivalence testing; no measured GPU speedup is claimed. CPU search is retained, using bounded worker execution and stage guidance. No dependencies installed.

## Verification and operation
138 existing automated checks pass; 23 V2/critical/V3 checks pass including five immutable candidate proof audits. Existing Chrome smoke covers all 50 levels; old keyboard replay suites cover 30–50. Five new Chrome replays win with zero deaths. Fresh release assets and existing APK/AAB archives exclude Forge/tests. No new Android binary build or device execution claimed.

Run npm run forge and open http://127.0.0.1:8091. Select 81–85, then play, restart or replay before approval. Worker progress reports alternative number; attempts and design-quality metrics appear in candidate details. Current server is running with these five candidates retained.

Files: forge/v3.js; optional solver waypoint guidance in forge/core.js; v3 routing/progress in forge/server.js and worker.js; extra diagnostic fields in forge/app.js. Tests/trials: forge/v3-trial.js, v3-finalize.js, v3-browser-test.js, tests/forge-v3.test.js, fixtures/v3-experimental.json. Evidence: test-results/v3-*.

## Limits
Selected designs use springs or portals; stairs/lifts/lasers are in the search grammar but not all appear in these five winners. Portals reuse existing visible forward teleporters, not a new hidden-portal mechanic. Gates open paths; no new switch-driven geometry mutation. Screen-sized architecture remains; high-tier requests can report shortfalls instead of padding routes. Fairness and originality are bounded heuristics. Manual playtesting is still needed to judge surprise, clarity and enjoyment.
