# Harness Best Practice Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the generic harness-engineering method layer into a portable, mechanically verifiable best-practice package with synchronized Chinese and English documentation.

**Architecture:** Treat `agentic-method-kit/` as the portable method truth source, then project the required generic execution-layer assets into root `scripts/harness/`, `agentic-repo-shell/`, and `docs/harness/`. Add missing generic checks and policies with TDD-first implementation, then wire them into health checks, examples, and CI.

**Tech Stack:** Node.js 20+, `node:test`, Markdown docs, GitHub Actions, PowerShell workspace tooling

---

### Task 1: Add Portable Review Validation

**Files:**
- Create: `harness-engineering/agentic-method-kit/scripts/check-review.test.mjs`
- Create: `harness-engineering/scripts/harness/check-review.mjs`
- Create: `harness-engineering/scripts/harness/check-review.test.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-review.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-review.test.mjs`
- Modify: `harness-engineering/agentic-method-kit/scripts/check-review.mjs`

- [ ] **Step 1: Write failing portable review checker tests**
- [ ] **Step 2: Run focused review-checker tests and confirm failure**
- [ ] **Step 3: Implement the minimum portable review validation**
- [ ] **Step 4: Sync the script into root and repo-shell execution layers**
- [ ] **Step 5: Run focused review-checker tests and confirm pass**

### Task 2: Add Generic Template Health Check

**Files:**
- Create: `harness-engineering/scripts/harness/check-template-health.mjs`
- Create: `harness-engineering/scripts/harness/check-template-health.test.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-template-health.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-template-health.test.mjs`

- [ ] **Step 1: Write failing template-health tests**
- [ ] **Step 2: Run focused template-health tests and confirm failure**
- [ ] **Step 3: Implement the minimum generic template-health checker**
- [ ] **Step 4: Sync into repo-shell**
- [ ] **Step 5: Run focused template-health tests and confirm pass**

### Task 3: Add Generic Runtime Evidence Check

**Files:**
- Create: `harness-engineering/scripts/harness/check-runtime-evidence.mjs`
- Create: `harness-engineering/scripts/harness/check-runtime-evidence.test.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-runtime-evidence.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-runtime-evidence.test.mjs`

- [ ] **Step 1: Write failing runtime-evidence tests**
- [ ] **Step 2: Run focused runtime-evidence tests and confirm failure**
- [ ] **Step 3: Implement the minimum runtime-evidence checker**
- [ ] **Step 4: Sync into repo-shell**
- [ ] **Step 5: Run focused runtime-evidence tests and confirm pass**

### Task 4: Add Internal Docs Link Check

**Files:**
- Create: `harness-engineering/scripts/harness/check-doc-links.mjs`
- Create: `harness-engineering/scripts/harness/check-doc-links.test.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-doc-links.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-doc-links.test.mjs`

- [ ] **Step 1: Write failing docs-link tests**
- [ ] **Step 2: Run focused docs-link tests and confirm failure**
- [ ] **Step 3: Implement the internal Markdown link checker**
- [ ] **Step 4: Sync into repo-shell**
- [ ] **Step 5: Run focused docs-link tests and confirm pass**

### Task 5: Add Generic Sync Drift Check

**Files:**
- Create: `harness-engineering/scripts/harness/check-sync-drift.mjs`
- Create: `harness-engineering/scripts/harness/check-sync-drift.test.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-sync-drift.mjs`
- Create: `harness-engineering/agentic-repo-shell/scripts/harness/check-sync-drift.test.mjs`

- [ ] **Step 1: Write failing sync-drift tests**
- [ ] **Step 2: Run focused sync-drift tests and confirm failure**
- [ ] **Step 3: Implement the minimum key-file drift checker**
- [ ] **Step 4: Sync into repo-shell**
- [ ] **Step 5: Run focused sync-drift tests and confirm pass**

### Task 6: Strengthen Method Health And CI Integration

**Files:**
- Modify: `harness-engineering/scripts/harness/check-method-health.mjs`
- Modify: `harness-engineering/scripts/harness/check-method-health.test.mjs`
- Modify: `harness-engineering/agentic-repo-shell/scripts/harness/check-method-health.mjs`
- Modify: `harness-engineering/agentic-repo-shell/scripts/harness/check-method-health.test.mjs`
- Modify: `harness-engineering/.github/workflows/harness.yml`

- [ ] **Step 1: Write failing method-health expectations for new required generic checks**
- [ ] **Step 2: Run focused method-health tests and confirm failure**
- [ ] **Step 3: Update method-health required landing files**
- [ ] **Step 4: Update CI syntax/report/test flow**
- [ ] **Step 5: Run focused method-health tests and confirm pass**

### Task 7: Add Quantitative Generic Policies In Both Languages

**Files:**
- Create: `harness-engineering/docs/harness/TRIVIALITY_CLASSIFICATION_POLICY.md`
- Create: `harness-engineering/docs/harness/TRIVIALITY_CLASSIFICATION_POLICY.en.md`
- Create: `harness-engineering/docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.md`
- Create: `harness-engineering/docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.en.md`
- Create: `harness-engineering/docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.md`
- Create: `harness-engineering/docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.en.md`
- Modify: `harness-engineering/docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- Modify: `harness-engineering/docs/harness/HARNESS_ENGINEERING_CONTRACT.en.md`
- Modify: `harness-engineering/docs/harness/HARNESS_OPEN_TASKS.md`
- Modify: `harness-engineering/agentic-method-kit/METHOD_PLAYBOOK.md`
- Modify: `harness-engineering/agentic-method-kit/METHOD_PLAYBOOK.zh.md`
- Modify: `harness-engineering/docs/harness/HARNESS_METHOD_PLAYBOOK.md`
- Modify: `harness-engineering/docs/harness/HARNESS_METHOD_PLAYBOOK.en.md`

- [ ] **Step 1: Draft bilingual policy docs with explicit thresholds**
- [ ] **Step 2: Update contract and playbook links in both languages**
- [ ] **Step 3: Update open tasks to reference policy docs**
- [ ] **Step 4: Review for CN/EN semantic consistency**

### Task 8: Document Canonical Source And Sync Rules In Both Languages

**Files:**
- Modify: `harness-engineering/README.md`
- Modify: `harness-engineering/README.zh.md`
- Modify: `harness-engineering/agentic-method-kit/README.md`
- Modify: `harness-engineering/agentic-method-kit/README.zh.md`
- Modify: `harness-engineering/docs/README.md`
- Modify: `harness-engineering/docs/README.zh.md`
- Modify: `harness-engineering/scripts/harness/README.md`
- Modify: `harness-engineering/scripts/harness/README.zh.md`
- Modify: `harness-engineering/agentic-repo-shell/scripts/harness/README.md`
- Modify: `harness-engineering/agentic-repo-shell/scripts/harness/README.zh.md`

- [ ] **Step 1: Add canonical-source and projection-layer guidance in English**
- [ ] **Step 2: Add matching Chinese guidance**
- [ ] **Step 3: Add new checker entries and commands in both languages**
- [ ] **Step 4: Review for bilingual completeness**

### Task 9: Upgrade Portable Examples

**Files:**
- Create: `harness-engineering/agentic-method-kit/examples/ratchet-loop/README.md`
- Create: `harness-engineering/agentic-method-kit/examples/ratchet-loop/README.zh.md`
- Create: `harness-engineering/agentic-method-kit/examples/runtime-template/README.md`
- Create: `harness-engineering/agentic-method-kit/examples/runtime-template/README.zh.md`
- Add any minimum fixture files required under those example directories

- [ ] **Step 1: Create ratchet-loop example files**
- [ ] **Step 2: Create runtime/template example files**
- [ ] **Step 3: Check that example references match actual policy/checker names**
- [ ] **Step 4: Review bilingual completeness**

### Task 10: Full Verification

**Files:**
- Modify only if verification reveals defects

- [ ] **Step 1: Run focused tests for each new checker**
- [ ] **Step 2: Run `node --test scripts/harness/*.test.mjs`**
- [ ] **Step 3: Run `node --test agentic-repo-shell/scripts/harness/*.test.mjs`**
- [ ] **Step 4: Run key strict checks on the workspace**
- [ ] **Step 5: Record any residual gaps honestly**
