# Harness Best Practice Hardening Design

## Goal

Harden the generic `harness-engineering` method layer so it behaves like a portable best-practice product rather than a partial framework.

This cut focuses only on the generic method surfaces:

- `agentic-method-kit/`
- workspace root `scripts/harness/`
- `agentic-repo-shell/`
- shared docs, examples, and CI

It does not expand Pantheon-specific overlay rules.

## Scope

### In Scope

- make `review artifact` a first-class portable closure object
- convert promotion/open-task rules from principles into executable policy documents
- add minimum generic `template health`, `runtime evidence`, and `docs link` governance
- make source-of-truth and mirror boundaries explicit
- upgrade examples from minimum-valid fixtures to method-evolution examples
- wire all new generic capabilities into tests, docs, CI, and method-health

### Out of Scope

- new Pantheon overlay business rules
- standalone repository cutover
- bash/sh bootstrap parity
- new business-domain-specific sensors

## Problems To Solve

### 1. Review Artifact Is Not Yet First-Class

The method model treats task packet, evidence, and review artifact as peer closure objects, but only task/evidence are fully operationalized.

Current gaps:

- `agentic-method-kit/scripts/check-review.mjs` exists only in the kit
- no adjacent test covers it
- root `scripts/harness/` and `agentic-repo-shell/scripts/harness/` do not expose it
- README and CI do not treat review validation as part of the standard loop

### 2. Promotion Rules Are Too Qualitative

`HOT-001` and `HOT-002` describe direction, but they do not yet define measurable promotion criteria robust enough for downstream repos.

### 3. Runtime Quality And Template Health Are Under-Mechanized

The coverage model names `runtime quality` as a core dimension and the taxonomy names `template health` as a periodic review concern, but the generic execution layer lacks corresponding lightweight checks.

### 4. Truth Source Versus Mirror Is Not Explicit Enough

The repository intentionally contains both:

- method source files in `agentic-method-kit/`
- repo-local projections in `docs/harness/`
- root `.agents/` for the distribution workspace itself
- `agentic-repo-shell/.agents/` for downstream bootstrap consumers

These are legitimate duplicates, but the maintenance contract is not explicit enough.

### 5. Examples Show Validity, Not Evolution

Current examples prove minimum file shape, but they do not yet show the ratchet loop or how template/runtime governance should evolve after failures.

### 6. Documentation Integrity Still Has A Blind Spot

Frontmatter governance exists, but there is no dedicated generic internal docs-link checker for Markdown references.

## Design

### A. First-Class Review Closure

Add a generic `check-review` execution path everywhere the other portable checks already live.

Required changes:

- keep `agentic-method-kit/scripts/check-review.mjs` as the portable source
- add `check-review.test.mjs`
- sync `check-review.mjs` into root `scripts/harness/`
- sync `check-review.mjs` into `agentic-repo-shell/scripts/harness/`
- document it in root and shell script READMEs
- include it in root validation commands and CI syntax/test/report flow
- include it in `check-method-health` required landing files

Expected outcome:

- non-trivial work has a machine-checkable review artifact, not just task/evidence linkage

### B. Policy Documents For Promotion And Task Classification

Add explicit generic policy docs and link them from existing contracts/playbooks/open tasks.

Required changes:

- add a visual evidence promotion policy with quantitative thresholds
- add a failure registry promotion policy with quantitative thresholds
- add a trivial vs non-trivial classification guide with a decision tree
- update `HARNESS_OPEN_TASKS.md`, `HARNESS_ENGINEERING_CONTRACT.md`, and `METHOD_PLAYBOOK.md` to point at those policies

Expected outcome:

- downstream adopters can decide when an advisory rule becomes a blocking gate without relying on maintainer intuition alone

### C. Minimum Template Health Check

Add a generic `check-template-health.mjs`.

Responsibilities:

- validate that a repo declaring the generic method surface carries the minimum files needed for template-oriented adoption
- verify presence of the core template docs and at least one template review artifact or template selection declaration
- remain generic and topology-focused, not Pantheon-specific

Mode:

- report-only by default
- strict mode available for repos that opt in

Expected outcome:

- template taxonomy becomes operational guidance instead of pure theory

### D. Minimum Runtime Evidence Check

Add a generic `check-runtime-evidence.mjs`.

Responsibilities:

- scan `.harness/evidence/**/commands.json`
- report when runtime-sensitive work lacks any runtime signal record
- accept at least one of:
  - runtime logs reference
  - metric reference
  - trace reference
  - performance reference
  - explicit documented runtime gap

Mode:

- report-only by default
- strict mode available

Expected outcome:

- `runtime quality` gains a lightweight generic sensor without overcommitting to any one observability stack

### E. Explicit Source-Of-Truth And Sync Rules

Document the maintenance contract for duplicated method surfaces.

Required changes:

- document `agentic-method-kit/` as method truth source
- document `docs/harness/` as repo-local contract projection
- document root `.agents/` as distribution-workspace adapter layer
- document `agentic-repo-shell/.agents/` as downstream starter adapter layer
- add a lightweight sync drift checker for key mirrored files

Expected outcome:

- duplication becomes governed mirroring rather than ambiguous duplication

### F. Method-Evolution Examples

Extend `agentic-method-kit/examples/` with two portable examples:

- ratchet loop example:
  - repeated failure
  - registry entry
  - resulting harness change
- runtime/template example:
  - task packet
  - evidence
  - review
  - runtime or template-health implications

Expected outcome:

- method users can copy not only valid artifacts, but valid upgrade patterns

### G. Internal Docs Link Checking

Add a generic `check-doc-links.mjs`.

Responsibilities:

- validate internal Markdown links in method and harness docs
- report missing relative targets
- stay repository-local; do not probe external URLs

Expected outcome:

- the documentation product gains a basic integrity gate without adding network dependencies

## File-Level Change Plan

### New Or Expanded Scripts

- `agentic-method-kit/scripts/check-review.mjs`
- `agentic-method-kit/scripts/check-review.test.mjs`
- `scripts/harness/check-review.mjs`
- `scripts/harness/check-review.test.mjs`
- `agentic-repo-shell/scripts/harness/check-review.mjs`
- `agentic-repo-shell/scripts/harness/check-review.test.mjs`
- `scripts/harness/check-template-health.mjs`
- `scripts/harness/check-template-health.test.mjs`
- `agentic-repo-shell/scripts/harness/check-template-health.mjs`
- `agentic-repo-shell/scripts/harness/check-template-health.test.mjs`
- `scripts/harness/check-runtime-evidence.mjs`
- `scripts/harness/check-runtime-evidence.test.mjs`
- `agentic-repo-shell/scripts/harness/check-runtime-evidence.mjs`
- `agentic-repo-shell/scripts/harness/check-runtime-evidence.test.mjs`
- `scripts/harness/check-doc-links.mjs`
- `scripts/harness/check-doc-links.test.mjs`
- `agentic-repo-shell/scripts/harness/check-doc-links.mjs`
- `agentic-repo-shell/scripts/harness/check-doc-links.test.mjs`
- `scripts/harness/check-sync-drift.mjs`
- `scripts/harness/check-sync-drift.test.mjs`
- `agentic-repo-shell/scripts/harness/check-sync-drift.mjs`
- `agentic-repo-shell/scripts/harness/check-sync-drift.test.mjs`

### Documentation Updates

- `README.md`
- `agentic-method-kit/README.md`
- `agentic-method-kit/METHOD_PLAYBOOK.md`
- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/HARNESS_METHOD_PLAYBOOK.md`
- `docs/harness/HARNESS_OPEN_TASKS.md`
- `scripts/harness/README.md`
- `agentic-repo-shell/scripts/harness/README.md`
- new generic policy docs under `docs/harness/`

### Example Updates

- `agentic-method-kit/examples/`
- possibly templates for review/runtime/template health where needed

### CI And Health Updates

- `.github/workflows/harness.yml`
- root `scripts/harness/check-method-health.mjs`
- `agentic-repo-shell/scripts/harness/check-method-health.mjs`

## Testing Strategy

All new behavior will be implemented TDD-first.

For each new or expanded checker:

1. write failing `node:test` coverage
2. run the focused test and confirm it fails for the expected reason
3. implement the minimum code
4. rerun focused tests until green
5. rerun the full harness test suite

Verification will include:

- `node --test scripts/harness/*.test.mjs`
- focused checker invocations in `--json` and `--strict` mode
- CI syntax coverage via `node --check`

## Risks And Controls

- Risk: over-expanding generic checks into business rules
  - Control: keep all new checks repo-shape and artifact-shape focused
- Risk: duplicated script maintenance across root and shell
  - Control: define and enforce sync drift rules
- Risk: noisy runtime/template checks
  - Control: advisory by default, strict only when explicitly enabled

## Success Criteria

This design is successful when:

- review artifacts are validated alongside task packets and evidence
- generic policy upgrades are quantifiable, not merely described
- runtime quality and template health have lightweight generic sensors
- mirrored docs/adapters have an explicit maintenance contract
- examples teach method evolution, not only minimum legality
- internal docs link integrity is mechanically checked
