# Contributing to Maroon Traceability Demo

Thank you for contributing. This document defines the workflow and quality gates required before merge.

## Prerequisites

- **Node.js** 20.x (see `engines` in `package.json`)
- **npm** 9+
- Git with Husky hooks installed (`npm install` runs the `prepare` script automatically)

## Getting Started

1. Fork and clone the repository
2. Copy `.env.example` to `.env.local` and configure Supabase credentials (see [README](README.md))
3. Install dependencies: `npm install`
4. Verify locally (same checks as CI):

   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```

## Branch Naming

Use descriptive prefixes:

- `feature/` — new functionality
- `fix/` — bug fixes
- `docs/` — documentation only
- `chore/` — tooling, dependencies, CI

Example: `feature/saps-export-report`

## Commit Messages

Use imperative mood with optional scope:

```
fix(auth): handle expired session on register route
docs: add deployment runbook for Vercel
```

Keep commits focused. Prefer multiple small commits over one large commit.

## Pull Request Guidelines

- Keep PRs reviewable (aim for &lt; 400 lines changed when possible)
- Link related issues when applicable
- Update documentation for API, architecture, or env variable changes
- Ensure all CI checks pass before requesting review
- Include test coverage for behavioral changes

### Required checks (CI)

CI on every PR to `main` runs, in order:

1. `npm ci` (or `npm install` with lockfile)
2. `npm run lint`
3. `npm run type-check`
4. `npm test`
5. `npm run build`

## Local Git Hooks

| Hook       | Scope                                      |
| ---------- | ------------------------------------------ |
| pre-commit | lint-staged (ESLint on staged TS/JS files) |
| pre-push   | full test suite                            |

Run `npm run perf:check` manually before large changes to run lint, type-check, and build together.

## Code Standards

- **TypeScript** strict mode — no `any` without justification
- **ESLint** — fix violations; do not disable rules without discussion
- **Tests** — add or update tests in `tests/` or `src/__tests__/` per [test layout policy](docs/architecture/test-layout.md)
- **Feature boundaries** — import across features only via `src/core` adapters or public feature indexes

## Documentation Ownership

| Area            | Location              | Maintainer        |
| --------------- | --------------------- | ----------------- |
| Architecture    | `docs/architecture/`  | Core team         |
| API             | `docs/api/`           | Core team         |
| Setup / Deploy  | `docs/setup/`         | Core team         |
| Feature details | `src/features/*/README.md` | Feature author |

Update [`docs/README.md`](docs/README.md) when adding new documentation areas.

## Security

Read [SECURITY.md](SECURITY.md) before working on auth, API routes, or environment configuration. Never commit secrets.

## Questions

- [README](README.md) — project overview and quick start
- [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md) — development history
- [GitHub Issues](https://github.com/lungelomyamya-rgb/maroon_traceability/issues)
