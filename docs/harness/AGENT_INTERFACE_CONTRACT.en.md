# Agent Interface Contract

Chinese version: [AGENT_INTERFACE_CONTRACT.md](./AGENT_INTERFACE_CONTRACT.md)

Type: Contract
Layer: platform
Status: Active

This document defines the input, output, and behavior protocol for any agent or human engineer entering a Pantheon repository. Tools may differ, but the protocol must remain consistent.

## 1. Capabilities Every Agent Must Provide

A qualified executor must be able to:

- read repository documents and source code
- determine the ownership layer of the task
- respect workspace/base/business inheritance boundaries
- keep file changes narrowly scoped
- run verification commands or explicitly state why they cannot be run
- save or summarize verification evidence
- produce review output or handoff notes in a findings-first format

Any tool that cannot meet these requirements may only be used for assisted reading, drafting, or localized suggestions. It must not execute development tasks independently.

## 2. Required Task Start Output

Before starting any non-trivial task, the executor must provide:

```text
Primary layer:
Dependency layers:
Contract anchors:
Expected touched areas:
Verification plan:
Human gates:
```

Example:

```text
Primary layer: system/iam
Dependency layers: platform
Contract anchors:
- pantheon-base/docs/contracts/SYSTEM_IAM_CONTRACT.md
- pantheon-base/docs/designs/PERMISSION_MODEL.md
Expected touched areas:
- backend/modules/system/iam/role
- frontend/src/modules/system/role
Verification plan:
- go test ./backend/modules/system/iam/...
- cd frontend && npm run check:menu-contract && npm run build
Human gates:
- none unless permission seed changes
```

## 3. Pre-Modification Checks

Before modifying code or docs, the executor must evaluate whether the change affects:

- schema / migration / seed
- API contract
- permission
- menu
- i18n
- audit
- security
- business/base inheritance
- generated files
- CI or deploy gates

If any of these are affected, the corresponding documents and verification commands must be brought into scope.

## 4. Context Reading Rules

Executors must not use “I did not read the relevant contract” as a reason to ignore repository constraints.

Reading rules:

- read only the contracts, designs, and acceptance docs relevant to the task
- do not paste long document excerpts into chat context
- for long docs, extract only the hard constraints relevant to the current task
- if documentation conflicts are found, stop and explain the conflict instead of choosing the convenient version

## 5. File Modification Rules

Executors must:

- follow the existing directory structure and module boundaries
- avoid touching unrelated files
- avoid large file reshuffles that create noisy diffs
- not delete files the user did not ask to delete
- not overwrite user-owned uncommitted changes
- not copy base rules into business repositories

When a platform or system bug is discovered in a business repository, first determine whether it should be fixed in `pantheon-base`.

## 6. Verification Output

Before the task is complete, the executor must output:

```text
Commands run:
- <command>: passed / failed / not run

Evidence:
- <path or summary>

Known gaps:
- <gap or none>
```

If verification was not run, a concrete reason must be given:

- dependencies not installed
- required services missing from the environment
- network or permission access required
- the current task is documentation-only
- the user explicitly requested no verification

## 7. Review Output

Reviews must be findings first:

```text
[P0|P1|P2] (confidence: N/10) file:line - issue
Impact:
Fix:
Verification:
```

If no issues are found, the output must state:

```text
No P0/P1/P2 findings found.
Residual risk:
Verification checked:
```

## 8. Prohibited Behavior

Executors must not:

- skip repository protocol because a tool does not support some capability
- treat the chat transcript as the only source of requirements
- replace verification evidence with “it looks fine”
- rewrite base contracts inside a business repository
- defer permission, menu, i18n, or audit concerns as a later patch
- reduce test coverage or remove checks just to make tests pass

