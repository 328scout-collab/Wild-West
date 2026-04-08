# Close Issue

An issue has been completed and all approvals have been granted. Time to close it.

## Which Issue

If the user specified an issue in their message, use that. Otherwise, try to infer from the current branch name (branches follow `<issue-number>-<description>` convention). If still unclear, check `.issues/open/` for candidates and ask the user.

## Steps

1. **Verify build and lint pass** — Run the project's build and lint commands (defined in copilot-instructions.md). Do not proceed if either fails.
2. **Self-review the branch diff** — Review all changes on the branch against the review checklist (code quality, error handling, production readiness, security, performance). If issues are found, fix them before proceeding.
3. **Verify acceptance criteria** — Read the issue's acceptance criteria. Confirm each Given/When/Then is met. Report pass/fail per criterion. Do not proceed if any criterion fails.
4. **Merge the feature branch** to main if not already done. If there are merge conflicts, stop and inform the user.
5. **Move the issue file** from `.issues/open/` to `.issues/closed/`.
6. **Update the Status field** to `Closed`.
7. **Add a closing note** at the bottom of the issue using the format below. Preserve any existing `## Progress` section — do not remove it.
8. **Update CHANGELOG.md** (if it exists) — Add an entry for this change under the "Unreleased" section. Use the issue type to determine the category (Feature → Added, Bug → Fixed, Improvement → Changed). Write in concise, user-facing language. If CHANGELOG.md doesn't exist, skip this step — do not create one.
9. **Check if README.md needs updating** — If this change affects project setup, commands, architecture, or usage, update README.md. If nothing changed that's documented in README, skip this step.
10. **Check if copilot-instructions.md needs updating** — If this change affects the tech stack, architecture, commands, file structure, or conventions documented in copilot-instructions.md, propose the changes to the user and wait for approval. Do not modify copilot-instructions.md without explicit approval.
11. **Commit all changes** (issue file move, changelog, any doc updates) following the project's commit message convention.
12. **Push main to the remote** — Use the terminal to run `git push` to ensure the merged code is on the remote.
13. **Delete the feature branch** locally and from the remote.

## Closing Note Format

```markdown
## Closing Note

**Completed:** YYYY-MM-DD
**Commit:** <hash> — <commit message>

### Implementation Summary
```

The implementation summary should describe what was actually built — verify against the code, not the original plan. Use bullet points.

If the issue is in `.issues/backlog/` instead of `.issues/open/`, move it from there.

If the branch was already merged, skip the merge step and proceed with the file move and closing note.
