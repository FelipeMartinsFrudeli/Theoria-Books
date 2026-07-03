# Verification Checklist

Run this checklist before final response after code changes.

## Required

From `frontend/`:

```bash
npm run build
```

The build must pass before reporting completion, unless the task is documentation-only or the user explicitly says not to run it.

## Recommended

For UI changes:

1. Check changed routes manually in the browser when feasible.
2. Confirm mobile shell still fits within the centered app container.
3. Confirm bottom navigation remains usable.
4. Confirm text does not overflow compact controls.
5. Confirm spacing and radius values are multiples of 4px.

For forms:

1. Confirm schema exists in the feature `schemas/` folder.
2. Confirm the form uses `react-hook-form`.
3. Confirm validation errors are visible through shared form fields.

For data changes:

1. Confirm service functions remain async mocks.
2. Confirm TanStack Query hooks invalidate affected queries.
3. Confirm no backend calls were introduced.

For PDF changes:

1. Confirm no upload path exists.
2. Confirm no PDF binary is persisted.
3. Confirm localStorage stores metadata only.
4. Confirm embedded reading uses a session-only object URL.

## Useful Audits

Find radius and pixel literals:

```bash
rg -n "borderRadius|border-radius|[0-9]+px" src
```

Find forbidden `any`:

```bash
rg -n "\\bany\\b" src
```

Find long relative imports:

```bash
rg -n "from ['\"]\\.\\./\\.\\." src
```

Find accidental backend/network calls:

```bash
rg -n "fetch\\(|axios|XMLHttpRequest|FormData" src
```

