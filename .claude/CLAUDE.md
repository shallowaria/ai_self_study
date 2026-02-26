# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

**Package manager: pnpm only.** Do not use npm or yarn. Do not commit `package-lock.json` or `yarn.lock`.

## Architecture

This is a Next.js (App Router) project with TypeScript and Tailwind CSS v4.

- `app/` — App Router pages and layouts. All components default to React Server Components (RSC). Only add `'use client'` when interactivity is required (event handlers, `useState`, `useEffect`), and push it as far down the component tree as possible.
- `app/globals.css` — Tailwind import only. Do not create additional CSS/SCSS files.

## Core Principles (from `.claude/CONSTITUTION.md`)

These rules have the highest priority and override any other suggestions:

1. **YAGNI** — Only implement what the current task explicitly requires. No speculative abstractions.
2. **Server-first** — Default to RSC. Use `'use client'` only when necessary, pushed to leaf nodes.
3. **Zero `any`** — All types must be explicitly defined. No `any` types anywhere.
4. **Tailwind only** — Use Tailwind CSS for all styling. Use `clsx` or `tailwind-merge` for complex class combinations.
5. **Explicit error handling** — Pages with critical logic need `error.tsx` and `loading.tsx`. Server Actions return `{ data, error }`.
6. **No global Context unless necessary** — Prefer URL params (`searchParams`) or server-side data passing for state.
7. **Decouple logic** — Extract complex business logic from UI components into `utils/` functions or custom Hooks with accompanying type definitions.
8. **Tests required** — Vitest for unit tests (utils/hooks), Playwright for E2E (core user paths). No refactoring without a passing test suite.

## Claude Code Tooling

### Custom Agent

- **`code-reviewer`** (`.claude/agents/code-reviewer.md`) — Automatically invoked after writing meaningful code. Reviews RSC compliance, TypeScript type safety, YAGNI violations, error handling, Tailwind usage, logic decoupling, and test coverage. Output format: Approved / Approved with Minor Changes / Requires Changes.

### Custom Commands

- **`/commit-push-pr`** (`.claude/commands/commit-push-pr.md`) — Runs `git status`, generates a Conventional Commits message, pushes the branch, and opens a PR via GitHub API.
- **`/code-review`** (`.claude/commands/code-review.md`) — Reviews specified files/directories against the project constitution. Restricted from accessing `.env*`, `*.pem`, `*.key`, and secrets files.

### Hooks

- **`PostToolUse` hook** (`.claude/hooks/format-ts.js`) — Runs Prettier on any `.ts`/`.tsx` file after every `Edit`, `Write`, or `Read` tool call.

### GitHub Actions

- **`claude_pr_review.yml`** — On every PR open/sync, installs Claude Code and runs `/code-review` against the diff, then posts the Markdown report as a PR comment. Requires `ANTHROPIC_AUTH_TOKEN` and optionally `ANTHROPIC_BASE_URL` in repository secrets.

### Security Permissions

The following reads are permanently denied (configured in `.claude/settings.json`):
- `.env*`, `*.pem`, `*.key`, `config/secrets.*`
- Bash commands searching for passwords
