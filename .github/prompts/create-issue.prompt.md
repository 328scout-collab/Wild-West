# Create Issue

User is mid-development and thought of a bug/feature/improvement. Capture it fast so they can keep working.

## Initial Context

If the user provided a description in their message, use that as the starting point. If not, ask them what they want to capture.

## Your Goal

Create a complete issue file in `.issues/open/` using the naming convention `NNN-kebab-case-title.md` (next sequential number — check `.issues/` to find the highest existing number).

**Do not create the file until you have enough information to fill every section meaningfully.** Ask questions first, then write. Once you have enough, summarize your understanding briefly and create the file — don't ask for permission to write it.

**Before creating, check for duplicates** — scan `.issues/open/` and `.issues/backlog/` for existing issues that overlap with this one. If a similar issue exists, inform the user and ask whether to create a new issue, update the existing one, or skip.

## Issue Template

```markdown
# NNN: Title

**Type:** [Feature/Bug/Improvement]
**Priority:** [Normal/High/Low]
**Effort:** [Small/Medium/Large]
**Status:** Open

## TL;DR

## Why

## Current State

## Expected Outcome

## Acceptance Criteria

## Constraints
```

## Field Guidance

Use these to calibrate depth and quality for each section. Do not include guidance text in the generated issue — replace all fields with actual content.

**TL;DR** — One-paragraph summary.

**Why** — What problem does it solve, what user pain does it address, or what does it unblock?
> Good: "Players abandon runs when they feel stuck — this gives a comeback mechanic that keeps sessions going."
> Bad: "Would be nice to have."

**Current State** — What the user sees, does, or experiences today. For bugs: the broken behavior. For features: the gap or workaround. Describe from the user's perspective, not the code.

**Expected Outcome** — How the user's experience changes after this is done. Paint the end state — what they see, what they can do that they couldn't before. Focus on experience, not implementation.

**Acceptance Criteria** — Use Given/When/Then format.
> Good: "Given the user has 500 coins, when they purchase a power-up costing 300, then their balance shows 200 and the power-up is equipped."
> Bad: "Shop works correctly."

**Constraints** — Dependencies on other issues, backward compatibility concerns, or known technical limitations. Omit this section from the issue if none apply.

## How to Get There

**Search for context** only when the description is vague or you need to understand current behavior to ask better questions. If the user's description is already clear, go straight to questions.

**Ask questions** to fill gaps — be concise, respect the user's time. They're mid-flow and want to capture this quickly. Usually need:
- What's the issue/feature (if not provided)
- **Why** it matters — dig into motivation, not just mechanics. "Why" reveals the real requirement behind the surface request.
- Current behavior vs desired behavior
- Type (bug/feature/improvement) and priority if not obvious

Keep questions brief. One focused message beats multiple back-and-forths. Ask as many questions as needed to fill gaps — but skip anything the user already made clear.

**Skip what's obvious** — If it's a straightforward bug, don't over-research. If type/priority is clear from description, don't ask.

## Behavior Rules

- Be conversational — ask what makes sense, not a checklist
- Default priority: normal, effort: medium (ask only if unclear)
- Bullet points over paragraphs
