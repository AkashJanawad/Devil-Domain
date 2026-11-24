> Historical 30-level audit (31 October 2026). For current 40-level counts,
> artifacts and route verification, see [Expansion V2](docs/EXPANSION_V2.md).

# Independent engineering audit — 31 October 2026

## Outcome

Existing Canvas engine, branding, trap classes and 30-level campaign preserved.
Debug APK and unsigned release AAB built successfully from the final source.
This is a device-test candidate, not a production-ready certification.
There was no Git metadata or AGENTS.md in the project; unrelated existing files
were preserved. No project was replaced and no publication was performed.

## Severity-ordered confirmed findings

| Priority | Finding | Resolution / evidence |
|---|---|---|
| High | Capacitor webDir was the repository root; build only checked existence. Android sync output/configuration was incomplete. | Dedicated www with five runtime/license files; supported cap sync; APK/AAB builds succeeded; archive bytes match source. |
| High | Level 26 portal destination bottom was y=270 while platform top was y=260, embedding the player by 10 pixels. | Destination y changed from 222 to 212. Actual trap update regression verifies clear arrival and continued play. |
| High | Uncaught storage errors could abort boot, deaths or wins; valid JSON primitives were accepted as progress objects. | Guarded reads/writes, session memory fallback, validated completion maps and death counts; corrupt/denied storage and legacy migration tests. Persistence cannot survive app termination if storage is unavailable. |
| High | No background/focus pause or held-input reset. | Browser/native lifecycle events suspend simulation, clear inputs and reset the clock. Node and browser checks pass; native lifecycle execution needs hardware. |
| Medium | Variable timestep integration and 1/30 delta clamp made physics refresh-rate dependent. | Fixed 1/120 simulation, bounded catch-up and independent rendering. Same movement at 30/60/120 simulated render Hz; jump/collision tests. Long stalls over 100 ms intentionally discard excess elapsed time. |
| Medium | Touch ownership used one boolean and no pointer capture. | Pointer capture, per-button pointer sets, cancel/lost-capture handling and lifecycle clear; simulated multi-pointer regression. Real finger testing pending. |
| Medium | Typical landscape phone CSS hid level selection; PLAY always started level 1. | Scrollable visible grid and first-unfinished resume; Chrome 667x375 check, screenshot and reload test. |
| Medium | MainActivity was empty, with no landscape, immersive or back integration. | Manifest sensorLandscape; native system-bar hiding, back-to-menu and lifecycle events. Compiles successfully; device behavior unverified. |
| Medium | Pending transition could re-enter gameplay after returning to menu. | Menu clears pending wipe callback; regression test. |
| Medium | Safe-area CSS ignored Capacitor 8 injected variables and reused left inset on right. | Consume injected variables with browser env fallback; independent left/right padding. Notch hardware testing pending. |
| Low | Fullscreen Promise rejection was not caught; Android sample test expected wrong package. | Promise rejection handled; sample assertion corrected. Instrumentation test was not run. |
| Low | Build guide had wrong Node/Java/target SDK, claimed fullscreen from captureInput, described file protocol, and requested regeneration. | Replaced with verified toolchain, existing-platform workflow and honest install/signing steps. |

## Verification performed

Original `npm test`: **45 passed, 0 failed**. Its 5 collision tests execute a copied
helper, 6 physics tests assert hard-coded literals, and 34 tests inspect strings
or files. It never executes game.js and cannot establish gameplay reliability.
Legacy checks remain, with the migration source check adapted to the refactored
migration helper; actual migration is now tested behaviorally.

Final commands and results:

| Command | Result |
|---|---|
| npm test | PASS: 45 legacy checks plus 45 source-executing/configuration checks; 90 total, 0 failed |
| npm run test:browser | PASS: installed Chrome, mobile viewports, no page errors or external requests |
| npm run cap:sync | PASS: build www and synchronize existing Android project |
| .\android\gradlew.bat -p android assembleDebug bundleRelease lintDebug --console=plain | PASS: BUILD SUCCESSFUL; app lint 0 errors, 16 warnings |
| apksigner.bat verify --verbose android/app/build/outputs/apk/debug/app-debug.apk | PASS: APK v2 signature, one signer |
| aapt.exe dump badging android/app/build/outputs/apk/debug/app-debug.apk | PASS: com.janawad.devildomain; min SDK 24; target SDK 36; Devil Domain label and launch activity |
| adb devices | No connected devices |
| SDK emulator/emulator.exe -list-avds | No configured AVDs |
| npm audit --json | FAIL: 4 moderate development dependency advisories; no high/critical advisories |

The Gradle process used JAVA_HOME=C:\Program Files\Java\jdk-21. Build logs and
browser screenshots are in test-results. App lint warnings include dependency
updates, generated template resources/icons and obsolete configuration. Capacitor
library lint uses its shipped baseline (6 errors filtered); an app lint pass does
not mean every upstream dependency has zero lint findings.

The 45 new tests comprise 30 per-level build/safe-spawn/geometry/simulation/reset
checks and 15 checks covering real AABB, frame pacing, held/released jump, wall and
ceiling collision, coyote/buffer jumps, death/respawn, progression, final transition,
portal arrival, saves, multitouch, pause/back, trap resets and packaging.
Node runs actual game.js in a VM with mocked DOM/audio; this is simulation, not
browser or Android verification. Each level simulation runs 1,200 fixed steps
(10 simulated seconds); it does not solve the route.

Chrome executes the real DOM, Canvas and audio initialization. Tests move through
level 1 to its exit, check level 2 unlock, reload persistence, pause/resume, render
all 30 levels, and inspect the small landscape grid. Final-state tests for level
30 place the player at the exit; they do not prove the full level completable.
Audio audibility and physical multitouch were not assessed.

## Artifacts

- APK: Z:\Automation\Devil Domain\android\app\build\outputs\apk\debug\app-debug.apk
- APK SHA-256: 0E7D833C0DD4721C634CA2ED233E7FA20D4A808A3335784A19B888086C9614D0
- Unsigned AAB: Z:\Automation\Devil Domain\android\app\build\outputs\bundle\release\app-release.aab

Both archives were opened and their index.html, game.js, style.css, LICENSE and
THIRD_PARTY_NOTICES.txt compared byte-for-byte with final source. No node_modules
were bundled. The AAB has no signing entries and is explicitly unsigned.
See ANDROID_BUILD.md for installation, signing and device acceptance steps.

## Assets, branding and licensing

Player-facing source/UI and native application labels use Devil Domain. FableDevil
remains only as required source attribution. Original MIT copyright text was not
removed and is bundled. Capacitor MIT notices were added to bundled assets.
Graphics are Canvas/CSS/inline SVG; sounds are procedural; fonts are system fonts.
All 30 existing native drawable/mipmap icon and splash resources checked match
the installed Capacitor template byte-for-byte. They remain generic template art,
not a custom release icon.

No Level Devil proprietary bitmap/audio assets or external asset downloads were
found. This source inspection cannot independently prove authorship or licensing
of the supplied engine/campaign; the supplied Leonxlnx MIT notice is the available
provenance evidence. No separate unclear third-party gameplay asset was found.
Complete transitive native dependency notice review and release branding review
remain release tasks, not a legal clearance claim.

## Remaining work

- Android emulator and physical device execution: **NOT VERIFIED**. There was no
  available device/AVD to install or launch on.
- All 30 levels need real touch/device playtesting. Levels **2–30** need full
  completion-route verification; level 1 alone has movement-to-exit automation.
- Real-world 60 FPS, thermal behavior, notch/gesture layouts, audible sound,
  interruptions, native Back and restart persistence remain device acceptance work.
- Moving-solid/crusher interactions are sampled by simulation, not exhaustively
  proven. Fixed steps reduce tunneling risk but are not swept collision proofs.
- Development npm advisories concern Capacitor CLI -> rimraf -> glob/minimatch.
  The suggested automatic fix downgrades Capacitor to 4.8.2. No forced downgrade
  or untested major dependency override was applied. These packages are excluded
  from runtime assets; resolve with a compatible upstream toolchain update.
- Release key ownership/signing, custom launcher/splash branding and distribution
  acceptance remain unperformed. No Play Console settings were accessed.
