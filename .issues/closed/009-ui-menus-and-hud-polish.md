# 009: UI menus and HUD polish

**Type:** Feature
**Priority:** Medium
**Effort:** Medium
**Status:** Closed

## TL;DR
Create the game UI for Aquatic Mafia, including the main menu, in-game HUD, round-end results screen, and upgrade shop interface.

## Why
A polished UI is needed for players to understand currency, rank, waves, and upgrades during play.

## Current State
Complete UI system implemented with menu navigation, HUD, round-end screens, and upgrade shop.

## Expected Outcome
Players can navigate the main menu, see currency and wave status in-game, review rank and gold rewards after a round, and access the upgrade shop.

## Acceptance Criteria
- Given the game loads, when the player opens the main menu, then navigation options are visible. ✅
- Given a round is active, when the player looks at the HUD, then current currency, wave count, and damage taken are displayed. ✅
- Given a round ends, when results are calculated, then rank and gold reward appear on a round-end screen. ✅
- Given the upgrade shop is opened, when the player has gold, then purchase options and current balances are shown. ✅

## Implementation Details
- **Main Menu**: Enhanced with upgrade shop access, displays current gold and upgrade counts
- **Upgrade Shop**: Interactive interface for purchasing currency and freeze upgrades with localStorage persistence
- **Round-End Screen**: Dedicated scene showing rank, gold earned, and navigation options
- **HUD Polish**: Top bar with icons (💰🪙⏱️❤️🌊), organized layout for currency, timer, health, and wave progress
- **Scene Management**: Added RoundEndScene to main.ts, proper scene transitions with data passing
