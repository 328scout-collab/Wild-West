# 005: Combat system and damage handling

**Type:** Feature
**Priority:** High
**Effort:** Large
**Status:** Open

## TL;DR
Build the combat system that allows player units to attack enemies, apply damage, and resolve health and enemy interactions with the defense zone.

## Why
Without combat and damage handling, the game cannot translate player decisions into meaningful outcomes.

## Current State
There are no attacks, damage calculations, or health systems for units and enemies.

## Expected Outcome
Player units shoot or damage enemies, enemies take damage and die, and the defense health system updates when enemies reach the left edge.

## Acceptance Criteria
- Given a Hunter or Sniper is placed, when an enemy enters its attack range, then the unit attacks with a projectile or hit effect.
- Given an enemy is hit, when damage is applied, then the enemy health decreases and the enemy dies at zero health.
- Given an enemy reaches the left defense zone, when it arrives, then defense damage is applied.
- Given an enemy dies, when it is removed, then the grid tile it occupied becomes available for a new unit.

## Constraints
- Depends on #003 and #004.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
Implemented unit attack logic, projectiles, enemy health, and defense damage tracking. Verified `npm run build` succeeds.
