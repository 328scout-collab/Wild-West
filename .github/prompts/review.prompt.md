# Code Review

**This is a review only. Do not edit any code.**

## Scope

If the user specified a scope in their message, use that. Otherwise, default to **branch diff** — review all changes on the current branch compared to main.

If currently on main with no branch diff, ask the user what they want reviewed: `everything` for a full codebase review, or a specific commit range.

Supported scopes:
- **branch diff** (default) — `git diff main...HEAD` plus any uncommitted changes
- **everything** — full codebase review, organized by module/area

## What to Review

**Intent** — Does the change actually solve the stated problem? Extract the issue number from the current branch name (branches follow `<issue-number>-<description>` convention) and check the corresponding issue in `.issues/`. The most valuable review finding is code that works perfectly but solves the wrong problem.

**Acceptance Criteria** — If the corresponding issue has Given/When/Then acceptance criteria, verify each criterion against the implementation. Report pass/fail per criterion in the output.

**Code Quality** — Follow the project's code standards defined in copilot-instructions.md. Check for consistency with existing patterns in the codebase.

**Error Handling** — Try-catch for async operations, helpful error messages, no swallowed errors.

**Production Readiness** — No debug statements, no TODOs left behind, no hardcoded secrets, no console.log.

**Security** — Inputs validated, no injection vectors, auth checked where needed.

**Performance** — No unnecessary recalculations, expensive operations are memoized or cached where appropriate.

For **everything** reviews, also look for:
- **Systemic patterns** — The same issue repeated across multiple files (report once, list all locations)
- **Architectural drift** — Early code following one pattern, recent code following another
- **Dead code** — Unused exports, unreachable branches, stale references

## Output Format

Organize by severity, not by file. Only include sections that have findings — omit empty sections.

**Issues Found:**
- **[SEVERITY]** `file:line` — Description. Recommendation.

**Systemic Patterns** (everything reviews only):
- Description of pattern — locations where it appears

**Acceptance Criteria** (branch diff reviews with a corresponding issue):
- Given/When/Then — Pass/Fail

**Looks Good:**
- Call out specific things done well — not generic praise. If nothing stands out, omit this section.

**Summary:**
- Scope reviewed: [branch diff / full codebase]
- Files reviewed: N
- Findings: N critical, N high, N medium, N low

## Severity Levels
- **CRITICAL** — Security, data loss, crashes
- **HIGH** — Bugs, performance issues, bad UX
- **MEDIUM** — Code quality, maintainability
- **LOW** — Style, minor improvements
