# Solve

End-to-end: understand the request, investigate if needed, implement, verify, and deliver — all in one pass.

## Input

If the user provided a description in their message, use that as the request. If not, ask them what they need.

## Phase 1: Understand

Read the codebase first. Understand the current architecture, patterns, and conventions before doing anything. Follow all project guidelines defined in copilot-instructions.md throughout this process.

Then determine what kind of request this is:

**If the user describes a solution** (what to change, what to add, what to remove):
- Summarize the plan — what you'll change, where, and why.

**If the user describes a problem** (unexpected behavior, a bug, something that doesn't work):
- Investigate the codebase to identify the root cause.
- Reproduce the issue by reading code paths, tracing logic, or running tests.
- Present your diagnosis and proposed fix — what's wrong, why, and what you'll change.

**In either case, wait for the user to confirm before writing any code.**

If the change is trivial and unambiguous (e.g., fixing a typo, renaming a variable), state what you're doing and proceed without waiting for confirmation.

## Phase 2: Implement

- Create a branch following the project's git workflow (defined in copilot-instructions.md).
- Make the changes.
- If new behavior is being added or a bug is being fixed, add or update test cases.
- Self-review: re-read your own changes. Check for correctness, edge cases, and consistency with the existing codebase.

## Phase 3: Verify

- Run the project's test command (defined in copilot-instructions.md), if one exists.
- Run the project's build and lint commands (defined in copilot-instructions.md), if they exist.
- If no test, build, or lint commands are defined, perform a thorough self-review of all changes as a substitute.
- If anything fails, fix it and re-run. Do not proceed until everything passes.

## Phase 4: Deliver

Merge the branch to main. If there are merge conflicts, stop and inform the user.

**Documentation checks** — only if this change affects documented behavior:
- **CHANGELOG.md** — if a CHANGELOG.md exists, add an entry under "Unreleased." If it doesn't exist, skip — do not create one.
- **README.md** — if this change affects project setup, commands, architecture, or usage documented in README.md, update it. Otherwise skip.
- **copilot-instructions.md** — if this change affects the tech stack, architecture, commands, file structure, or conventions documented in copilot-instructions.md, propose the changes to the user and wait for approval. Do not modify copilot-instructions.md without explicit approval.

Commit with a descriptive message following the project's commit conventions (defined in copilot-instructions.md).

Delete the feature branch locally and from the remote.

Report back:
- What changed (files modified, logic added/removed)
- What was tested (tests run, results)
- Any decisions you made during implementation and why
