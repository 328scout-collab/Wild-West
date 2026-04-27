# 008: Map expansion and difficulty scaling

**Type:** Feature
**Priority:** Medium
**Effort:** Medium
**Status:** Closed

## TL;DR
Implement vertical map expansion and round difficulty scaling so the game gradually becomes harder as runs progress.

## Why
Progressive difficulty and map growth keep the endless run engaging and provide a sense of escalation.

## Current State
Map expansion and difficulty scaling implemented with dynamic grid growth and enemy scaling.

## Expected Outcome
Every 5 rounds, the map gains one additional row up to a maximum of 6 rows, and enemy waves become harder with more enemies and faster spawns.

## Acceptance Criteria
- Given the player reaches round 6, when the round begins, then the grid expands from 3 rows to 4 rows. ✅
- Given the player reaches round 10, when the round begins, then the grid can expand up to 6 rows as designed. ✅
- Given later rounds are active, when waves spawn, then enemy numbers increase and spawn timing accelerates. ✅
- Given map expansion occurs, when the player places units, then all new rows are eligible for placement with empty tiles. ✅

## Implementation Details
- **Map Expansion**: `getCurrentGridRows()` calculates rows based on round (3 + floor((round-1)/5)), max 6 rows
- **Dynamic Grid**: `createGrid()` recreates grid tiles when expanding, preserves existing units
- **Enemy Scaling**: Health +10% and speed +5% per round, more enemies per row (+1 every 3 rounds)
- **Spawn Timing**: Staggered spawns with faster intervals in higher rounds (down to 200ms minimum)
- **Wave Count**: Increases by 1 every 4 rounds for longer rounds
- **Round Progression**: `completeRound()` increments round counter for continuous escalation
