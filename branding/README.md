# Devil Domain — Version 1 branding

**16 November mobile-test revision:** The launcher/store icon and adaptive foreground exports now use the complete original logo, as requested. The generated compact emblem remains only for the already-approved startup/favicon artwork. The custom character-only monochrome launcher layer is disabled. The older `brand-preview.png`, themed-icon exports and `releases/v1` ZIP document the previous branding pack; the current testing APK is in `releases/v1-mobile-test`. Run `scripts/export-branding.ps1` to reproduce the current icon choice.

The supplied `Devil Domain_Origional_Logo.png` remains unchanged. The game title uses a proportional export of that original artwork. All assets are bundled locally and require no network access at runtime.

## Asset pack

- `exports/logo-original-transparent.png`: untouched supplied logo (1448 × 1086).
- `exports/logo-transparent-{512,1024}.png`: proportionally scaled transparent full logos.
- `exports/logo-on-dark-1024.png`, `logo-on-light-1024.png`: presentation variants.
- `exports/play-store-icon-512.png`: opaque full-square RGBA launcher emblem, 512 × 512; no baked rounded corners.
- `exports/play-store-feature-1024x500.png`: opaque RGB feature artwork, 1024 × 500. This is branding artwork, not a gameplay screenshot.
- `exports/launcher-square-1024.png`, `launcher-round-512.png`: square and round exports.
- `exports/adaptive-foreground-432.png`: transparent adaptive foreground with safe padding; background color `#160C24`.
- `exports/monochrome-adaptive.svg`, `monochrome-adaptive-432.png`: clean single-color themed icon derived from the native vector resource.
- `exports/splash-landscape-1920x1080.png`, `splash-portrait-1080x1920.png`: full-logo splash artwork.
- `android-res/`: installed launcher densities, adaptive/themed XML and splash resources, copied from the final Android source. Legacy icons: 48, 72, 96, 144, 192 px; adaptive layers: 108, 162, 216, 324, 432 px.
- `brand-preview.png`: visual overview of the full logo, icon masks and feature graphic.

Android launch theme uses the emblem against the brand background. The in-game chapter menu uses the original full logo. Android 13+ launchers that support themed icons use the native monochrome mask. Full-logo splash canvases are also supplied as reusable artwork; the Android system controls its own launch-screen layout.

## Reproduction and provenance

Two creative masters were produced with the built-in image-generation tool using the supplied original as a reference: the compact launcher emblem and the wide feature artwork. Exact prompts are in `PROMPTS.json`; masters are in `masters/`. The monochrome raster attempt was discarded; the shipped mask is a native Android vector with clear negative space. No API key or cloud runtime dependency was added.

`scripts/export-branding.ps1` performs deterministic proportional resizing, density export and PNG encoding with Windows System.Drawing. `tests/branding-browser.js` verifies the visible logo and chapter/gameplay navigation, exports the vector preview, and captures the asset overview.

Specifications checked against Google's official documentation:

- [Play Store preview assets](https://support.google.com/googleplay/android-developer/answer/9866151): 512 px store icon, maximum 1024 KB; 1024 × 500 RGB feature graphic.
- [Android adaptive icons](https://developer.android.com/develop/ui/compose/system/icon_design_adaptive): 108 dp layers, central 66 dp safe region and monochrome layer.

The pack does not replace the genuine gameplay screenshots or other listing information needed in Play Console. No Play upload has been performed.
