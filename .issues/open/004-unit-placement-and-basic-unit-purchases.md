# 004: Unit placement and basic unit purchases

**Type:** Feature
**Priority:** High
**Effort:** Large
**Status:** Open

## TL;DR
Enable drag-and-drop placement of player units on the grid and implement the Hunter and Sniper unit purchase system with fixed currency costs.

## Why
Placement and spending are core strategic mechanics; without them, players cannot defend against enemy waves.

## Current State
The game has no unit purchase interface and no way for players to place units on the grid.

## Expected Outcome
Players can select Hunter or Sniper units, spend currency, and place them on any empty grid tile.

## Acceptance Criteria
- Given 200 currency at round start, when the player buys a Hunter, then 50 currency is deducted and a Hunter placeholder is available for placement.
- Given a unit is purchased, when the player drags it onto an empty tile, then it appears there and occupies that tile.
- Given a unit is placed, when the player tries to place another unit on the same tile, then placement is blocked.
- Given a Sniper is purchased, when placed, then it appears on the selected empty grid space and uses 75 currency.

## Constraints
- Depends on #002.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
Implemented Hunter and Sniper purchase buttons, currency deduction, and grid placement for empty tiles. Verified `npm run build` succeeds.
