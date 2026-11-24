# Forge critical fixes

## Findings
The recorded 61–70 batch contained seven Medium and three Very Hard outputs for Extreme. Targets changed section count but were never acceptance criteria; HARD was missing. Short direct routes remained possible. Estimates used twice solver duration plus explicit discovery/relocation allowances, not measured human time.

A fresh click on 61 reproduced correct gameplay, not the historical menu symptom. Confirmed lifecycle defects: no initial injection or iframe-load reinjection; refresh replaced candidate object references, cancelling pending loads; selection errors were unhandled. Startup, reload and selection now inject after complete runtime loading, check ID/data/seed/hash and gameplay state, and enable keyboard input.

## Changes
Seven tiers; ceil(count/2) selected-tier slots and floor(count/2) preceding-tier slots (all Beginner for Beginner). Acceptance requires actual measured tier match and existing validation/solver/replay/uniqueness checks. Three attempts maximum; actual shortfalls exposed. Higher tiers use four or six reachable moving-exit positions with return traversal, without new physics or forced waits. Score remains 60% transparent time estimate and 40% local concentration, split into seven equal score bands. Human calibration remains necessary.

51–60 were archived, unapproved; prior generation reserved their IDs and advanced to 61–70. Archives are restored for review; new batches retain previous candidates. Explicit discard releases a reservation; rejection alone retains it. Allocation searches available contiguous slots above production, never overwrites approved/retained IDs. Trial uses 71–80 because 51–70 remain retained. Production stays at 50. Legacy out-of-band candidates are marked accordingly on server load. No integration or approval occurred.

Modified: forge/v2.js, app.js, server.js, index.html, browser-test.js, tests/forge-v2.test.js. Added trial and critical browser/replay/contract tests. Production game files unchanged.

## Final trial
Requested five Extreme + five Very Hard. Accepted five Extreme + four Very Hard; one similarity rejection after bounded retries. Batch satisfied: false. All ten have real-engine and Chrome completion proofs and are manually playable before approval.

| ID | Name | Measured tier | Estimated seconds | Max traps/200px | Acceptance | Engine + Chrome replay | Approval |
|---|---|---|---:|---:|---|---|---|
| 71 | SCARLET THRESHOLD | EXTREME | 56.2 | 2 | VERIFIED | VERIFIED | Unapproved |
| 72 | CRIMSON RETURN | EXTREME | 53.4 | 3 | VERIFIED | VERIFIED | Unapproved |
| 73 | CRIMSON ECHO | EXTREME | 58.0 | 2 | VERIFIED | VERIFIED | Unapproved |
| 74 | EMBER ECHO | EXTREME | 56.0 | 2 | VERIFIED | VERIFIED | Unapproved |
| 75 | BROKEN RELAY | EXTREME | 53.4 | 3 | VERIFIED | VERIFIED | Unapproved |
| 76 | IRON THRESHOLD | VERY HARD | 36.6 | 3 | VERIFIED | VERIFIED | Unapproved |
| 77 | SCARLET PASSAGE | VERY HARD | 37.0 | 2 | VERIFIED | VERIFIED | Unapproved |
| 78 | IRON RECKONING | VERY HARD | 37.0 | 3 | VERIFIED | VERIFIED | Unapproved |
| 79 | EMBER ECHO | VERY HARD | 39.4 | 2 | NEEDS HUMAN REVIEW | VERIFIED | Unapproved |
| 80 | CRIMSON PROMISE | VERY HARD | 39.4 | 3 | VERIFIED | VERIFIED | Unapproved |

## Evidence
138 existing automated checks; 18 V2/critical checks pass. Browser regressions cover all 50 renders and keyboard victories 30–40; Forge fixture covers 41–50. critical-preview.json records direct load, exact candidate identity, manual movement/jump/restart for 30 retained candidates. critical-replay.json records ten new Chrome victories. Production hashes unchanged. Existing APK/AAB archives and fresh release assets exclude Forge/tests; no new Android binary build or device test claimed. Detailed logs are in test-results/critical-*.

Launch npm run forge; http://127.0.0.1:8091. Select candidates 71–80. Awaiting review, approval, and integration are separate; unapproved candidates cannot be exported.

## Limits
The full accepted 5+5 request was not achieved: 79 remains rejected by similarity. Fixed screen routes use repeated moving exits, not a multi-room planner. Estimates and equal score bands need human calibration. No claim that every tier request can be satisfied. Contract tests prove requested quota allocation and shortfall handling; only the Extreme trial has full new real-engine evidence in this run.
