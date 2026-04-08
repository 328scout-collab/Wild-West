# Implement Issue

Pick up an issue and implement it end-to-end with full rigor.

## Which Issue

If the user specified an issue in their message, use that. Otherwise, check `.issues/open/` for available work. If multiple issues are open, present them and ask the user which to work on.

## Phase 1: Understand

1. **Read the issue** thoroughly — TL;DR, Why, Current State, Expected Outcome, Acceptance Criteria, Constraints.
2. **Check constraints and dependencies** — if the issue depends on another issue, verify it's closed. If a dependency isn't met, stop and inform the user.
3. **Explore the codebase** — read the files that will need to change. Understand the current implementation before modifying it.
4. **Ask clarifying questions** if anything is ambiguous. Do not assume requirements. Do not begin coding until you're confident you understand what to build and why.

## Phase 2: Implement

1. **Create a feature branch** following the project's branch naming convention.
2. **Implement the change** following the code standards in copilot-instructions.md. Only implement what the issue asks for — nothing more.
3. **Run build and lint** — Run the project's build and lint commands (defined in copilot-instructions.md). Both must pass. Fix any issues before proceeding.
4. **Commit** with a message following the project's commit convention.
5. **Update progress in the issue file** — Add a `## Progress` section at the bottom of the issue with a brief note of what was implemented and current status. This persists across sessions.

## Phase 3: Verify

1. **Self-review** — review your own changes against the review checklist: code quality, error handling, production readiness, security, performance.
2. **Fix any issues found** during self-review. Commit the fixes and run build and lint again.
3. **Verify acceptance criteria** — for every Given/When/Then in the issue, explicitly confirm it's met. If a criterion cannot be verified programmatically, explain how it was verified.
4. **Update progress in the issue file** — Update the `## Progress` section with verification results.

If you hit a blocker you can't resolve (build won't pass, contradictory requirements, missing dependency), stop and report it to the user with what you've tried. Do not loop indefinitely.

## Phase 4: Report

Present a status report to the user:

**Files Changed:**
- List each file with a brief description of what changed

**Decisions Made:**
- Any implementation choices that weren't specified in the issue (explain the reasoning)

**Acceptance Criteria:**
- Given/When/Then — Pass/Fail for each criterion

**Self-Review Results:**
- Issues found and fixed during self-review (if any)
- Remaining concerns or risks (if any)

**Manual Verification:**
If this change affects observable behavior that cannot be fully verified by build and lint alone, suggest concrete steps to exercise the new behavior and what to expect. Include edge cases worth checking.

**Ready for close?** — Yes/No. If no, explain what's blocking.

Do not close the issue automatically. The user decides when to close.
