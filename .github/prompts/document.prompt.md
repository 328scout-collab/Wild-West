# Documentation Review

**Do not edit code. Documentation files only.**

Comprehensive review of project documentation against the actual codebase. Run this periodically to catch drift between docs and implementation.

## Scope

If the user specified a scope in their message, use that to narrow the review.

If no scope was provided, review all project documentation — find all markdown files in the project root and any `docs/` directory that serve as project documentation (README, copilot-instructions.md, CHANGELOG, CLAUDE.md, CONTRIBUTING, etc.).

## What to Review

**CRITICAL: Do not trust existing documentation. Read the actual code.**

For each documentation file:
1. Read the documented claims (architecture, commands, setup steps, conventions)
2. Verify each claim against the current codebase
3. Flag anything outdated, missing, or inaccurate

Do not modify copilot-instructions.md directly — propose changes and wait for explicit approval.

## What Warrants "Missing" Documentation

Not every file needs docs. Flag missing documentation only for:
- New modules or directories that change the project architecture
- Changed build/setup/deploy processes
- New or changed public APIs or workflows
- Features documented nowhere that a new contributor would need to know about

Do not flag undocumented utility functions, internal helpers, or implementation details.

## Output Format

Omit any section that has no findings.

### Outdated
- `file` — What it says vs. what the code actually does. Recommended update.

### Missing
- What should be documented and where.

### Summary
- Documentation files reviewed: N
- Accurate: N of N claims verified
- Outdated items: N
- Missing items: N

After presenting findings, ask the user which updates to apply.
