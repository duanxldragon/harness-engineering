# Delivery Governance Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a lightweight, portable governance loop from design through development, QA acceptance, GitHub PR governance, and ratchet closeout.

**Architecture:** Keep the existing task packet, evidence, review, PR template, and failure registry as the stable artifacts. Add one lifecycle document and small metadata extensions instead of introducing a new workflow engine or repo-specific policy.

**Tech Stack:** Markdown, JSON schemas, Node.js harness checks, GitHub PR templates

---

### Task 1: Add Portable Governance Policy

**Files:**
- Create: `agentic-method-kit/DESIGN_DEV_QA_GITHUB_GOVERNANCE.md`
- Create: `agentic-method-kit/DESIGN_DEV_QA_GITHUB_GOVERNANCE.zh.md`
- Modify: `agentic-method-kit/README.md`
- Modify: `agentic-method-kit/README.zh.md`
- Modify: `agentic-method-kit/METHOD_PLAYBOOK.md`
- Modify: `agentic-method-kit/METHOD_PLAYBOOK.zh.md`

- [ ] **Step 1: Define the five gates and their entry/exit rules.**
- [ ] **Step 2: State what belongs in the portable method versus the consumer repository.**
- [ ] **Step 3: Link the policy from README and playbook files.**

### Task 2: Add Minimum Gate Metadata

**Files:**
- Modify: `agentic-method-kit/templates/task-packet.template.md`
- Modify: `agentic-method-kit/schemas/task-packet.schema.json`
- Modify: `agentic-method-kit/scripts/check-task-packet.mjs`
- Modify: `agentic-method-kit/scripts/check-task-packet.test.mjs`
- Modify: `agentic-method-kit/examples/minimal-repo/docs/harness/tasks/example.task.md`

- [ ] **Step 1: Add a small `Delivery Governance` block to task packets.**
- [ ] **Step 2: Require the block in schema and Markdown checks.**
- [ ] **Step 3: Update the minimal fixture and regression tests.**

### Task 3: Confirm Governance During Review And PR

**Files:**
- Modify: `agentic-method-kit/templates/review.template.md`
- Modify: `agentic-method-kit/schemas/review-artifact.schema.json`
- Modify: `agentic-method-kit/scripts/check-review.mjs`
- Modify: `agentic-method-kit/scripts/check-review.test.mjs`
- Modify: `agentic-method-kit/examples/minimal-repo/.harness/evidence/example/review.md`
- Modify: `agentic-method-kit/templates/pr-template.md`

- [ ] **Step 1: Add review confirmation for design, development, QA, and GitHub governance.**
- [ ] **Step 2: Add PR checklist items for gate classification and merge readiness.**
- [ ] **Step 3: Keep the PR template vendor-neutral.**

### Task 4: Extend Failure Registry Promotion Metadata

**Files:**
- Modify: `agentic-method-kit/schemas/failure-registry.schema.json`
- Modify: `agentic-method-kit/templates/failure-registry.template.md`
- Modify: `agentic-method-kit/templates/harness-coverage-review.template.md`
- Modify: `agentic-method-kit/UPGRADE.md`
- Modify: `agentic-method-kit/UPGRADE.zh.md`
- Modify: `agentic-method-kit/CHANGELOG.md`
- Modify: `agentic-method-kit/CHANGELOG.zh.md`

- [ ] **Step 1: Add occurrence count, owner layer, promotion decision, promotion deadline, and GitHub signal fields.**
- [ ] **Step 2: Update templates so repeated failures cannot stay invisible.**
- [ ] **Step 3: Document migration guidance.**

### Task 5: Verify

**Files:**
- Modify only if validation reveals defects.

- [ ] **Step 1: Run task-packet and review tests.**
- [ ] **Step 2: Run minimal-repo task, evidence, and review checks.**
- [ ] **Step 3: Run method-health check.**
- [ ] **Step 4: Run `git diff --check`.**
