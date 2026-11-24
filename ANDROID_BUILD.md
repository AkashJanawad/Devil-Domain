# Android build and device testing

Run from the existing project root. Android already exists; do not regenerate it.
Verified: Node 22.17.0, Capacitor 8.6.0, Java 21, Gradle 8.14.3, AGP 8.13.0,
compile/target SDK 36, minimum SDK 24. The inherited JAVA_HOME pointed at Hadoop;
only the build process environment was corrected.

```powershell
npm ci
npm test
npm run test:browser
npm run cap:sync
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-21'
.\android\gradlew.bat -p android assembleDebug bundleRelease lintDebug --console=plain
```

Use your installed JDK path. android/local.properties contains the local SDK path
and is ignored by Git. Browser tests use installed Chrome; BROWSER_PATH selects
another Chromium executable. cap:sync copies runtime/license files to www first.

Debug APK: android/app/build/outputs/apk/debug/app-debug.apk
Unsigned AAB: android/app/build/outputs/bundle/release/app-release.aab

## Install and launch

Enable USB debugging and authorize the connected device. Run adb devices, then:

```powershell
adb install -r "android/app/build/outputs/apk/debug/app-debug.apk"
adb shell am start -n com.janawad.devildomain/.MainActivity
```

Updating with the same signing key preserves data. Do not uninstall merely to
bypass a signature mismatch if progress matters. No connected device or configured
AVD was available during this audit. Device execution is NOT VERIFIED.

## Release AAB signing

The generated AAB is unsigned and not upload-ready. Rebuild with the commands
above, then open the existing android folder in Android Studio. Select Build >
Generate Signed Bundle / APK > Android App Bundle, select the app module, supply
your own upload keystore and alias, select release, and build. Verify the resulting
bundle signature with the JDK jarsigner verification tool before distribution.
No credentials were created or read during this audit. Keep signing keys and
passwords out of source control and back up keys securely. Increase versionCode
for later releases. Signing and publication were not performed.

## Device acceptance checks

- Complete all 40 levels using touch. Levels 30–40 have input replay proofs;
  levels 2–29 still lack complete route proofs.
- Test simultaneous direction/jump, sliding off buttons, cancellation, two fingers
  on one button, rapid restart, death/respawn and app switching.
- Exercise moving platforms, springs, crushers, teleporters and final doors.
- Test Home, lock/unlock, interruptions and both landscape orientations. Android
  Back returns to the menu, including during wipes; use Home to leave the app.
- Check notch and navigation gesture safe areas, level grid and HUD readability.
- Complete a level, terminate/relaunch and verify unlocks, deaths and theme.
  Test upgrading an existing installation separately.
- Launch in airplane mode and verify audio/gameplay. Assets use Capacitor's local
  HTTPS origin, not a remote server or file protocol.
- Profile sustained frame pacing, heat and battery. Fixed 120 Hz simulation with
  requestAnimationFrame rendering is implemented; physical 60 FPS is unverified.

Native immersive behavior follows Android's WindowInsetsControllerCompat guidance:
https://developer.android.com/develop/ui/views/layout/immersive
Capacitor SystemBars injects safe-area CSS variables; styles use these with browser
env() fallbacks. Hardware validation remains necessary.

## V2 development selection and release guard

`npm run cap:sync` creates a developer build with all 40 levels selectable.
`npm run cap:sync:release` generates production configuration first. Regardless of
the last sync, native release builds run generateReleaseWebAssets and overlay
production configuration (DEVELOPER_UNLOCK_ALL_LEVELS=false). This is verified
in the actual generated AAB. The AAB remains unsigned. Debug builds intentionally
retain developer access. See docs/EXPANSION_V2.md for the new route evidence.

## Level Forge release exclusion

The current campaign contains 50 levels. Only approved JSON and the small runtime
adapter/season module are added to the APK. The local Forge server, UI, solver,
traces and developer documents are excluded by the build file allowlist. Debug APK
and release AAB were rebuilt and archive contents checked. See docs/FORGE_RESULTS.md.
