# Devil Domain — Level Forge

## Launch and workflow

From the project root run `npm run forge`, then open http://127.0.0.1:8091.
The server listens only on localhost and uses a per-process action token. No cloud,
paid API or new dependency is used. It currently remains running for this session.

1. Choose season, target difficulty, count, seed, allowed/required/excluded mechanics,
   minimum hidden traps, maximum trap count and minimum distinct mechanics.
2. Generate produces candidates only. Regenerate increments the seed. Constraints
   that a grammar cannot satisfy produce an explicit rejected candidate, never
   silently remove a required trap. Old batches are retained in forge/work/history.
3. Select a candidate to preview real engine geometry. Cyan overlays expose trigger
   rectangles and path arrays. Run Validate, then Run Solver. A worker keeps the UI
   responsive; one bounded search runs at a time. Refresh/polling shows its result.
4. Replay Solution independently replays before animating the input sequence.
   Playtest Manually enters the ordinary game controls. Preview storage is isolated
   from player localStorage. Manual testing does not silently confer approval.
5. Approve requires current replay and uniqueness checks. Reject retains the record.
   Export downloads a versioned JSON package of approved data plus proof traces.
   Export does NOT automatically alter the game. Human playtest status is separate.
6. The initial reviewed batch was promoted with forge/promote-trial.js. Future use
   requires explicit `node forge/promote-trial.js --approve` after review. It checks
   schema, replay and similarity before writing content/season-one.js. This helper
   is specifically for replacing the ten trial slots, not a general DLC installer.
   Preserve the existing content package before intentionally replacing a season.

CLI trial generation: `npm run forge:batch`. This archives the previous batch and
runs generation, validation, solver and independent replay. It never promotes.
All ordinary tests: `npm test`. Browser regression: `npm run test:browser`.
Forge UI/browser replay test (server running): `npm run test:forge:browser`.

## Architecture and schema

The existing Canvas engine remains authoritative. level-runtime.js adds only a
constructor registry and a serialized-data adapter. Generation and verification
live in forge/core.js; UI/server/search workers stay outside production assets.
content/season-one.js contains approved JSON data. campaign.js appends contiguous
IDs after the original 40 definitions and defines ten separate season records.

A schemaVersion=1 level has id, name, season, targetDifficulty, theme, seed, spawn,
exit.positions/options, platforms ({x,y,w,h}), traps ({type,args}), and checkpoints.
Constructor args preserve the engine's exact trigger/path/timing/switch options.
Checkpoints are reserved and nonempty values are rejected because this engine has
no checkpoint mechanic. Packages have schemaVersion and packageVersion; exported
proofs accompany data. Future installers must validate versions, hashes, bounds,
mechanics and asset allowlists before activation. No remote installer exists.

Registered existing types: CollapseFloor, PopSpikes, FallBlock, Crusher,
CrumblePlatform, SlidingHole, StaticSpikes, InvertZone, MovingPlatform, Conveyor,
Spring, Saw, Laser, Teleporter, Button, Gate, BlinkPlatform, Pendulum, Turret,
FakeDoor, Note. New type: WindZone. Register another constructor through
ForgeRuntime.register(name, constructor); duplicate names are rejected. All must
implement update, draw, solids, kills and reset with deterministic gameplay state.

WindZone is an optionally triggered horizontal drift region. It applies force*dt
horizontal displacement before the normal collision pass, analogous to the existing
conveyor. It does not change movement constants. It is not a fluid simulation or
persistent acceleration model. Reset restores its original armed/active state.
No existing level uses it. Existing CollapseFloor already covers delayed collapse,
so that mechanic was reused instead of introducing a redundant new class.

## Generator and repair scope

The generator is a seeded, constrained grammar with ten authored encounter recipes,
not an unlimited invention system. It combines 3–7 existing/new mechanics per trial
and seeded spike offsets. Recipe selection, coordinates and seed metadata are
repeatable. The first batch seed is 41050. Trial IDs were then ordered by measured
difficulty estimates; the approved data and original input traces are checked in.

Target difficulty is advisory: all seven tiers are accepted, but final classification
comes from route analysis and can differ. The tool does not promise an EXTREME
level just because that target was requested. This limited grammar is not ready to
produce 500 original levels; repeated recipes should hit similarity review.

Static checks cover versions/IDs/seasons, world bounds, positive geometry/timing,
platform overlap, registered mechanics, required switches, spawn safety, hidden
surprises, unsupported checkpoints and generation constraints. Constructor execution
and short real-engine simulation catch malformed hazard geometry. A valid layout
is never a solvability claim. Repair is deliberately narrow: up to two attempts,
currently only clamping an out-of-world exit, followed by full revalidation and
search. Other defects remain FAILED/UNVERIFIED for inspection; no infinite loops.

## Solver and proof

Forge boots actual game.js and level-runtime.js in the existing Node VM harness.
Only DOM/audio are stubbed. All collisions, traps, portals, input buffering, doors,
movement and deaths execute the real engine. Fixed step: 1/120 sec. Search actions
are left/neutral/right with jump held/released, in 12-tick groups. Jump buffers are
set only on a press edge. Beam search copies complete dynamic object state with
prototypes. It explores waits, switches and hazards; geometric distance is only a
ranking heuristic. Candidate search defaults to width 70/depth 140, capped at
200/300. A search miss is UNVERIFIED, not "impossible".

A trace records seed, initial spawn/reset/death state, engine+adapter hash, level
hash, timestep, durations and input actions. A fresh engine replays the entire
sequence without restoring search snapshots. VERIFIED requires the real win state,
zero deaths and an activated surprise. Stale engine/data hashes invalidate proof.
Large per-step displacement is rejected except for an actual portal activation;
this prevents accepting collision-ejection shortcuts. The first trial run exposed
such a shortcut; it was rejected and searched again. This is a conservative guard,
not a general proof of every possible collision behavior.

Verified outcomes are deterministic on replay. Human input tolerance, all alternate
routes, fun, and mobile ergonomics are not proved. Cosmetic randomness remains in
particles and audio; it does not affect the supported traps' gameplay trajectories.
Future mechanics using random gameplay must receive a seeded runtime RNG first.

## Quality estimates

Difficulty score combines jump press edges (3 each), direction changes (2 each),
timed mechanisms (6 each), hidden surprises (4 each), switches (7 each), mechanic
diversity (2 each) and route duration/action complexity. It is capped at 100 and
mapped to seven 15-point bands from BEGINNER through ULTIMATE. It measures a found
route, not necessarily the easiest route. Precision tolerance and empirical death
rates are not measured yet; human ratings should calibrate this estimate.

Similarity: 30% coarse geometry overlap, 30% mechanic overlap, 15% activation order,
10% exit regions and 15% timing/trigger/path parameter overlap. Names, colors and
IDs do not earn uniqueness. A score >=0.88 blocks approval pending review. It checks
original levels, other approved candidates, and approved trial content. Repeated
recipes are limited; the heuristic is explainable but cannot guarantee originality.
Exact renamed duplicates are rejected. Engine constructor metadata is richer than
serialized parameters, so cross-format timing comparison is conservative. A better
canonical normalization and mirrored-layout comparison are recommended next.

## Seasons and release

Season 1 now has levels 1–50. Seasons 2–10 reserve ranges but have no playable empty
content. Published progression requires completion of the preceding season. Existing
save indices stay unchanged. The completion screen says DOMAIN CONQUERED, explains
that more levels are coming and offers replay/back-to-seasons. There are no automatic
update requests. Check Google Play is informational, not a background network call.

The build allowlist includes only game runtime, configuration, approved JSON and
license notices. Forge, traces, generator, server and docs are not shipped.
Release configuration still forces developer unlocking off. Run npm run cap:sync
and the existing Gradle assembleDebug/bundleRelease workflow. Release bundles remain
unsigned until you supply your own signing key. Physical Android testing is pending.

## Next work

Prioritize human playtests, route-timing tolerance tests, normalized uniqueness,
more independently reviewed grammar modules, parameter search toward target difficulty,
and additional conservative repair operators. For gravity reversal, clones, rising
lava, darkness, sensors and room resets: first define deterministic serialized state,
collision semantics and reset tests; then add real-engine solver fixtures before
allowing generation or approval. None of these speculative mechanics is enabled.
