# Quality Rules

These rules are mandatory for every code change.

## TypeScript

- Keep `strict` TypeScript compatibility.
- Do not use `any`.
- Prefer domain types in `features/*/types`.
- Use early returns for not-found and unavailable states.
- Keep unused imports and dead code out of the tree.
- Preserve `noUnusedLocals` and `noUnusedParameters`.

## React

- Use function components.
- Keep component state local when it is purely UI state.
- Use TanStack Query for feature data access.
- Use `react-hook-form` + `zod` for every form.
- Do not duplicate form validation in components when a zod schema exists.
- Avoid large screen files; extract feature components when UI grows.

## MUI

- Prefer MUI components over custom HTML when a component exists.
- Prefer `sx` for styling.
- Keep custom CSS minimal and global CSS limited to root/body/scrollbar basics.
- Use `Stack`, `Box`, `Paper`, `Card`, `Button`, `IconButton`, `Chip`, `Typography`, `LinearProgress`, `Dialog`, `BottomNavigation`, and `TextField` consistently.
- In this installed MUI version, do not pass system props such as `gap`, `alignItems`, `justifyContent`, `textAlign`, `flex`, or `height` directly to `Stack`; use `spacing` and `sx`.

## Icons

- Use `lucide-react`.
- Use recognizable icons for actions before text-only controls when appropriate.
- Keep icons sized in multiples of 2 and visually aligned with MUI text.

## Forms

- Every form must have a schema in the feature `schemas/` folder.
- Use shared form components:
  - `FormTextField`
  - `FormSelectField`
  - `FormSwitchField`
- Validation messages must be short and useful.

## Mock Services

- Mock services must simulate async behavior.
- Keep mock API delay/helper code in `shared/services/api`.
- Keep feature mock data in feature services.
- Do not import React or MUI into services.

## Local-First PDF Rules

- Never upload PDF files.
- Never upload PDF files to a backend server.
- Never create a backend endpoint that accepts PDF binary uploads.
- Never store PDF binary data in localStorage.
- Never store PDF binary data on the server.
- Never parse or persist full PDF text.
- Never send full PDF text to the server.
- Page count detection must happen in browser memory.
- Persist only metadata:
  - title
  - total pages
  - current page
  - progress metadata
  - local file name/path reference available from browser
  - file size
  - imported date
  - `sourceType: 'pdf'`
  - `localOnlyFile: true`
- Use session-only `URL.createObjectURL(file)` for embedded reading.
- If the page reloads and the object URL is gone, ask the user to select the PDF again.

When implementing the future NestJS backend, only sync PDF tracking metadata. Do not add file upload interceptors, multipart PDF handlers, object storage integration, or PDF text extraction unless the project rules are explicitly changed first.

## Copywriting

Use calm, mature, reflective copy.

Good:

- `Continue your path`
- `Return to the page where thought paused.`
- `Reading is not a race. It is a practice.`
- `Build wisdom, one page at a time.`

Avoid:

- hype
- exclamation marks
- childish gamification language
- generic productivity jargon

## Maintainability

- Make the smallest change that satisfies the request.
- Follow existing naming and file placement.
- Do not introduce broad refactors during narrow UI requests.
- Do not add abstractions unless they remove real duplication or clarify domain boundaries.
- Do not change package versions unless needed.
