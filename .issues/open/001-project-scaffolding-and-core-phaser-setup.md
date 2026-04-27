# 001: Project scaffolding and core Phaser setup

**Type:** Feature
**Priority:** High
**Effort:** Large
**Status:** Open

## TL;DR
First of 12 issues for Aquatic Mafia. Build order: #001 → #002 → #003 → #004 → #005 → #006 → #007 → #008 → #009 → #010 → #011 → #012. Set up the Phaser TypeScript project with the base scene structure, game configuration, and initial 3x9 grid rendering.

## Why
The game needs a working browser-based project foundation before any gameplay, enemy, or upgrade systems can be built.

## Current State
There is no game code, scene scaffold, or grid map implementation in the repository yet.

## Expected Outcome
Developers can run the project in the browser, see the main menu and a rendered 3-row by 9-column grid, and use the configured Phaser project as the basis for gameplay.

## Acceptance Criteria
- Given the repository is opened, when the developer starts the project, then the Phaser game initializes without compile errors.
- Given the game loads, when the main menu is displayed, then the scene is visible and the developer can navigate to gameplay.
- Given gameplay starts, when the scene renders, then the grid appears as 3 rows by 9 columns with empty tile placeholders.

## Constraints
- Depends on no other issues.

## Progress
Created during planning session for Aquatic Mafia. Related issues: #001-#012.
Implemented Phaser project scaffolding, main menu, and 3x9 grid rendering. Verified `npm install` and `npm run build` succeed.
