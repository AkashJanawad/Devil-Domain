# Devil Domain — Version 1

Rebuilt **16 November 2026** with the supplied original Devil Domain logo. Version name/code and the upload signing key are unchanged.

## Updated branding

The original full logo now appears on the title/chapter screen. Android launcher icons, adaptive icons, Android 13+ themed icons and the launch theme use the new branding. All artwork is included offline. The 100 levels, physics, controls, saves and one-time chapter cinematic are preserved.

`Devil-Domain-v1-brand-assets.zip` contains transparent/full-logo variants, square/round launcher exports, all Android density resources, adaptive and monochrome layers, splash artwork, store icon, feature graphic, creative masters, preview and reproduction notes. The original supplied file is included unchanged. `play-store-icon-512.png` and `play-store-feature-1024x500.png` are also supplied directly beside the app packages for Play Console.

The compact launcher emblem and wide feature artwork were created using the built-in image-generation tool with the original logo as reference. The title-screen logo is a direct proportional export of your original; the themed icon is a native vector. Exact creative prompts are in the asset pack's `PROMPTS.json`.

## Install for mobile testing

Open `Devil-Domain-v1-test.apk` on your Android device. It installs as **Devil Domain Test**, package `com.janawad.devildomain.preview`, version `1.0-test` / code `1`. It uses the new release key and production progression rules, and coexists with the old debug app. Its saves are separate; your existing game's saves are untouched.

From the main menu, tap **Chapter 1 — The Stolen Light**. The supplied 20-second video plays offline the first time. Watching or skipping it records `dd_chapter1_intro_seen_v1` in local app data. It does not play again after closing or updating the app. Clearing app data resets this flag. Restoring a saved app backup also restores it.

Chapter 1 contains Season 1 (Levels 1–50) and Season 2 (Levels 51–100). Finish Season 1 to unlock Season 2. Future chapters are disabled placeholders, each reserving two 50-level seasons. Pause/background suspends the video; tap Resume to continue. A failed video load offers retry and skip.

## Google Play upload

Upload **Devil-Domain-v1-play-store.aab** (the Android App Bundle format) in Play Console. Production identity: `com.janawad.devildomain`, version name `1.0`, version code `1`, target API 36, minimum API 24. The bundle is signed with the new upload key; it is not a debug build. It contains the full 100-level campaign, the Level 34 repair, chapter navigation and the local cinematic.

For the first release, use Play App Signing and let Google generate/manage the distribution signing key. Keep using this upload key for subsequent bundles. `upload-certificate.pem` is the public certificate if requested. Official guidance: https://developer.android.com/studio/publish/app-signing and https://support.google.com/googleplay/android-developer/answer/9842756

The upload artifact is validated; Play Console submission, listing/account declarations and Google review have not been performed. Physical Android-device testing is still pending. The preview APK has a different application ID and cannot replace a Play Store installation.

## Signing backup — keep private

Back up **C:\Users\ashis\.devil-domain-signing** securely, including `devil-domain-upload.jks` and `release.properties`. That properties file holds the alias and passwords. Windows access is restricted to this user and SYSTEM. These private files are outside the project and are not in the APK, AAB or release folder. Never publish them. The PEM in this folder is public and may be shared with Google.

Gradle reads that private properties file. Rebuild from the project root with Java 21:

    npm run cap:sync
    .\android\gradlew.bat -p android assemblePlaytest bundleRelease lintRelease --offline

If necessary, set JAVA_HOME to `C:\Program Files\Java\jdk-21` for the build process. Release and playtest assets always regenerate locked production configuration.

## Verification

- 193 Node regression tests passed; gameplay and level data unchanged.
- Chrome mobile smoke test and 61 campaign completion replays passed.
- Real video playback reached its end; first-use, skip, reload, background pause/resume, video failure recovery, 50-level season filtering, release unlocks and existing saves passed.
- Android offline build and release lint passed.
- APK signature, AAB JAR signature and bundletool validation passed.
- Both packages' game assets and cinematic bytes match the source; production app identity/version and locked configuration were checked.
- `SHA256.json` records final artifact checksums.

The branding rebuild additionally passed 45 structural checks, image format/size checks, adaptive safe-zone validation, and Chrome logo loading/navigation checks at 740×360, 960×540 and 1280×800. The APK signing certificate matches the previous Version 1 test build. Both packages contain all 15 expected web assets byte-for-byte, locked progression, and no signing secrets or developer fixtures.

Current rebuild evidence is in `test-results/branding-node-tests.txt`, `branding-structure-tests.txt`, `branding-game-browser.txt`, `branding-chapters-browser.txt`, `branding-browser.json`, `branding-final-build.txt`, `branding-apk-signature.txt`, `branding-aab-signature.txt`, `branding-apk-resources.txt` and `branding-package-verification.json` in the project root. Menu screenshots are named `branding-menu-*.png`. Physical Android-device testing and Play Console submission remain pending.
