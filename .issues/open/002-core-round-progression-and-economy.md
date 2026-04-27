# 002: Core round progression and economy

**Type:** Feature
**Priority:** High
**Effort:** Large
**Status:** Open

## TL;DR
Implement the core game loop and round system for Aquatic Mafia, including endless round progression, fixed round currency, wave sequencing, defense breach detection, and rank calculation for round completion.

## Why
Without round progression and economy, the game cannot deliver the intended rogue-lite experience or meaningful player decisions.

## Current State
There is no round logic, no currency management, and no win/lose conditions defined in the current game scaffold.

## Expected Outcome
The game can start a round with 200 currency, run one or more waves, detect defense breach failure, complete a round, and calculate rank based on time and damage taken.

## Acceptance Criteria
- Given a new run starts, when a round begins, then the player has 200 currency and a round timer starts.
- Given a round is active, when all waves are completed, then round completion is detected and rank calculation begins.
- Given the defense point is breached, when an enemy reaches the left edge, then the round ends in failure.
- Given the round ends, when the system evaluates performance, then the rank is determined using time and damage taken.

## Constraints
- Depends on #001.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
Implemented core round progression, fixed round currency, a timer, placeholder wave completion, defense breach handling, and rank calculation. Verified `npm run build` succeeds.
