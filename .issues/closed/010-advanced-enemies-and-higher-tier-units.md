# 010: Advanced enemies and higher-tier units

**Type:** Feature
**Priority:** Medium
**Effort:** Large
**Status:** Open

## TL;DR
Add advanced enemy behaviors and higher-tier player units to expand Aquatic Mafia gameplay depth after the initial MVP.

## Why
Advanced enemies and stronger units create a richer challenge and help the game feel more varied and tactical.

## Current State
Only the base enemies and basic units exist; advanced traversal behavior and premium unit abilities are missing.

## Expected Outcome
Players face jumping, gliding, and exploding enemies while gaining access to Bomber and Sheriff units with unique abilities.

## Acceptance Criteria
- Given later rounds, when advanced enemies spawn, then Dolphin and Seahorse can change rows, Flying Fish can glide over one unit, and Pufferfish explodes on death.
- Given Bomber is purchased, when it places dynamite, then the projectile travels three spaces and can pass over enemies.
- Given Sheriff is placed, when it attacks, then it boosts adjacent friendly unit stats within its buff area.
- Given higher-tier units exist, when they are placed, then the correct cost is deducted and their special behaviors occur.

## Constraints
- Depends on #005 and #008.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
