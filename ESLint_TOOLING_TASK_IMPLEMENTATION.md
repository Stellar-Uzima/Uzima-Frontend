# ESLint Tooling Task Implementation Record

## Document Status

**Status:** Repository investigation completed; dependency remediation remains pending

**Task area:** Chore, build, and tooling

**Priority:** P2

**Scope:** Restore a reliable clean-install lint workflow without changing application behavior

## Project Context

Stellar Uzima is a Next.js App Router and TypeScript health and wellness platform. The application combines:

- A traditional healer directory and consultation flows
- Community and knowledge-sharing features
- User health tasks and XLM reward tracking
- Stellar wallet connection and disconnection APIs
- Administrative dashboards for users, tasks, healers, and verification
- Progressive Web App support, offline pages, and an offline task queue

The main application is under `app/`, reusable UI is under `components/`, shared browser and server utilities are under `hooks/` and `lib/`, and PWA behavior is configured in `next.config.mjs`.

This task is intentionally limited to the development-tooling layer. No product functionality, blockchain behavior, API behavior, or UI behavior should be changed as part of the lint fix.

## Original Task Description

The reported issue states that a clean install fails when running `npm run lint` with a circular JSON exception from ESLint's configuration validation path:

```text
TypeError: Converting circular structure to JSON
--> starting at object with constructor 'Object'
...
property 'plugins' -> object with constructor 'Object'
--- property 'react' closes the circle
```

The reported environment was:

- ESLint `9.39.5`
- `eslint-config-next` `16.3.2`
- `eslint-plugin-react` `7.37.5`
- `eslint-plugin-react-hooks` `7.1.1`
- Next.js `16.1.6`

The required outcome is that a fresh clone can run `npm install` followed by `npm run lint` without the circular JSON crash. Lint may report genuine source issues, but it must start and complete normally.

## Investigation Performed

### Repository state

The current checkout contains this lint script in `package.json`:

```json
"lint": "eslint ."
```

However, the current checkout does **not** contain:

- A root `eslint.config.mjs`
- An `.eslintrc.*` configuration file
- A direct `eslint` dependency
- A direct `eslint-config-next` dependency
- Direct `eslint-plugin-react` or `eslint-plugin-react-hooks` dependencies

The lockfile also does not contain an installed ESLint package. Its only matching entries are transitive references to `eslint-scope`, not the ESLint CLI or Next.js ESLint configuration.

### Baseline command

The current lint command was executed from the repository root:

```text
npm run lint
```

Current result:

```text
> my-project@0.1.0 lint
> eslint .

'eslint' is not recognized as an internal or external command,
operable program or batch file.

Command exited with code 1
```

This means the supplied circular-JSON failure cannot currently be reproduced from this checkout. The command fails earlier because the lint toolchain is absent from the declared dependency graph.

### Dependency history

Recent history for `package.json` and `package-lock.json` does not show an ESLint configuration or ESLint dependency being added. The latest inspected dependency-related commit retains the `eslint .` script but does not declare ESLint packages.

### Upstream compatibility check

npm metadata was queried for the reported `eslint-config-next` version:

```text
npm view eslint-config-next@16.3.2 peerDependencies version
```

The returned peer requirement is:

```text
peerDependencies = { eslint: '>=9.0.0', typescript: '>=3.3.1' }
version = '16.3.2'
```

Therefore, ESLint `9.39.5` satisfies the declared ESLint peer range for `eslint-config-next@16.3.2`. The pairing is not formally rejected by the published peer dependency range. The reported circular JSON error is more consistent with an incompatibility in flat-config composition or a hidden configuration-validation error than with an ordinary peer-dependency conflict.

## Findings

1. The requested incident describes a dependency/configuration state that is not present in this checkout.
2. The current root cause for `npm run lint` is that ESLint is not declared or installed.
3. The current package metadata does not provide enough evidence to select a safe ESLint pin for the reported circular JSON incident.
4. Adding a guessed version pin alone would be incomplete because ESLint also needs an explicit flat configuration compatible with Next.js 16.
5. The repository uses Next.js `16.1.6`, React `19.2.4`, and TypeScript `5.7.3`; any final lint configuration must preserve compatibility with that stack.

## Changes Made

No application or dependency files were changed during this investigation.

This document is the only artifact added for the current task update. In particular, the following files were intentionally left unchanged:

- `package.json`
- `package-lock.json`
- `pnpm-lock.yaml`
- `next.config.mjs`
- Application and component source files

This distinction is important because the reported acceptance criteria require a tested dependency/configuration change, while the current checkout first requires the intended lint setup to be established or restored.

## Intended Implementation Path

The eventual implementation should follow these steps:

1. Confirm whether the expected branch should include the reported flat configuration and ESLint packages.
2. Add compatible direct development dependencies for `eslint`, `eslint-config-next`, and any plugins explicitly used by the chosen configuration.
3. Add or restore a root `eslint.config.mjs` using the Next.js flat-config export or a supported compatibility adapter.
4. Avoid wrapping plugin objects in a way that causes them to become self-referential during ESLint configuration validation.
5. Regenerate the npm lockfile from a clean dependency state.
6. Run lint and capture any real source-level findings separately from configuration failures.
7. Re-run the exact clean-install workflow in the acceptance criteria.

The version choice should be based on the actual configuration and lockfile being introduced. The upstream result currently supports ESLint 9 generally for `eslint-config-next@16.3.2`, so downgrading ESLint should not be done without reproducing the reported failure in the intended dependency state.

## Verification Matrix

| Check | Current result | Notes |
|---|---:|---|
| Project purpose and architecture reviewed | Pass | Next.js health, healer, community, rewards, wallet, admin, and PWA platform confirmed |
| `npm run lint` starts | Fail | ESLint executable is not installed or declared |
| Circular JSON error reproduced | Not reproducible | Current checkout fails before ESLint starts |
| `eslint-config-next@16.3.2` peer requirement checked | Pass | Requires `eslint >=9.0.0` |
| Dependency fix implemented | Pending | Requires reconciliation with the intended lint configuration/state |
| Lockfile regenerated | Pending | No dependency changes were made |
| Fresh clone install and lint | Pending | Cannot pass until the lint toolchain is declared and configured |

## Acceptance Criteria Status

- `npm run lint` completes without the circular JSON error: **Not yet satisfied in this checkout**
- Lint reports real source errors instead of crashing: **Not yet testable**
- Fresh clone plus `npm install` plus `npm run lint` works without manual steps: **Not yet satisfied**
- `package.json` updated with the working dependency/configuration choice: **Pending implementation**

## Reproduction and Final Validation Commands

Once the intended ESLint dependencies and configuration are present, validate with PowerShell from the repository root:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
npm install
npm run lint
```

The final result must contain no `Converting circular structure to JSON` error. If ESLint reports source violations, those should be recorded as ordinary lint findings and addressed only if they are part of the agreed task scope.

## Conclusion

The project and the requested tooling task have been analyzed. The key integration issue is a mismatch between the reported incident and the current repository: the incident assumes an ESLint 9 flat-config dependency setup, while this checkout contains only an `eslint .` script and no ESLint toolchain. The correct next implementation step is to restore or confirm the intended ESLint configuration and dependencies, then reproduce and resolve the configuration-specific failure with a clean lockfile and a fresh-install lint verification.
