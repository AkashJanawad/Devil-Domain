# Version 1 mobile layout and rendering update — 16 November 2026

## What changed

The Android launcher now uses the complete supplied original logo, proportionally resized with safe padding. The character-only substitute is no longer the app icon. Adaptive icons use the same full artwork; the custom character-only monochrome layer is disabled. The existing startup emblem, title logo, feature artwork and cinematic remain as approved.

Menus and the end screen now fill the actual viewport instead of inheriting the 960×540 game canvas rectangle. Landscape uses a compact identity pane beside chapter/season/level options; portrait stacks them. The options pane scrolls independently, level buttons keep a minimum 44 CSS-pixel target, and the layout accounts for Capacitor's cutout/system-bar inset variables. The video is contained inside the viewport with independently positioned, wrapping controls. Original video proportions are preserved, so wide/tall screens can have letterboxing rather than cropped or stretched footage.

The new `presentation.js` display layer retains the original drawing method and fixed 1/120-second simulation step. It:

- Skips game updates and rendering while a menu/end screen, the chapter video, a hidden document or native suspension covers gameplay.
- Removes live backdrop blur from controls over the animated canvas.
- Starts at the existing 960×540 raster. Sustained slow frame delivery can reduce it to 720×405, then 640×360; stable delivery restores quality with a longer recovery threshold. This changes pixel workload, not camera, hitboxes, jumps, controls, world dimensions or game speed.
- Uses measured frame intervals, not device model or RAM capacity, to select raster resolution. Lower tiers render about 44% and 56% fewer pixels respectively. No DPR multiplier is applied to the game canvas.

Full-screen image caching was evaluated and excluded because desktop profiling did not establish a reliable benefit. No extra full-frame bitmap caches, GPU library, cloud service or new runtime dependency are included. `game.js`, `level-runtime.js` and all 100 level definitions remain byte-for-byte unchanged.

## Verification and practical limits

- 193 existing Node regression tests and 45 structural checks passed.
- Chrome smoke tests passed, including all 100 level render checks, simultaneous touch input, pause/resume and saved progression.
- 61 actual campaign completion replays passed with the three raster tiers exercised.
- Nine viewports passed: 568×320, 740×360, 800×360, 915×412, 960×432, 360×800, 412×915, 1024×768, 1280×800; DPR 2–3 and simulated cutout insets included. These are viewport tests, not emulations of specific handset processors.
- Intro playback/skip, error recovery, once-only persistence, return to chapters and reachable Level 50 buttons passed.
- Synthetic 24, 30, 40, 60, 90 and 120 Hz frame schedules each produced exactly 120 simulation updates in one second and identical player state. Automatic resolution reduction and recovery were exercised independently.
- Native-resolution rendering was compared with the original renderer in both themes. Reduced-resolution rendering was checked through successful gameplay replays.
- Android offline build, playtest lint, APK signature and packaged-asset checks passed. The package and signing certificate match the previous test application, preserving update compatibility.

`tests/mobile-performance.js` measures a stationary Level 99 scene in desktop Chrome at 1×, 4× and 6× CPU slowdown. It isolates draw cost by freezing simulation during that scene; it is **not a phone gameplay FPS benchmark**. The recorded comparison confirms the continuous game update/draw work behind idle menus is removed (apart from a possible first bootstrap frame). Desktop draw timing does not establish an FPS increase on Redmi 9i, Realme 6 or Realme GT 7. None of those physical devices was connected, and no 60-FPS guarantee is made.

Evidence: `test-results/mobile-node-tests.txt`, `mobile-structure-tests.txt`, `mobile-game-browser.txt`, `mobile-final-replays.txt`, `mobile-chapters-browser.txt`, `mobile-presentation-browser.json`, `mobile-performance-before.json`, `mobile-performance-after.json`, `mobile-android-build.txt`, `mobile-apk-signature.txt`, `mobile-package-verification.json`, and `mobile-menu-*.png`/`mobile-cinematic-800x360.png`.

## Install and compare on the phones

Install `releases/v1-mobile-test/Devil-Domain-v1-mobile-test.apk` over the existing **Devil Domain Test** application. Keep the application installed and retain its data to preserve progress. It remains package `com.janawad.devildomain.preview`, version `1.0-test`, version code `1`, with the same signing key. Production saves in `com.janawad.devildomain` remain separate.

Compare the same level and route with the same refresh-rate, battery and graphics settings. Allow several seconds of sustained gameplay for automatic raster adjustment. Check movement and jump responsiveness, deaths/restarts, menu fit and touch controls on each phone. The existing once-only intro flag is preserved, so an update does not force an already-watched cinematic to play again.

This delivery is a testing APK. The previous production AAB in `releases/v1` is retained and has not been replaced by this mobile experiment.

Technical references: [MDN canvas optimization guidance](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas), [Chromium compositor/filter performance report](https://issues.chromium.org/issues/414525204). These inform the investigation; they do not establish performance on the user's devices.
