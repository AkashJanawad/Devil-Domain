# Devil Domain — Google Play Version 1 upload guide

Prepared **16 November 2026** for **Akash AJ**. Support/privacy email: **janawada2@gmail.com**.

This guide describes the inspected Version 1 build. Form labels can vary. Answer according to the app and your actual business/testing activity; do not copy an answer if you later add ads, SDKs, accounts, purchases or online features. A validated bundle is not a guarantee of Google approval.

## 1. Files and app identity

The correct Android App Bundle extension is **`.aab`**, not `.abb`. Upload **`Devil-Domain-v1-production.aab`** from this folder. An AAB is uploaded to Play Console; it is not directly installed like an APK.

| Field | Value |
|---|---|
| App name | Devil Domain |
| Public publisher | Akash AJ |
| Support and privacy email | janawada2@gmail.com |
| Production package/application ID | `com.janawad.devildomain` |
| Version name / code | `1.0` / `1` |
| Target Android API | 36 — Android 16 |
| Minimum Android API | 24 — Android 7.0 |
| Application type | Game |
| Suggested category | Action; select Platformer tags if offered and applicable |
| Main language | English; select the English locale you will maintain |
| Play modes | Offline, single-player; landscape gameplay |
| Available campaign | 100 levels: Chapter 1 contains two 50-level seasons |
| Monetization in this binary | No ads, purchases or subscriptions |
| Sign-in/account | None |

This bundle contains the original full-logo launcher icon, improved mobile layout/rendering, all 100 existing levels, the Chapter 1 cinematic and a local Privacy policy viewer. It uses locked production progression and the existing upload signing key. The developer Forge laboratory and level generator are excluded.

The `.preview` test app is a separate package; uploading the production AAB does not migrate its local saves. Keep the test app installed if you want to retain its progress. Production saves persist across compatible updates to the production package.

**Version-code rule:** Code 1 assumes it has never been uploaded for this app in Play Console. If code 1 is already used in any track, do not try to reuse it for a different bundle: increment the code and rebuild. You can promote the same already-uploaded artifact between tracks without rebuilding.

The build targets API 36, matching the current phone/tablet new-app requirement checked on the date above. See [Google's target API policy](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en-gb).

## 2. Actions you must finish before submission

- [ ] Complete the Play developer account's identity, contact and any Android-device verification requested in your dashboard. Choose the truthful personal/organization status; a public publisher name is not a substitute for legal identity.
- [ ] Publish `privacy-policy.html` from this folder at a public HTTPS URL. Enter that URL in Play Console. Verify it opens without login, geographic restrictions or download prompts. Do not submit a local file path, a Markdown repository edit link, or a PDF.
- [ ] Confirm your actual target age groups and business choices such as free/paid distribution and countries. These cannot be established from code alone.
- [ ] Review the IARC content questionnaire, especially fantasy violence and stylized blood. Let IARC assign the rating.
- [ ] Review and upload the three current gameplay captures in `screenshots/`, or replace them with your preferred real-phone captures. The original icon and feature graphic are also supplied; a feature graphic is not a screenshot.
- [ ] Confirm commercial rights to the supplied logo, cinematic and soundtrack. Retain the MIT and third-party notices already bundled with the app. Supplying an asset does not by itself establish its licence.
- [ ] Complete any account-specific closed testing/production-access requirement.
- [ ] Review the Play-generated pre-launch report and address any blocking findings before rollout.

Google requires privacy information inside the app and a public policy URL even when no personal data is collected. This build includes the in-app text; **hosting the supplied HTML page is still your action**. [Privacy-policy requirements](https://support.google.com/googleplay/android-developer/answer/10144311)

## 3. Store listing text to copy

### App name

Devil Domain

### Short description

Master 100 offline platforming levels packed with hidden traps and surprises.

### Full description

An exit is in sight. Getting there is another story.

Devil Domain is a 2D platformer where careful jumps, quick reactions and a little suspicion can make all the difference. Learn the route, spot the trick and try again when the domain catches you out.

Explore 100 levels across two seasons in Chapter 1. Launch from springs, travel through portals, ride moving platforms and use switches to change your route. Hidden spikes, lasers, crushers, falling blocks and moving exits keep familiar-looking paths unpredictable.

FEATURES
• 100 levels with varied layouts and connected challenges
• Springs, portals, moving platforms, switches and gates
• Hidden traps and timing-based obstacles
• An offline Chapter 1 introduction
• Touch controls, quick restarts and light/dark themes
• Progress saved locally on your device
• Offline, single-player gameplay
• No ads, in-app purchases or sign-in

Move, jump, learn and return for another attempt. Some routes offer a breather. Others demand timing and several mechanics working together.

The game includes stylized fantasy hazards, character deaths and red/orange particle effects. Clearing the app's data resets local progress. Android backup or device-transfer behaviour depends on your device settings.

Support: janawada2@gmail.com

### Version 1 release notes

```text
<en-US>
Welcome to Devil Domain!
• 100 levels across two seasons in Chapter 1
• Offline gameplay with springs, portals and hidden traps
• Mobile touch controls and adaptable menu layouts
• Automatic rendering adjustments for smoother play
• Local progress saving, light/dark themes and an offline introduction
• No ads, in-app purchases or sign-in
</en-US>
```

Use the locale matching your listing if it is not `en-US`. Do not promise a fixed FPS, claim an official age rating before assignment, or advertise unavailable Chapters 2–5 as playable. Google's limits are 30 characters for the title, 80 for the short description and 4,000 for the full description. [Listing setup](https://support.google.com/googleplay/android-developer/answer/9859152)

## 4. App content questionnaires

### App access, ads and basic functionality

| Question/topic | Answer for this build | Evidence or clarification |
|---|---|---|
| Access restrictions / login credentials | No special access or credentials required | No account, subscription, membership or geographic login gate. Levels unlock through ordinary gameplay. |
| Contains ads | No | No ad SDK or ad placement in the shipped build. |
| Account creation | No | No registration, login or account server. |
| In-app purchases / subscriptions | No | No billing library or purchase flow. Upfront Play Store pricing is a separate publisher choice. |
| Advertising ID | No, not used | No `AD_ID` permission or advertising-ID SDK in the inspected release. |
| News app | No | Entertainment game. |
| Government app | No | Not a government service or representative. |
| Financial features | No financial features | No payments, loans, wallet, cryptocurrency, financial advice or real-money rewards. |
| Health features | No health features | No health/fitness tracking or medical claims. |
| User-generated content / chat / social interaction | No | No uploads, messaging, chat or multiplayer. |
| Real-money gambling / simulated casino play | No | Platforming only; no wagering or casino mechanics. |
| Generative AI available to players | No | Some branding was prepared with an image-generation tool during development. The released game does not offer an AI-generation feature or send player input to an AI service. |

Suggested optional reviewer note:

> Devil Domain is an offline single-player platform game. No account or test credentials are required. Select Chapter 1, watch or skip the introduction, select Season 1 and start Level 1. Levels unlock sequentially through play. The Privacy policy button is on the main menu. Later chapters marked Coming soon are not part of the available 100-level campaign.

If Financial features or Health apps forms are shown, complete them even though neither applies. [Financial declaration](https://support.google.com/googleplay/android-developer/answer/13849271), [Health declaration](https://support.google.com/googleplay/android-developer/answer/14738291)

### Data safety

| Field/topic | Answer or handling |
|---|---|
| Does the app collect or share the required user-data types? | **No**, based on the inspected binary's runtime behaviour. |
| Data types collected by the game | None transmitted to the publisher or an app-integrated SDK. |
| Data shared by the game | None. |
| Progress, deaths, theme and intro preference | Saved locally; not uploaded by the game. Android system backup/transfer may handle app data separately. |
| Location, contacts, camera, microphone, photos, health data | Not accessed by the game. |
| Analytics / crash-reporting SDK / advertising identifiers | None integrated. Android/Google Play platform diagnostics are separate from an app-integrated SDK. |
| Data encrypted in transit | With no collection, the form may skip this. Do not invent a transmission/encryption claim or mark it Yes solely because the embedded local origin uses HTTPS. Follow the applicable no-collection path. |
| Account creation methods | No accounts. |
| Account-deletion URL | No account to delete; follow the no-account path. Do not invent a backend deletion endpoint. |
| Deleting local progress | Android app storage settings. This resets progress; system backups may need separate management. |
| Independent security review | Do not claim one; none was performed. |

User-initiated support email is handled in the user's email application; it is not an in-game email collection/upload feature. The policy nevertheless explains the support correspondence Akash AJ receives. If you add an in-app contact form, analytics, ads, billing or another SDK, reassess the entire form and policy before that update.

Google defines collection around the app's actual data handling; local-only processing is excluded. SDK behaviour also counts, not just your own code. Answer for all versions distributed through the listing, not only this file. [Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469)

### Content rating / IARC

Use **Game** and your monitored email for rating correspondence. The following describes visible content, not a promised age certificate:

| Topic | What this game contains |
|---|---|
| Violence / injury / death | **Yes.** A stylized fantasy player repeatedly dies from spikes, saws, lasers, crushers, falling blocks and other hazards, then restarts. |
| Character type | Abstract, horned, fantasy/non-realistic characters. Check the form's illustrated definitions if it distinguishes human-like and non-human characters. |
| Blood | **Yes: stylized red/orange particle bursts and stains.** Do not choose No blood merely because the art is cartoon-like. |
| Graphic gore, exposed organs, realistic mutilation | Not present in inspected gameplay. |
| Frightening imagery | Devil-themed art, dark settings and surprise traps. Disclose mild frightening/fantasy imagery wherever the questionnaire asks; review the supplied cinematic and audio too. |
| Sexual content / nudity | Not present. |
| Profanity | No profanity found in the shipped game text. Taunts include SKILL ISSUE and THAT HURT. Review all visual/audio assets before final submission. |
| Drugs, alcohol, tobacco | Not present in inspected game content. |
| Gambling, paid random items, cash prizes | Not present. |
| User interaction / unrestricted internet / location sharing | Not offered. A support email link does not make this an unrestricted browser. |

Choose the mild/stylized descriptors that match the actual images, while disclosing repeated violence and blood. Do not copy an invented PEGI/ESRB rating. IARC generates regional ratings from your completed answers. [Content ratings](https://support.google.com/googleplay/android-developer/answer/9859655)

### Target audience and children

This is a **publisher decision**, distinct from the IARC rating. If the intended audience is genuinely teens and adults, possible groups are 13–15, 16–17 and 18+. This is a proposal to review, not a declaration made on your behalf. Do not select those groups simply to avoid children's requirements. The colorful characters and artwork can appeal to children; consider the actual design and marketing. If you intentionally include younger children, accurately select those groups and review the applicable Families requirements before upload. [Target audience guidance](https://support.google.com/googleplay/android-developer/answer/9867159)

## 5. Artwork and screenshots

- **`app-icon-512.png`**: the original full logo exported at 512×512, RGBA PNG, below the 1 MB limit.
- **`feature-graphic-1024x500.png`**: the previously approved opaque RGB feature artwork.
- **`screenshots/01-level-72.jpg`, `02-level-91.jpg`, `03-level-100.jpg`**: three 1920×1080 JPEG captures of actual game physics and UI from locked release assets in a Chrome touch viewport. These are genuine in-engine captures, not AI artwork or physical-device measurements. Their provenance is recorded in `screenshots/CAPTURE_NOTES.json`. Review them or replace them with preferred phone captures. Keep the first three gameplay-focused; do not fabricate scenes.
- General listing minimum: two valid screenshots; JPEG or RGB PNG, dimensions 320–3840, longest side no more than twice the shortest. Three 16:9, 1920×1080 gameplay screenshots are part of Google's recommendation-format criteria, not a substitute for the general rules.
- Provide separate genuine tablet captures if supporting/promoting that device category. Do not label a resized phone screenshot as a tablet capture.
- An optional preview video should primarily show real gameplay. Do not use the 20-second cinematic alone as a demonstration of how the game plays.

[Google Play preview-asset requirements](https://support.google.com/googleplay/android-developer/answer/9866151)

## 6. Signing, testing and upload sequence

1. Create/select **Devil Domain** in Play Console. Select Game, the intended default language, and your genuine free/paid distribution choice. Once offered free, that same listing cannot later be changed to paid; confirm pricing before publishing. [Pricing rules](https://support.google.com/googleplay/android-developer/answer/6334373)
2. Complete the store listing, contact information, hosted privacy-policy URL, target audience, content rating, Data safety and other required App content declarations.
3. Enrol in **Play App Signing**. For this first release, let Google manage the app-signing/distribution key and use the existing local key as the upload key. `upload-certificate.pem` is public; never upload or share the private JKS/password file as a listing asset.
4. Upload `Devil-Domain-v1-production.aab` to Internal testing first. Review package, version, target API, permissions and any Play validation warnings. Release to your testers and install through the Play link.
5. Exercise the Play-distributed production package on your phones: offline launch, Chapter 1 intro, save/reload, touch controls, pause/resume, restart, difficult levels, theme and Privacy policy. Its save store is separate from Devil Domain Test.
6. If your account requires closed testing, complete that track and apply for production access. Promote the same verified artifact when appropriate.
7. Review pre-launch/device reports. Resolve blocking issues, select distribution countries, add release notes, review declarations and submit for Google's review. Publication/managed-publishing controls remain your choice in Console.

Back up `C:\Users\ashis\.devil-domain-signing` securely. Keep both `devil-domain-upload.jks` and `release.properties`; the latter contains passwords. These files are not in the release folder or app bundle. Keep the existing key for future uploads unless you deliberately follow Google's upload-key reset process. [App signing](https://developer.android.com/studio/publish/app-signing)

### New personal developer accounts

If your personal Play developer account was created after **13 November 2023**, Google's current production-access requirement includes a closed test with **at least 12 testers continuously opted in for 14 days**. Your dashboard determines applicability. Internal testing or direct APK installs do not replace that closed-track requirement. Actual engagement and feedback matter; reaching the number of days does not guarantee production access. [Testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465)

### Production-access questions: write truthful answers

| Question area | What to enter |
|---|---|
| How did you recruit testers? | Your actual method and experience. Do not invent a group, tester count or recruitment service. |
| Tester engagement/features tested | Actual participation and features exercised during the required Play closed test. A developer running automated replays is not 12 independent testers. |
| How was feedback collected? | Your real channels and observations. |
| What makes the game useful/unique? | Suggested: An offline single-player platformer with 100 levels combining springs, portals, moving platforms, switches and hidden traps, with short retries and local progress. |
| Target users | Your confirmed intended audience, consistent with target-age settings and marketing. |
| First-year installs | Your own realistic estimate; no evidence supports an invented number. |
| Changes based on testing | Verified so far: responsive menus/intro controls and automatic rendering adjustments were added after phone feedback. The owner reported about 15–20 FPS improvement. Attribute that as user feedback, not a controlled benchmark. Add genuine closed-test findings once collected. |
| Why ready for production? | Summarize the real Play test results, resolved issues and device coverage. You may additionally mention the automated checks below. Do not claim closed testing or a Google pre-launch report has passed before it has. |

## 7. Build verification and remaining review

The release was built offline with Java 21 and the existing release key. Checks cover Gradle release lint, AAB JAR signature, bundletool validation, the production manifest, locked progression, byte-matched embedded assets and exclusion of signing secrets/Forge developer content. The app targets API 36 and has no bundled native `.so` libraries; no app-packaged native ELF alignment issue was found. Google's guidance says Java/Kotlin apps without native libraries support 16 KB devices, but this is not a claim of physical 16 KB device testing. [16 KB guidance](https://developer.android.com/guide/practices/page-sizes)

Game verification includes the 193-test Node regression suite, 61 Chrome campaign completion replays and phone/tablet layout checks. New release checks include the offline policy viewer and its Close/Escape/native-Back handling. The owner reported improved real-phone FPS; the build system did not independently benchmark those physical phones.

No Play Console upload, account verification, closed-test certification, official rating assignment or publication has been performed by this preparation. The hosted privacy URL, intended audience, pricing/countries, screenshots, asset-rights confirmation and account-specific testing remain publisher responsibilities. `SHA256.json` identifies the delivered files; `BUILD_VERIFICATION.json` records package evidence.
