# Inheritance Harness Protocol

Chinese version: [INHERITANCE_HARNESS_PROTOCOL.md](./INHERITANCE_HARNESS_PROTOCOL.md)

Type: Contract
Layer: platform
Status: Active

This document defines the Harness Engineering protocol between `pantheon-base` and derived business repositories.

## 1. Authority Boundaries

- `pantheon-base` is the only authority for `platform` and `system/*`.
- Business repositories such as `pantheon-ops` own only `business/*` designs, code, and acceptance.
- Business repositories must not copy or rewrite base contracts to change foundation semantics.

## 2. Change Ownership Decisions

When an issue is found in a business repository, determine first:

| Issue Type | Default Landing Place |
|---|---|
| platform shell, navigation, workbench | `pantheon-base` |
| auth, iam, org, config | `pantheon-base` |
| shared permissions, menus, i18n, audit capabilities | `pantheon-base` |
| CMDB, Deploy, and similar business behavior | `pantheon-ops` |
| business-module mount points | base exposes extension APIs, business repo registers into them |

## 3. Drift Categories

Drift scanning must distinguish at least:

- pseudo-drift: module-name or path difference with no real logic difference
- business mount: a legitimate mount point owned by the business repository
- generic drift: reusable foundation enhancement discovered in the business repository and expected to flow back into base
- business-specific drift: real business logic that should remain in business
- noise: low-risk differences such as newlines, fixtures, or service names

## 4. Drift Handling Order

1. scan and classify first
2. backport generic drift into `pantheon-base` first
3. after base is merged, upgrade the inherited version in the business repository
4. converge pseudo-drift through workspace sharing, replacement, extension APIs, or override deletion
5. every convergence step must retain verification evidence

## 5. Human Gates

The following operations require human confirmation:

- deleting an inherited-file override from a business repository
- modifying a base contract or foundation extension API
- flowing real business logic back into base
- changing the base version in `docs/PROJECT_INHERITANCE.md`

## 6. Agent Requirements

When working in a derived repository, the agent must explain:

```text
Is this base-owned or business-owned?
If base-owned, why is the change happening here?
If business-owned, which business contract anchors it?
Does this create or resolve drift?
```

