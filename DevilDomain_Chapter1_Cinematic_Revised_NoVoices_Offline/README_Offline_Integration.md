# Devil Domain — Chapter 1: The Stolen Light (v3 Cinematic Revision)

20 seconds · 1920 × 1080 landscape · H.264 MP4 · AAC stereo · 24 fps · 100% offline.

## What changed compared with v2

- **No voices, no dialogue captions.** The soundtrack contains original synthesized score, ambient sound, magical impacts, cloth/rustles and footsteps only.
- **Short believable arm.** The villain walks close to the diamond first. His temporary jointed arm has a capped local reach (140 units) instead of stretching across the stage.
- **Mountain escape fixed.** The villain runs **inside a visible cave** at the mountain base. He shrinks slightly with depth, is occluded by the cave rocks, and disappears into the opening; never runs outside the mountain/right of the screen.
- Darker film grading, shadowed rocky mountain facets, atmospheric beams and haze, less character idle bouncing, no cartoon grin on the villain.
- Original simple horned character silhouettes have been preserved; this remains a **stylized 2D animation**, not photorealistic 3D animation.

## Files

- `DevilDomain_Chapter1_Cinematic_1080p_NoVoices.mp4` — ready-to-use finished game cutscene.
- `DevilDomain_Chapter1_Offline_SingleFile.html` — fully self-contained offline HTML animation with embedded music and sound effects. Open locally and press PLAY.
- `DevilDomain_Chapter1_Cinematic.html` — editable offline Canvas animation code. Keep its MP3 alongside it.
- `DevilDomain_Chapter1_Soundtrack.mp3` — no-dialogue effects and music.
- `DevilDomain_Chapter1_Storyboard_NoVoices.json` — editable scenes/timings and production notes.
- `DevilDomain_Chapter1_Scene_Preview_v3.jpg` — scene contact sheet.
- `make_audio_no_voices.py`, `export_mp4.py` — optional reproduction build scripts; use FFmpeg and Python dependencies to regenerate.

## Embed offline in Android / Flutter

Bundle the MP4 in `assets/cutscenes/` and list that path in `pubspec.yaml`.
With `video_player`, initialize using `VideoPlayerController.asset('assets/cutscenes/DevilDomain_Chapter1_Cinematic_1080p_NoVoices.mp4')`, call `play()`, show a skip button, and navigate to Level 1 on completion.
Before playback, set your game's preferred orientations to landscape with `SystemChrome.setPreferredOrientations`; restore portrait if the gameplay needs portrait when the cutscene ends.
Neither MP4 nor HTML makes network calls. No Android `INTERNET` permission is needed for the animation itself.

## Export QA

Visual frame checks: 05.70, 06.20, 06.50, 06.70, 07.30, 07.70, 08.10, 09.20, 10.30, 10.70, 10.92, 12.70, 13.70, 16.40, 19.10 seconds. Browser renderer completed with zero JavaScript page errors. No recorded/generated dialogue added to soundtrack.
