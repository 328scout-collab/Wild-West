# AI Workflow Guide

Setup instructions and workflow reference for AI-assisted development using GitHub Copilot.

## Repository Structure

```
your-project/
├── .github/
│   ├── copilot-instructions.md      # Copilot project context (from template)
│   └── prompts/                     # Copilot prompts
│       ├── plan.prompt.md
│       ├── create-issue.prompt.md
│       ├── implement.prompt.md
│       ├── review.prompt.md
│       ├── close-issue.prompt.md
│       ├── peer-review.prompt.md
│       ├── document.prompt.md
|       ├── solve.prompt.md
│       └── learn.prompt.md
└── .issues/                         # File-based issue tracking
    ├── open/
    ├── closed/
    └── backlog/
```

## Setup

### GitHub Copilot

1. Copy the `.github/prompts/` directory into your project (create `.github/` if it doesn't exist).
2. Copy `copilot-instructions.template.md` into `.github/` and rename it to `copilot-instructions.md`.
3. Fill in every section of `copilot-instructions.md` with your project's details. Replace all `[bracketed]` placeholders.
4. Remove the "Why" notes and the HTML comment block at the top when done.

Copilot auto-loads `copilot-instructions.md` every chat session. The prompts are available in VS Code's Copilot chat prompt picker.

### .gitignore

The included `.gitignore` covers universal entries (OS artifacts, editor files, secrets, Windows NTFS/DLP files). Add language and framework-specific entries for your project (e.g., `node_modules/`, `__pycache__/`, `target/`).

### CHANGELOG (optional)

If you want the workflow to maintain a changelog, create a `CHANGELOG.md` in your project root using [Keep a Changelog](https://keepachangelog.com/) format. The close-issue and solve commands will update it automatically. If no `CHANGELOG.md` exists, they skip this step.

### Issue Tracking (both platforms)

Create the `.issues/` directory structure in your project root:

```
.issues/
├── open/       # Active work
├── closed/     # Completed issues
└── backlog/    # Future work
```

Issues are markdown files named `NNN-kebab-case-title.md` with sequential numbering.

## Workflow

Two modes, depending on how much structure your project needs. All commands/prompts work identically across platforms.

### Lightweight mode: solve

A single command for the entire cycle — investigate, implement, verify, and deliver. No issue files, no separate review step. Git history is the record.

| Copilot | Purpose |
|---------|---------|
| solve | End-to-end: understand, implement, test, commit, merge |

**Best for:** small projects, quick fixes, single-file changes, or any work where issue tracking is overhead.

**Typical flow:**
1. Describe what you want or what's broken.
2. The AI investigates, proposes a plan, and waits for confirmation.
3. Implements, tests, merges, and reports back.

### Issue-tracked mode: plan → implement → review → close

A structured workflow with file-based issue tracking, acceptance criteria, and separate review steps.

| Step | Copilot | Purpose |
|------|---------|---------|
| 0 | plan | Decompose a big idea into sequenced, dependency-aware issues |
| 1 | create-issue | Capture a single bug, feature, or improvement |
| 2 | implement | Pick up an issue and build it end-to-end |
| 3 | review | Review changes before closing |
| 4 | close-issue | Merge, update docs, close the issue |

**Best for:** multi-issue features, team projects, or any work where you want tracked progress and formal acceptance criteria.

**For big ideas** (new projects, complex features, major refactors):
1. **Plan** — Brainstorm with the AI through deep requirements gathering. The AI decomposes the idea into sequenced issues with dependencies, then creates them after your approval.
2. **Implement each issue** in dependency order — pick the next issue with no unmet dependencies and run implement.
3. **Review and close** each issue as it's completed.

**For single items** (one bug, one small feature, one improvement):
1. **Create an issue** — Describe what you want. The AI asks clarifying questions and writes a complete issue file with acceptance criteria.
2. **Implement the issue** — The AI reads the issue, explores the codebase, creates a branch, implements the change, self-reviews, and reports back with pass/fail on each acceptance criterion.
3. **Review the changes** — The AI reviews the branch diff against code standards and acceptance criteria. No code is edited during review.
4. **Close the issue** — The AI verifies build/lint pass, merges to main, moves the issue to closed, updates the changelog, and cleans up the branch.

### Supporting commands (use with either mode):

| Copilot | Purpose |
|---------|---------|
| peer-review | Assess findings from an external reviewer |
| document | Review documentation for drift and gaps |
| learn | Explain a concept using the current codebase |

## Key Concepts

**Project context file** — `copilot-instructions.md` is the most important file in the workflow. It tells the AI about your tech stack, architecture, code standards, and conventions. A vague context file produces vague code. A specific one produces code that follows your project's patterns.

**Acceptance criteria** — Issues use Given/When/Then format. These criteria flow through the entire workflow: implement verifies them, review checks them, close-issue confirms them before merging. They're the single source of truth for "is this done?"

**Self-review** — The implement and close-issue commands include self-review steps. The AI reviews its own changes against the same checklist used for code review before presenting work as complete.

**Progress tracking** — During implementation, the AI updates a `## Progress` section in the issue file. This persists across sessions, so work can resume if a session ends.

**Context maintenance** — The project context file is a living document, not a one-time setup. When the AI misunderstands a term, re-proposes a rejected approach, or puts code in the wrong place, that's a signal to add a line. The file accumulates the project knowledge that actually matters through use, not upfront planning.
