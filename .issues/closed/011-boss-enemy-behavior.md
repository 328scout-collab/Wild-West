# 011: Boss enemy behavior

**Type:** Feature
**Priority:** Medium
**Effort:** Large
**Status:** Open

## TL;DR
Implement the Turtle boss for Aquatic Mafia, including its two-tile size, row-switching movement, beam attack, and retaliation behavior.

## Why
A boss encounter adds a memorable high-stakes challenge and a compelling milestone within the endless run.

## Current State
There are no boss enemies or unique boss behaviors in the game.

## Expected Outcome
The Turtle boss arrives in later rounds with distinct mechanics that force players to adapt their defense.

## Acceptance Criteria
- Given the Turtle boss spawns, when it appears, then it occupies two horizontal grid spaces.
- Given the Turtle boss is active, when it chooses to move, then it can switch to an adjacent row and pauses briefly during the move.
- Given the Turtle boss is attacked physically, when it takes damage, then it retaliates with a counterattack.
- Given the Turtle boss is in range, when it fires its eye beam, then the beam animation plays and damage is applied ahead of it.

## Constraints
- Depends on #010.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
