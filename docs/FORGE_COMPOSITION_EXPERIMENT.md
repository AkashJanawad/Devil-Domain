# Level Forge Phase 2 — bounded composition experiment

5 November 2026. Exactly three developer-only composite levels were authored.
All three complete from a fresh start in the real engine and in Chrome with real
keyboard events. No campaign integration, mass generation, new trap, physics,
camera, controls, save-format, or network dependency changes were made.

## Genuine measurements

These are measured successful replay times at 120Hz, not estimated human times.
All rows use the cleaned replay retained beside the original search trace.

| Composite | Encounters in order | Actual ticks / seconds | Active traversal | Stationary / idle | Repeated traversal estimate | Jump presses | Horizontal reversals |
|---|---|---:|---:|---:|---:|---:|---:|
| A — Launch into the Pulse | Spring/landing/portal → moving platform/laser/ambush | 516 / **4.300s** | 4.283s | 0s | 0s | 4 | 0 |
| B — Carry the Key | Moving platform/laser/ambush/portal → elevated switch/gate/hidden escape | 696 / **5.800s** | 5.792s | 0s | 0.033s | 7 | 0 |
| C — Three Terms | Spring/landing/portal → elevated switch/gate → moving platform/laser/ambush | 528 / **4.400s** | 4.392s | 0s | 0s | 4 | 0 |

Passive-only transport accounts for the remaining 2, 1, and 1 ticks respectively.
It is not added to active movement. Moving while also being carried is active
traversal with the carrier displacement reported separately. B's four revisited
ticks are a local 20px-cell re-entry; there is no repeated lap or horizontal reversal.
The Phase 1 measurement definitions and disclosed limitations remain applicable.

The individual Phase 1 encounters took 2.317, 2.700, and 3.125 seconds. These
composites add verified connected challenges and longer active traversal, but
remain compact 4–6 second routes. They are not claimed to be Extreme or calibrated
human difficulty. Two simple jump-cycle probes can complete A while satisfying all
contracts, so A should not be presented as a highly demanding level.

## Ordered completion and actual mechanics

All encounter interactions below were counted **after entry to that encounter**.
Entering a later encounter cannot reuse an activation from an earlier encounter.

| Composite | Encounter entry → completion ticks | Required observed interactions |
|---|---|---|
| A | launch 1→191; pulse 192→513 | Spring, actual ledge landing, portal; carrier 64 ticks, beam crossed while carried 8 ticks, hidden spikes triggered |
| B | ride 1→326; switch 327→693 | Carrier 60 ticks, carried beam crossing 8 ticks, hidden spike trigger, portal; elevated button, gate opening, gate passage, downstream hidden spike trigger |
| C | launch 1→191; switch 192→379; pulse 380→525 | Spring, ledge landing, portal; elevated button and opened-gate passage; carrier 60 ticks, carried beam crossing 10 ticks, hidden spike trigger |

The remaining few ticks after the final encounter's completion enter the actual
exit collision box. A stage rectangle alone cannot satisfy an encounter: its
required instance events and exit conditions must also hold.

Each composite has two elevation bands separated by solid geometry. A portal
delivers the player to a new band; the player does not run back over the same
terrain. Elevated gates close their room from ceiling to floor. Moving-platform
gaps have lethal floors. The lower ground route cannot reach the upper exit.

### Dependency and bypass evidence

- Disabling each spring, connector portal, moving carrier, or required switch
  individually breaks its recorded route. Results distinguish death from remaining
  alive but blocked; none is labeled a proof of impossibility.
- Removing any retained jump-hold run individually prevents the recorded route
  from winning. Redundant presses were removed only after fresh replay and complete
  ordered-contract checks. This is a local cleanup, not a global minimum-input proof.
- Changing only the laser phase kills the original input route in every composite:
  A at a -85ms cycle offset, B at -170ms, and C at +510ms. This establishes that the
  timed hazards affect these routes; it does not measure human reaction tolerance.
- Each level received two 30-second ground-only policies (left and right) and
  eighteen rightward jump-cycle policies. No ground-only policy won. Two policies
  won A and met every encounter contract; none won B or C. No tested policy won
  while bypassing a required encounter.
- Tests deliberately preserve a physical winning route while making an encounter
  entry unreachable, or requiring reuse of an activation that occurred before
  entry. Both are rejected by composition verification despite the physics win.

The 20 policies per level are bounded checks, not exhaustive proof that every
possible alternative input sequence respects the designed route. The composer
rejects discovered bypasses and traces with skipped contracts; it does not claim
formal completeness of the beam search or shortcut detection.

## Lightweight composition layer

`forge/composition/modules.js` contains three parameterized module families,
derived from the Phase 1 fixtures:

- Spring launch, ledge landing, one-way portal handoff.
- Moving carrier, timed laser crossing, hidden bank escape, optional portal handoff.
- Elevated switch and full-height gate, with a compact variant and optional hidden escape.

Each declares entry/exit regions and stance conditions, required mechanic events,
connection type, geometry bounds, clearance, and relevant ascent/gap/room constraints.
Stages declare targets and event/landing requirements. These are manually authored
module variants, not a random layout grammar or general room-packing algorithm.

`compose.js` checks a plan of two or three modules and assembles a serialized level:

- Instance IDs and switch keys are separated by module identity.
- Surface references resolve to actual runtime platform indices.
- Portal receivers must lie in the next entry region and have supporting geometry.
  Portals retain the engine's existing vertical velocity behavior; no momentum reset
  is invented by the composer.
- Walking handoffs require intersecting entry/exit regions and compatible support
  height. Runtime entry conditions still must be reached in the real replay.
- Room bounds, minimum room height, surface containment, static overlap, separator
  presence, step-rise limits, full-height gates/beams, and known interaction references
  are checked before search. Existing engine validation runs as well.
- Geometry checks are conservative local checks, not a replacement for real-engine
  reachability. The final whole-level search and fresh replay remain mandatory.

`levels.js` contains exactly three plans, using lab-only IDs 481–483. They reserve
no dashboard or campaign slots and create no production Levels 51–100.

## Reuse of the existing solver and measurements

The existing beam solver runs once on each assembled level, from reset, with width
160, 100ms input groups, depth 180 (18 seconds), and a 200,000-expansion cap. It does
not concatenate isolated encounter proofs, reset hazards between encounters, restore
mid-level checkpoints, or change physics. The only Phase 2 core-search change is
more useful progress reporting when a search fails.

The shared developer-only observer adds opt-in encounter entry baselines and ordered
completion records. Existing Phase 1 observations remain unchanged. Requirements
are evaluated relative to the current entry baseline, including events on the entry
tick. Fresh measurement replays independently check these records after the ordinary
hash-bound physics proof.

`verify.js` separates physical victory from composition acceptance. For this bounded
experiment, acceptance requires all declared encounters and stages, at least three
jump presses, at least 3.5 seconds of actual completion, at most 0.25 seconds stationary,
at most 0.35 seconds estimated repeated movement, and at most two direction reversals.
These are explicit experiment guardrails, not a new difficulty score. No time is added
to the measurement to meet them. The runner also rejects any discovered bypass policy.

The unadjusted A and C plans initially exhausted bounded search. Moving hazards
start on the global level clock, so the player arrived at the second band at a
different point in the carrier's cycle than in the isolated fixture. C's first
successful configuration also required four corrections and 0.425 seconds of
estimated repeated motion. Manually aligning carrier phase with the actual arrival
window produced the final zero-idle, zero-reversal routes. No slowdown or long
waiting period was inserted. This exposes an important future composition problem:
connector compatibility includes timing, not just matching platform coordinates.

## Fixed-world limits

The 960×540 world was sufficient for these three plans. A separating platform at
y=220 or y=260 creates distinct traversal bands; existing portals connect them.
The upper band leaves limited headroom and landing width. The third encounter fits
only through the compact switch module and a shorter carrier crossing. Copying
three entire Phase 1 screen-sized fixtures would overlap geometry and is unsupported.

Module dimensions, hazard phase, and room connections are still selected manually.
This experiment does not establish automatic packing of arbitrary modules or long
multi-room levels in this screen size. Camera and engine files are unchanged.

## Reproduce and inspect

From the project root with the existing local dependencies:

```powershell
node forge/composition/run.js
node forge/composition/evidence.js
node forge/composition/browser.js
node --test tests/forge-composition.test.js
node --test tests/forge-composition-search.test.js
```

The first command writes only the three lab result files. The evidence command adds
the intervention results. `browser.js` reuses the Phase 1 keyboard replay harness
with a temporary loopback server and an isolated browser context. External requests
are blocked. Browser/server resources close at the end. No persistent server or
campaign integration is created.

- [Composite A: data, traces, contracts, measurements, probes and interventions](../forge/composition/results/481.json)
- [Composite B: data, traces, contracts, measurements, probes and interventions](../forge/composition/results/482.json)
- [Composite C: data, traces, contracts, measurements, probes and interventions](../forge/composition/results/483.json)
- [Chrome keyboard verification](../forge/composition/results/browser.json)
- [Production preservation hashes](../forge/composition/results/preservation.json)
- Layout/victory screenshots: `forge/composition/results/481-layout.png` through
  `483-win.png`.

## Regression verification

- `npm test`: 138 existing checks passed.
- V2/critical/V3, Phase 1 measurement/search, and Phase 2 contract/search suites:
  47 passed. Total: **185 Node checks passed**.
- All three composites pass Chrome with zero deaths and exact Node tick counts,
  final positions, interaction counts, and ordered encounter records. Ten additional
  production replays for levels 41–50 pass in the same harness.
- The standard browser regression covers all 50 renders, controls/lifecycle,
  progression/save restoration, and 11 keyboard victories for levels 30–40.
- The unchanged Phase 1 fixture proofs and the 25ms variant are also replayed through
  the reused Chrome harness to check backward compatibility.
- Production SHA-256 values match the pre-experiment baseline for `game.js`,
  `level-runtime.js`, `campaign.js`, `content/season-one.js`, `style.css`, and
  `index.html`. The campaign contains exactly 50 levels. No new save keys.
- Generated runtime asset directories contain no Forge, composition, experiment,
  or test directories. No new APK/AAB build or physical-device testing is claimed.

Logs: `test-results/composition-regression.txt`, `composition-forge-tests.txt`,
`composition-browser-regression.txt`, and `composition-phase1-browser.txt`.

Work stops at these three reviewed-by-tooling composites. None has human playtest
approval. Mass generation, difficulty calibration, additional campaign levels, and
production integration remain outside this phase.
