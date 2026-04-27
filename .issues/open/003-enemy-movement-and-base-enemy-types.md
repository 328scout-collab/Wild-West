# 003: Enemy movement and base enemy types

**Type:** Feature
**Priority:** High
**Effort:** Large
**Status:** Open

## TL;DR
Add enemy spawning, straight-line movement toward the defense point, collision detection, and three base enemy types: Fish, Shrimp, and Crab.

## Why
Core enemy behavior is essential for the defense gameplay loop and for players to experience combat risk and wave progression.

## Current State
No enemies exist in the game, and there is no movement or collision system for enemy units.

## Expected Outcome
Enemies spawn in waves, move left along their row, occupy grid space properly, and interact with the defense system.

## Acceptance Criteria
- Given a wave begins, when enemies spawn, then Fish, Shrimp, and Crab appear in the correct rows.
- Given enemies are active, when they move, then they travel straight toward the left defense point on their row.
- Given a Crab spawns, when it moves, then it occupies two grid spaces and moves slower than Fish.
- Given an enemy reaches the defender line, when it arrives, then the defense breach condition is triggered.

## Constraints
- Depends on #002.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
Implemented enemy spawning with Fish, Shrimp, and Crab, straight movement toward the defense line, and informational popups for new enemy types. Verified `npm run build` succeeds.
