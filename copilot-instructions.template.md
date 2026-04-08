# Project Name

One-line description of what this project is and does.

<!-- HOW TO USE THIS TEMPLATE                                            -->
<!--                                                                     -->
<!-- 1. Move this file to .github/copilot-instructions.md                -->
<!-- 2. Replace ALL placeholder text (anything in [brackets]) with your  -->
<!--    actual project details                                           -->
<!-- 3. Delete this comment block                                        -->
<!-- 4. Remove the "Why" notes — they're for your reference, not Copilot -->
<!-- 5. Delete this comment block                                        -->

## Tech Stack

> **Why:** Copilot uses this to write idiomatic code with the right APIs and patterns. Without it, Copilot guesses — and guesses wrong.

- Language: [e.g., TypeScript, Python, Rust]
- Framework: [e.g., React, FastAPI, Axum]
- Build tool: [e.g., Vite, Poetry, Cargo]
- Testing: [e.g., Vitest, pytest, cargo test]
- Database: [e.g., PostgreSQL, SQLite, none]

## Architecture

> **Why:** Copilot uses this to put new code in the right place and understand how modules connect. A wrong mental model here means files created in wrong directories and imports that don't follow the project's patterns.

- `src/` — [describe what lives here]
- `src/[module]/` — [what this module handles]
- `src/[module]/` — [what this module handles]
- `[tests or other top-level dir]/` — [what lives here]

### Key Modules

> **Why:** These are the files Copilot reads first when working on related features. List the 3-5 most architecturally important files — the ones a new developer would need to understand before making changes.

- `src/path/to/file` — [what it does]

## Commands

> **Why:** Copilot runs these to verify its own work. If these are wrong or missing, Copilot cannot self-check and will submit broken code. The prompts (implement, close-issue) reference "the project's build and lint commands" — this is where they look.

```bash
[dev server command]       # Dev server
[build command]            # Production build (must pass before committing)
[lint command]             # Linter
[test command]             # Tests
```

## Code Standards

> **Why:** Copilot follows these literally when writing code. Vague standards ("write clean code") are ignored. Specific standards ("no `any` types", "always handle errors with Result") change Copilot's output.

**[Language]:**
- [Specific, actionable convention]
- [Another convention]

**[Framework or domain area]:**
- [Specific, actionable convention]

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
- **Build and lint on every commit.**

## Guidelines

- Don't add new dependencies without asking
- Don't refactor code outside the issue scope
- Ask if uncertain about implementation approach
- Test locally by building + manual gameplay
- **Never modify CLAUDE.md directly. Propose changes and wait for explicit approval before writing.**