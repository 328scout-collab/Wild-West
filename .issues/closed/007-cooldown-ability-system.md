# 007: Cooldown ability system

**Type:** Feature
**Priority:** Medium
**Effort:** Medium
**Status:** Closed

## TL;DR
Implement the cooldown ability system for Aquatic Mafia, starting with the Freeze ability that can be purchased and upgraded between runs.

## Why
Cooldown abilities add strategic depth and let players influence individual enemy behavior during rounds.

## Current State
Freeze ability implemented with cooldown management and persistent upgrades.

## Expected Outcome
Players can unlock Freeze, activate it during rounds, and manage cooldowns while the ability upgrades persist between runs.

## Acceptance Criteria
- Given the player has unlocked Freeze, when the round is active, then the Freeze button is available. ✅
- Given the player uses Freeze, when an enemy is selected, then that enemy is frozen for 5 seconds. ✅
- Given Freeze is on cooldown, when it is used, then it cannot be used again until the cooldown completes. ✅
- Given the player purchases an upgrade, when the next run begins, then the enhanced Freeze stat is applied. ✅

## Implementation Details
- Added Freeze button that activates freeze mode during rounds
- Click enemy to freeze it for 5 seconds (stops movement, blue tint)
- 15-second cooldown (reduced by 1s per upgrade)
- Upgrade costs 30 gold and persists between runs
- Cooldown and freeze state managed in update loop
- Enemy selection via pointer click detection

## Constraints
- Depends on #005.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
