# Theoria Books TODO

## Product Features

- [ ] Improve local PDF reader navigation and page tracking.
- [ ] Save reading sessions with start page, end page, pages read, and time spent.
- [ ] Add highlights linked to a book, page, and selected phrase.
- [ ] Add note references to exact book excerpts.
- [ ] Add backlinks between notes, books, topics, authors, and highlights.
- [ ] Add favorite books and pinned notes.
- [ ] Add edit and delete flows for books, notes, groups, and tasks.
- [ ] Add task due dates, recurring reading tasks, and completion history.
- [ ] Add reading streak recovery rules.
- [ ] Add study group invitations and member roles.
- [ ] Add group discussions linked to page ranges with spoiler locks.
- [ ] Add simple search across books, notes, tags, and highlights.
- [ ] Add export for notes and reading history.

## Backend

- [ ] Create a backend app using NestJS.
- [ ] Add authentication with Passport and JWT.
- [ ] Add TypeORM for database access.
- [ ] Add users, books, notes, highlights, tasks, groups, and reading sessions modules.
- [ ] Add migrations for the first schema.
- [ ] Add refresh-token flow.
- [ ] Add request validation with DTOs.
- [ ] Add authorization guards for private user data.
- [ ] Add pagination and filtering for library and notes endpoints.
- [ ] Add sync endpoints for reading progress and metadata.

## PDF Privacy Rule

- [ ] Never upload PDF files to the server.
- [ ] Never store PDF binary data on the server.
- [ ] Never store full PDF text on the server.
- [ ] Backend may store only tracking metadata, such as title, total pages, current page, progress, source type, file name/reference, file size, imported date, and local-only flags.

