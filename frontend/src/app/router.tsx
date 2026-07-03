import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@shared/components/layout/AppShell'
import { LoginScreen } from '@features/auth/screens/LoginScreen'
import { RegisterScreen } from '@features/auth/screens/RegisterScreen'
import { BookDetailScreen } from '@features/books/screens/BookDetailScreen'
import { BooksScreen } from '@features/books/screens/BooksScreen'
import { TrackerScreen } from '@features/dashboard/screens/TrackerScreen'
import { NoteEditScreen } from '@features/notes/screens/NoteEditScreen'
import { NotesScreen } from '@features/notes/screens/NotesScreen'
import { ReaderScreen } from '@features/reader/screens/ReaderScreen'
import { StudyGroupDetailScreen } from '@features/study-groups/screens/StudyGroupDetailScreen'
import { StudyGroupsScreen } from '@features/study-groups/screens/StudyGroupsScreen'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/books" replace /> },
      { path: 'books', element: <BooksScreen /> },
      { path: 'books/:bookId', element: <BookDetailScreen /> },
      { path: 'books/:bookId/read', element: <ReaderScreen /> },
      { path: 'notes', element: <NotesScreen /> },
      { path: 'notes/new', element: <NoteEditScreen /> },
      { path: 'notes/:noteId', element: <NoteEditScreen /> },
      { path: 'dashboard', element: <Navigate to="/tracker" replace /> },
      { path: 'tracker', element: <TrackerScreen /> },
      { path: 'study-groups', element: <StudyGroupsScreen /> },
      { path: 'study-groups/:groupId', element: <StudyGroupDetailScreen /> },
      { path: 'login', element: <LoginScreen /> },
      { path: 'register', element: <RegisterScreen /> },
    ],
  },
])
