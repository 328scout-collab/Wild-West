# Plan

**Do not write any code. Do not create any files until explicitly approved.**

Take a big idea — a new project, a complex feature, or a major refactor — and decompose it into implementable issues through deep requirements gathering.

## Initial Context

If the user provided a description in their message, use that as the starting idea. If not, ask them what they want to plan.

## Phase 1: Understand the Vision

Start a deep conversation with the user. Your goal is to fully understand what they want to build and why before proposing anything.

**Explore these areas** (not as a checklist — follow the conversation naturally):
- What are we building? What problem does it solve?
- Who is it for? What's the user experience?
- What does success look like?
- What's in scope and what's explicitly out of scope?
- Are there constraints (tech stack, timeline, compatibility, dependencies)?

**For existing projects**, read the codebase and check `.issues/open/` and `.issues/backlog/` first. Understand the current architecture, patterns, existing work in progress, and conventions before asking questions. Your questions should be informed by what exists, not generic. New issues should not duplicate or conflict with existing ones.

**For new projects**, ask about technology preferences, deployment targets, and any prior art or inspiration.

**Keep asking questions.** Do not move on until the user tells you they're satisfied. Challenge assumptions, surface edge cases, and push back on scope when it feels too broad for one planning session. If the user's idea is vague, help them sharpen it. If it's too ambitious, help them find the MVP.

## Phase 2: Decompose

Once the user signals they're ready to move on, propose a decomposition into issues.

**Calibrate granularity.** Each issue should be:
- A coherent feature or capability that can be implemented end-to-end in a single implement cycle
- Independently testable — its acceptance criteria can be verified without other unfinished issues
- Meaningful on its own — not just "create database model" but "user authentication with signup, login, and session management"

**Identify dependencies.** For each issue, note which other issues must be completed first. Use the issue number reference (e.g., "Depends on #001"). Issues with no dependencies can be worked in any order.

**Suggest a build order.** Present the issues in the recommended implementation sequence — dependencies first, then the features that build on them.

**Present the full plan** as a numbered list with:
- Issue title
- One-line summary
- Dependencies (if any)
- Suggested order position

Use temporary labels during planning (Issue 1, Issue 2, etc.) — real issue numbers are assigned in Phase 4 when files are created.

Example:
```
1. Issue 1: Project scaffolding and tooling setup
   Setup build system, linting, dev server, and base project structure.
   Dependencies: none

2. Issue 2: User authentication (signup, login, session)
   Complete auth flow with password hashing, JWT tokens, and session persistence.
   Dependencies: Issue 1

3. Issue 3: Product catalog with search
   Display products with filtering and full-text search.
   Dependencies: Issue 1
```

## Phase 3: Refine

After presenting the plan, ask the user for feedback:
- Are any issues too big and should be split?
- Are any too small and should be combined?
- Are dependencies correct?
- Is anything missing?
- Should any issues be cut from scope?

Iterate until the user approves the plan. When the user signals approval (e.g., "looks good", "approved", "go ahead"), proceed to Phase 4 without asking again.

## Phase 4: Create Issues

**Only after the user explicitly approves the plan**, create all issue files in `.issues/open/` using the create-issue template and conventions.

For each issue:
- Use the next sequential number (check `.issues/` for the highest existing number)
- Fill in all template fields: TL;DR, Why, Current State, Expected Outcome, Acceptance Criteria (Given/When/Then), Constraints
- Add dependency references in the Constraints section
- The first issue in the sequence should note in its TL;DR: "First of N issues for [feature/project name]. Build order: #NNN → #NNN → ..."

**Update progress in the issue file** — Add a `## Progress` section noting this issue was created as part of a planning session, with a reference to related issues in the sequence.

After creating all issues, present a summary:
- Total issues created
- Build order with dependencies
- Which issues are ready to implement immediately (no unmet dependencies)
