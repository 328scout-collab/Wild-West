# 006: Permanent gold upgrades and run persistence

**Type:** Feature
**Priority:** High
**Effort:** Large
**Status:** Open

## TL;DR
Add gold rewards, a permanent upgrade shop, and persistence so player progress carries between runs for Aquatic Mafia.

## Why
Permanent progression is the core rogue-lite hook; without it, runs feel disconnected and there is no long-term reward.

## Current State
The game has no gold economy, no upgrade shop, and no way to save permanent progress between runs.

## Expected Outcome
At the end of each round, players receive gold based on rank, can spend it on permanent upgrades, and progress persists across sessions.

## Acceptance Criteria
- Given a round ends, when rank is calculated, then the player receives gold based on S/A/B/C/D rewards of 100/75/50/25/10.
- Given gold is earned, when the player opens the upgrade shop, then they can spend gold to permanently increase starting round currency by 25.
- Given a permanent upgrade is purchased, when a new run begins, then the starting currency reflects the upgraded amount.
- Given the game closes and reopens, when the player returns, then purchased permanent upgrades still apply.

## Constraints
- Depends on #002.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
