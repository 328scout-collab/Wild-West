# Peer Review Assessment

**This is an assessment only. Do not edit any code.**

An external reviewer has provided findings about the codebase. You have full context on this project's history and decisions — don't accept findings at face value. The reviewer may have less context than you.

## Findings

If the user provided findings in their message, use those. If the message appears to be a file path, read the file to get the findings. If no findings were provided, ask the user to provide them.

## For Each Finding

1. **Verify it exists** — Actually check the code. Does this issue really exist at the referenced location?
2. **If it doesn't exist** — Explain clearly why (maybe it's already handled, or they misunderstood the architecture)
3. **If it does exist** — Assess severity and add to your action plan.

## Output

Omit any section that has no findings.

### Valid Findings
- Finding: description — Severity: level — Action: what to do

### Invalid Findings
- Finding: description — Why it's not actually an issue

### Action Plan
Prioritized list of confirmed issues, organized by:
- **Phase 1: Quick Wins** — immediate, low-risk fixes
- **Phase 2: Deferred** — medium priority, next sprint
- **Phase 3: Architectural** — larger changes for future consideration

For Phase 2 and Phase 3 items, ask the user if they'd like to create issues to track them. If approved, follow the create-issue prompt's template and conventions — you already have the content from your assessment, so populate the issue directly without re-asking questions.

## Severity Levels
- **CRITICAL** — Security, data loss, crashes
- **HIGH** — Bugs, performance issues, bad UX
- **MEDIUM** — Code quality, maintainability
- **LOW** — Style, minor improvements
