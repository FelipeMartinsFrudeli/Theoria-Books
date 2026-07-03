# Coldstart Session

Use this protocol at the beginning of every clean session.

## Required First Steps

1. Confirm the working directory:
   - Repository root: `/var/www/WORKSPACE/theoria_books`
   - App root: `/var/www/WORKSPACE/theoria_books/frontend`
2. Read all files in `.agents/` before editing.
3. Inspect relevant source files before proposing or applying changes.
4. Use `rg` and `find` for discovery.
5. Preserve the existing feature-slice architecture.
6. Run `npm run build` from `frontend/` before final response unless the task is docs-only.

## Project Identity

Theoria Books is a calm, philosophical, gamified reading tracker.

The product must feel:

- calm
- premium
- reflective
- focused
- useful
- slightly gamified, never childish

Avoid:

- noisy dashboards
- generic productivity UI
- childish game language
- over-decorated screens
- architecture shortcuts that mix feature domains

## Current App Facts

- Framework: React + TypeScript + Vite.
- UI: MUI with `sx` styling.
- Routing: `react-router-dom`.
- Server state: TanStack Query.
- Forms: `react-hook-form` + `zod`.
- Icons: `lucide-react`.
- Data: mock services only.
- PDF files: local-only; never upload or persist binary content.
- Dev server must bind to LAN through Vite config using `host: '0.0.0.0'`.

## Non-Negotiables

- Do not connect a backend.
- Do not upload PDFs.
- Do not store PDF binary data in `localStorage`.
- Do not move business logic into screens when a feature service or hook is appropriate.
- Do not bypass zod validation for forms.
- Do not introduce unapproved dependencies without a clear reason.
- Do not use arbitrary spacing or radius values; use multiples of 4px.

