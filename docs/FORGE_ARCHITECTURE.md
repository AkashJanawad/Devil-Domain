# Level Forge architecture (before implementation)

Existing game.js owns Canvas rendering, fixed 1/120-second simulation, AABB collision,
input, 40 constructor-built levels and localStorage progress. Movement uses 265 px/s,
-645 jump, 2150 gravity and 26x32 player bounds. Trap updates run before movement;
completion calls the real Door.playerWins predicate after collisions and hazards.
Capacitor packages an explicit web-file allowlist. Release configuration overrides
developer unlock. Baseline: 45 legacy + 74 runtime tests pass; levels 30 and 34 have
movement replay coverage. No Git metadata exists. The original registry text is
snapshotted to protect all 40 definitions. Forge will use the existing VM harness,
not a second physics engine. JSON data and a small constructor adapter are runtime;
generation, bounded search, traces and editor are local development tooling.
