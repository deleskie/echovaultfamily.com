# Agent Task: EchoVault Capture Page Redesign (Grandma-Simple)

## Role
You are a senior product + UX + frontend agent working on EchoVault.
Your job is to produce a **clear, implementation-ready Markdown spec**
for redesigning the `/capture` page to be **grandma-friendly, calm, and trust-forward**
without removing power features.

You are NOT rewriting backend logic.
You are restructuring UI, layout, copy, and visibility.

---

## Inputs You Should Assume
- Frontend is React (component-based)
- Existing capture pipeline, transcription, calibration, and session logic stay intact
- Current `/capture` page includes:
  - Health checks (backend/env/db/storage)
  - Vault selection
  - Anchors
  - Role selection
  - Mic + calibration
  - Debug / coverage / session controls
  - Recorder + typing paths
  - Excessive help icons (`?`)
- The current page is visually overwhelming and causes screen bounce

---

## Core Problems to Solve
1. Page is not grandma-friendly (nor mom-friendly)
2. Too many visible controls at once
3. Excessive tooltip icons create “button soup”
4. Prompt and recorder are far apart causing scroll jump
5. Calibration blocks recording unnecessarily
6. Power features are mixed with storyteller flow

---

## High-Level Solution
### A. Two Explicit Modes
- **Storyteller Mode (default)**
- **Admin / Producer Mode (gated)**

Storytellers see *only what is needed to answer the next question*.
Admins retain full control, diagnostics, and tuning.

---

## Deliverable 1: Information Architecture (IA)

### Storyteller Mode (Default)
Visible elements ONLY:
- Header
  - EchoVault logo
  - Language selector
  - Single “Need help?” button
- Session summary
  - Session name
  - Progress (Q X of Y)
  - Time recorded
- Main Capture Card (sticky)
  - Prompt
  - Record button
  - Timer
  - Stop / Reset
  - Single status line (human language)
  - “Type instead” (collapsed)
- Navigation
  - None (or one “Exit session”)

Hidden:
- Health checks
- Vault selector
- Anchors
- Roles
- Calibration controls
- Coverage/debug panels
- Session admin buttons
- Micro/proxy typing
- Internal states (upload idle, follow-up ready, etc.)

---

### Admin / Producer Mode (Gated)
Accessible via one of:
- `/capture?mode=admin` + role check
- Long-press logo (3s) + role check
- Keyboard shortcut (Ctrl+Shift+A)

Contains:
- Health checks (backend/env/db/storage)
- Vault selector + logout
- Photo anchors
- Primary role
- Mic source + headphone toggle
- Calibration (optional)
- Coverage panel
- Debug states
- Session actions (finish, skip, clear)
- Micro typing + proxy typing
- All help text and diagnostics

---

## Deliverable 2: Layout Specification

### Main Capture Card (Critical)
Create ONE stable container that never causes scroll jump.

Structure:
- Prompt block (min-height enforced)
- Recorder controls (always visible)
- Reserved status line (text changes only, no layout changes)
- Optional “Type instead” accordion

Rules:
- Prompt block has fixed min-height (e.g., 180–220px)
- Status updates NEVER add/remove rows
- Recorder never moves relative to prompt

This eliminates screen bounce.

---

## Deliverable 3: Flow Redesign

### Step 0: Gentle Safety Cue (inline)
Displayed once per session:
- “No rush. You can stop anytime.”
- “Private by default. Nothing is shared without permission.”

### Step 1: Capture
- Record button enabled immediately after mic permission
- Calibration does NOT block recording
- If audio quality is poor, suggest calibration after first attempt

### Step 2: Review / Continue
- After answer:
  - “Saved ✓”
  - “Next question” button
  - Optional playback if available

---

## Deliverable 4: Tooltip & Help System Redesign

### Goal
Eliminate “1000 tiny ? buttons”.

### Rules
1. **No standalone `?` icons in Storyteller Mode**
2. Replace with ONE of the following:

#### Pattern A: Inline Helper Text (Preferred)
Always visible, muted text under labels.

Example:
> Add photos (optional)  
> Helps personalize questions.

#### Pattern B: “Learn more” Text Link
Used sparingly. Opens modal.

Example:
> Calibration (optional) — Learn more

#### Pattern C: Section-Level Help
One help affordance per section header.

Example:
> Recording setup [Help]

---

### Tooltip Scope Rules
- Tooltips may exist **only in Admin Mode**
- One per section max
- No icon-only affordances next to every field

---

## Deliverable 5: Copy Simplification

Replace technical language in Storyteller Mode:

- “Photo anchors” → “Add photos (optional)”
- “Primary role” → removed from capture flow
- “Calibration recording” → “Quick sound check (optional)”
- “Typed answer (micro style)” → hidden (Admin only)
- “Proxy typed — lower weight” → Admin only

---

## Deliverable 6: State Model

### Single Human Status Line
Examples:
- Ready
- Listening…
- Uploading…
- Transcribing…
- Saved ✓

No internal machine state exposed in Storyteller Mode.

---

## Deliverable 7: Acceptance Criteria

### Storyteller Mode
- User understands what to do in < 5 seconds
- One primary CTA: Record
- No visible debug data
- Max 1 help button on screen
- No layout shift during recording

### Admin Mode
- All existing controls remain accessible
- Help icons reduced by >70%
- Tooltips consolidated to sections

---

## Final Output Instructions
Produce a **single Markdown document** containing:
1. IA diagrams (textual)
2. Layout rules
3. Mode gating rules
4. Tooltip replacement rules
5. Copy changes
6. Acceptance criteria

Do NOT:
- Write React code
- Modify backend behavior
- Add new features

Your output should be directly usable as:
- A design spec
- A Jira epic
- A handoff document to frontend engineering

