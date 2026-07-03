# Architecture Rules

The app uses feature-slice architecture. Keep it intact.

## Source Layout

```text
frontend/src/
  app/
    App.tsx
    providers.tsx
    router.tsx

  shared/
    components/
    services/
    styles/
    assets/
    types/
    utils/

  features/
    auth/
    books/
    reader/
    notes/
    dashboard/
    study-groups/
    gamification/
```

## Import Rules

Use path aliases:

- `@app/*`
- `@shared/*`
- `@features/*`

Do not add long cross-tree relative imports like `../../../shared`.

## Feature Boundary Rules

Each feature owns its:

- `components/`
- `screens/`
- `hooks/`
- `services/`
- `schemas/`
- `types/`

Screens should:

- compose components
- call feature hooks
- handle route params and navigation
- stay small

Screens should not:

- contain large mock datasets
- contain service mutation logic
- contain reusable UI primitives
- directly manage data persistence unless the behavior is screen-only

Services should:

- hold mock data
- simulate async API behavior
- own localStorage persistence where applicable
- avoid UI imports

Hooks should:

- wrap TanStack Query queries and mutations
- define query keys close to the feature
- invalidate affected queries after mutations

Schemas should:

- contain zod validation
- be used by all forms
- keep validation messages user-facing and concise

Types should:

- define domain contracts
- avoid `any`
- stay stable across components and services

## Shared Boundary Rules

Use `shared/` only for primitives reused across features:

- layout shell
- navigation
- data-display primitives
- form wrappers
- token/mock API helpers
- theme and global styles
- generic utilities

Do not put feature-specific book, note, dashboard, reader, or study-group logic in `shared/`.

## Routing Rules

Routes live in `src/app/router.tsx`.

Current routes:

- `/` redirects to `/books`
- `/books`
- `/books/:bookId`
- `/books/:bookId/read`
- `/notes`
- `/notes/new`
- `/notes/:noteId`
- `/tracker`
- `/study-groups`
- `/study-groups/:groupId`
- `/login`
- `/register`

When adding a route:

1. Add a feature screen.
2. Add the route in `router.tsx`.
3. Preserve `AppShell` and mobile bottom navigation behavior.

## Data Rules

All current data is mock data.

## Future Backend Rules

When backend work starts, use:

- NestJS
- Passport with JWT authentication
- TypeORM

Backend modules should be organized by domain, such as:

- users
- auth
- books
- notes
- highlights
- tasks
- study groups
- reading sessions

The backend may sync app metadata, reading progress, notes when explicitly enabled, tasks, groups, XP, streaks, and achievements.

The backend must never receive, upload, store, index, or parse PDF binary content or full PDF text.

Allowed persistence:

- mock access token in `localStorage`
- local PDF metadata in `localStorage`

Forbidden persistence:

- PDF binary data
- full PDF text
- uploaded PDF files on the server
- private note content unless explicitly implementing a sync opt-in feature

PDF import rules:

- ask only for the fields the UI needs
- detect page count locally
- persist only metadata and browser-visible file reference
- use a session-only object URL for immediate embedded reading

Backend PDF metadata may include only:

- title
- total pages
- current page
- progress metadata
- browser-visible local file name/reference
- file size
- imported date
- `sourceType: 'pdf'`
- `localOnlyFile: true`
