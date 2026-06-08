# Delivery Governance Loop Design

## Goal

Add a portable design-to-GitHub governance loop to the Agentic Method Kit without binding it to a product repository, CI vendor, QA team, or specific AI agent.

## Scope

This design covers the reusable method layer only:

- design readiness before implementation
- development constraints during agent-assisted coding
- QA acceptance evidence when no dedicated QA role exists
- GitHub PR and CI governance before merge
- ratchet closeout when failures repeat

It does not define product-specific quality profiles, business smoke routes, Sonar rules, CodeQL policy, deployment gates, or repository-specific architecture checks.

## Design

The lifecycle has five gates:

1. Design Gate: the task has enough design context to start implementation.
2. Development Gate: the implementer knows the intended files, forbidden files, contracts, and verification expectations.
3. QA Acceptance Gate: the task has recorded command, runtime, browser, or human acceptance evidence, or an explicit gap.
4. GitHub Governance Gate: the PR identifies which gate failed when CI or review is red, instead of treating all failures as generic code cleanup.
5. Ratchet Closeout: repeated failures are classified into an owner layer and promotion decision.

The method stays lightweight by adding one `Delivery Governance` block to task packets, one review confirmation object, and one PR checklist section. Existing evidence, review, and failure-registry artifacts remain the join points.

## Boundaries

Portable method owns:

- lifecycle gate names
- minimum evidence expectations
- CI failure classification vocabulary
- failure promotion metadata

Consumer repositories own:

- actual CI jobs
- quality profile thresholds
- product-specific smoke tests
- release approvals
- business acceptance criteria

## Success Criteria

- A non-trivial task can be traced from design readiness to GitHub closeout.
- A PR can distinguish method-gate failures from repo-quality failures and flaky external failures.
- A repeated failure has owner-layer, occurrence-count, and promotion-decision metadata.
- The added rules remain small enough for multiple agents and repositories to adopt.
