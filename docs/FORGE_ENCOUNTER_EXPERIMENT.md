# Bounded encounter experiment — 5 November 2026

All three manually authored encounters complete in the unchanged game engine,
with fresh hash-bound replays and matching Chrome keyboard-input executions.
Nothing was integrated, approved for release, or added to the generator grammar.
The production campaign still has 50 levels. This experiment establishes useful
mechanic combinations and measurement infrastructure; it does **not** establish
long levels, Extreme difficulty, human fairness, or procedural generation quality.

## Measured results

These are exact successful replay times, not estimated human completion times.
All three replays finish with zero deaths and all declared requirements observed
in the ordered stages. Measurements below refer to the cleaned 100ms-input traces.

| Encounter | Ticks at 120Hz | Completion | Active traversal | Passive transport only | Stationary / waiting | Repeated movement estimate | Remaining jump presses |
|---|---:|---:|---:|---:|---:|---:|---:|
| A: Spring landing → portal | 278 | 2.316667s | 2.308333s | 0.008333s | 0s | 0s | 1 |
| B: Moving platform + laser | 324 | 2.700000s | 2.700000s | 0s | 0s | 0s | 3 |
| C: Switch → opened route → hidden trap | 375 | 3.125000s | 3.125000s | 0s | 0s | 0.033333s | 4 |

All three have zero horizontal input reversals. The tiny C revisit is a local
20px-cell re-entry during traversal, not another lap of the route. This estimate
is deliberately reported separately from measured time.

The B replay rides the moving platform for 59 ticks (0.491667s), receiving about
112.87px of displacement from it. It overlaps the laser's beam location for eight
of those carried ticks while the beam is off. Riding while also walking is counted
as active traversal; it is not added again to the elapsed-time total. A's one
passive tick is the portal transition. Portal distance never earns active distance.

### A — Spring landing into a portal transition

The spring fires at tick 56. The player lands on the upper ledge at tick 148,
then enters the portal at tick 190. The destination-side hidden spike trigger
activates at tick 208; a jump at tick 216 clears it. A tall barrier separates the
two sides, so the portal is a route transition rather than a shortcut across open
floor. Ground geometry and a pit prevent a simple ground run to the exit.

Removing the spring from this recorded route causes death at tick 119. Removing
the portal leaves the player blocked at x=534 at the end of the trace. Removing
the remaining jump causes death at tick 239. This is a mechanically dependent
sequence, but it remains a simple encounter: its successful input is rightward
movement plus one jump. It is not evidence of high difficulty by itself.

### B — Moving platform with a timed hazard

The player boards the moving platform, crosses a full-height laser during its off
phase while still being carried, jumps to the far bank, then jumps the exit ambush.
The beam cannot be avoided simply by jumping over its top within this route.

Removing the carrier causes death at tick 148. Changing only the laser phase from
0.2 to 0.1 (a -170ms cycle offset) kills the original input trace at tick 176, at
the beam. Removing each of the three retained jump presses individually also
causes death. This provides direct evidence of both transport dependence and a
timing-sensitive hazard, without a forced waiting period in the winning route.

The same encounter was also freshly searched with 25ms action groups. Its separate
proof is in `492-fine.json`; no physics timestep was changed. The regular 100ms
search was sufficient for all three encounters, so a general adaptive timing
planner was not introduced.

### C — Switch-controlled route change and hidden escape trap

Three ascending jumps reach the switch, activated at tick 188. The gate becomes
non-solid at tick 215. The player passes the gate at tick 266, then triggers the
hidden escape spikes at tick 267. A fourth jump clears the ambush.

Disabling the switch leaves the player blocked at x=574. Removing any of the
three ascent jumps from the recorded route prevents completion; removing the
escape jump causes death at tick 300. The gate opens a genuinely new route,
rather than relocating the exit back over the same ground.

Counterfactuals hold the rest of the recorded input constant. A failed intervention
proves dependence of **that route**, not impossibility of every alternative route.
No exhaustive shortcut search or human playtesting claim is made.

## Measurement definitions and limits

`forge/measure.js` first independently verifies the hash-bound trace, then replays
it again in a fresh engine with the developer-only `forge/telemetry.js` observer.
Tick count and final win state must agree. No game update, collision, trap, or
movement method is replaced. Measurement ends on the actual winning tick; a
partially consumed final input group is not counted as a full group.

- **Active traversal:** player movement of at least 0.05px per tick after subtracting
  platform transport. Includes ballistic ascent/descent, not just time holding a
  direction button. It is a motion measure, not a claim that every tick is difficult.
- **Passive transport only:** a portal tick, or platform transport while the player's
  own displacement is below 0.05px. Transport occurring alongside self-movement is
  reported in distance/support counters without double-counting time.
- **Stationary time:** movement below 0.05px per tick. Subdivided into neutral-input
  waiting and input-without-movement. The latter can include held jump and should
  not be interpreted as proof of a blocking obstacle.
- **Repeated traversal:** movement in a re-entered 20px cell, within the same progress
  epoch. First observed mechanic events and ordered stage completion reset the epoch;
  hazard proximity does not. This is a disclosed heuristic, not semantic proof of
  wasted movement. Incidental first landings can also reset an epoch.
- **Interactions:** per-instance activation/trigger, gate open/pass, platform support,
  laser-beam crossing, and static-platform landing events, plus tick counts and first
  timestamps. Hazard proximity means active lethal geometry within a 24px expanded
  player rectangle; it does not by itself establish causal pressure.
- **Required mechanics:** declared event requirements and minimum carried ticks,
  checked during search and again on a fresh replay. Observed activations are
  distinct from the intervention evidence described above.

The observer covers the mechanics used in these fixtures. It is not a universal
interaction model for every possible combination of registered traps. In particular,
platform carry attribution uses the pre-tick player state; the carrier is first in
fixture B's trap update order. More complicated same-tick interactions involving
earlier player-displacing traps would require additional instrumentation before
claiming equally precise carry attribution.

The search initially produced redundant jump presses. The experiment runner removes
individual jump-hold runs only when a fresh proof and every encounter requirement
still pass, repeating to a fixed point. Original search inputs are preserved as
`solution.searchTrace`; cleaned proof inputs are `solution.trace`. Every remaining
press was individually tested. This is local input cleanup, not a global minimum-
action or shortest-route proof.

## Solver changes, limited to Forge

`forge/core.js` still executes the actual game through the existing VM harness.

1. Deduplication uses exact serialized snapshot identity rather than quantized
   position/velocity. It includes player state, jump buffer, held input, complete
   trap/door/flag state, and observation history. Function implementations and object
   prototypes are fixed within these searches. Cosmetic particles/stains remain
   outside snapshots, as before.
2. Ordered encounter stages can require actual instance events, supported duration,
   a landing, and/or a reached region. Guidance can target the current position of
   a moving platform. This metadata belongs only to the lab fixtures; it never
   creates gameplay checkpoints or restores partial progress during verification.
3. Spatial diversity is explicit beam pruning, not state equivalence. Distinct states
   are still subject to a finite beam budget, so search remains incomplete.
4. Winning branches that fail replay or declared encounter requirements no longer
   terminate the entire search immediately.
5. Optional 1/3/6/12-tick action groups preserve the 1/120-second physics step. Default
   search and all existing dashboard traces remain 12 ticks. Shorter traces are used
   only through these lab tools; the older dashboard's fixed-12-tick playback is
   intentionally not expanded in this experiment.

The three baseline searches use width 120 and depth 160 (16 seconds maximum).
The finer B search uses width 100, depth 240, three ticks per action (six seconds
maximum), and 150,000 maximum expansions. All verification starts from reset.
No partial-stage snapshots are accepted as completion proof.

## Files and reproducibility

Manually authored fixtures: `forge/experiments/encounters.js`.
Lab IDs 491–493 are isolated metadata; they reserve no campaign or dashboard slots.
They are not imported by the generator, server, campaign, or build allowlist.

Evidence files:

- [A: complete data, input trace, metrics and interventions](../forge/experiments/results/491.json)
- [B: complete data, input trace, metrics and interventions](../forge/experiments/results/492.json)
- [C: complete data, input trace, metrics and interventions](../forge/experiments/results/493.json)
- [B: independently searched 25ms trace](../forge/experiments/results/492-fine.json)
- [Chrome keyboard replays](../forge/experiments/results/browser.json)
- [Fresh searches of existing levels 41, 50 and V3 candidate 81](../forge/experiments/results/legacy-search.json)

The results directory also contains layout and victory screenshots. The browser
test uses temporary in-memory level slots in an isolated browser context; no saved
player progress or production content is changed.

From the project root, using the already installed dependencies:

```powershell
node forge/experiments/run.js
node forge/experiments/run.js 492 --fine
node forge/experiments/browser.js
node --test tests/forge-experiment.test.js
node --test tests/forge-experiment-search.test.js
```

The runner writes only lab evidence under `forge/experiments/results`. The browser
test uses a temporary loopback server, blocks external requests, and shuts down its
browser and server afterward. It does not launch the Forge dashboard or promote
anything. Chrome's existing local executable is used; `BROWSER_PATH` can override it.

## Regression evidence

- `npm test`: 138 existing checks passed (45 legacy + 74 gameplay/expansion + 19 Forge).
- V2/critical/V3 plus new measurement suite: 32 passed (23 existing + 9 new).
- New fresh-search suite: four passed, including the 25ms B search.
- Total Node checks: **174 passed**.
- `npm run test:browser`: all 50 render smoke checks, lifecycle/input/progression
  checks, and 11 real keyboard victories for levels 30–40 passed.
- The lab browser suite verifies A/B/C, the finer B trace, and ten production
  replays for levels 41–50. Experimental tick counts, final positions, event logs,
  and measurement categories agree with Node; no external requests or page errors.
- Production SHA-256 checks match the existing baseline for `game.js`,
  `level-runtime.js`, `campaign.js`, `content/season-one.js`, `style.css`, and
  `index.html`. The existing original-40 definition snapshot test also passes.
- Build scripts remain unchanged; Forge and experimental evidence remain outside
  the runtime asset allowlist. No native APK/AAB rebuild or physical-device test.

Logs: `test-results/experiment-regression.txt`, `experiment-forge-tests.txt`,
`experiment-search-tests.txt`, and `experiment-browser-regression.txt`.

Work stops here. Procedural composition, automatic generation improvements,
difficulty recalibration, camera changes, and production integration remain outside
this experiment and require the next review.
