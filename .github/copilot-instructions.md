# Game Project

A browser-based game built with Phaser.js and TypeScript. Game concept TBD.

## Tech Stack

- Language: TypeScript (strict mode)
- Framework: Phaser.js 3
- Build tool: Vite
- Package manager: npm
- Linting: ESLint with recommended rules
- Testing: None (planned for later)
- Database: None (client-side only)

## Architecture

- `src/` — All game source code
- `src/scenes/` — Phaser scenes (menu, gameplay, game over, etc.)
- `src/entities/` — Game objects, sprites, and their behaviors
- `src/config/` — Game configuration, constants, and Phaser config
- `src/utils/` — Shared helper functions and utilities
- `public/` — Static assets served as-is (HTML entry point)
- `assets/` — Game assets (sprites, audio, tilemaps, fonts)

### Key Modules

- `src/main.ts` — Entry point; creates the Phaser.Game instance with config
- `src/config/game-config.ts` — Phaser game configuration (dimensions, physics, scene list)
- `src/scenes/` — Each file exports a single Phaser.Scene subclass; scenes are the primary unit of game organization

## Commands

```bash
npm run dev          # Dev server with hot reload
npm run build        # Production build (must pass before committing)
npm run lint         # ESLint
npm run preview      # Preview production build locally
```

## Code Standards

**TypeScript:**
- Strict mode enabled (`strict: true` in tsconfig)
- No `any` types — use proper typing or `unknown` with type guards
- Use `interface` for object shapes, `type` for unions and intersections
- Prefer `const` over `let`; never use `var`
- Use explicit return types on public functions

**Phaser / Game Code:**
- One scene per file, named to match the scene key (e.g., `GameScene.ts` → scene key `"Game"`)
- Extend `Phaser.Scene` for all scenes; use `preload()`, `create()`, `update()` lifecycle methods
- Keep game logic in entities, not scenes — scenes orchestrate, entities behave
- Use Phaser's built-in physics and tweens over manual calculations when possible
- Load assets in `preload()` using Phaser's loader, not external fetch calls

**General:**
- No default exports — use named exports
- Use ES module imports, not CommonJS `require()`
- Keep files under 200 lines; split when larger

## Git Workflow

- Always work on a feature branch: `git checkout -b <issue-number>-<short-description>`
- Never commit directly to main
- Commit message format: `#<issue-number> [Type]: [Short description]`
- Run `npm run build` and `npm run lint` before every commit — both must pass
- One feature per commit, describe what and why
- After merging to main, push to the remote (`git push`)

## Issue Tracking

Issues are tracked as markdown files in `.issues/`:
- `.issues/open/` — active work
- `.issues/closed/` — completed
- `.issues/backlog/` — future work

File naming: `NNN-kebab-case-title.md` (sequential numbering).

## Autonomous Work Standards

When working on implementation, prove your work is correct — don't just assert it.

- **Self-review before presenting work as done.** Run through the review checklist (code quality, error handling, production readiness, security, performance) on your own changes. Fix issues before reporting completion.
- **Verify acceptance criteria.** For every Given/When/Then in the issue, explicitly confirm it's met. Report pass/fail per criterion.
- **Report status after completing work.** Always present: files changed, decisions made, acceptance criteria results, any risks. The user should never have to ask "what did you do?"
- **Never make architectural decisions without approval.** New patterns, structural changes, new dependencies, or significant deviations from existing conventions — present options and get approval first.
- **Never close issues autonomously.** Only close an issue when the user explicitly requests it (e.g., `/close-issue`). After completing work, report status and wait for the user to verify and decide when to close.
- **Build and lint on every commit.** Both `npm run build` and `npm run lint` must pass before committing.

## Guidelines

- Don't add new dependencies without asking
- Don't refactor code outside the issue scope
- Ask if uncertain about implementation approach
- Test locally by building + manual gameplay
- **Never modify copilot-instructions.md directly. Propose changes and wait for explicit approval before writing.**
