import { DefaultLayout, AuthLayout } from 'src/layouts';
import { LoginPage, RegisterPage, ActiveAccountPage, ForgotPasswordPage } from 'src/pages/auth';
import { HomePage, PinsPage, NotesPage, ProfilePage, TrashsPage, TopicPage, NoteDetailPage } from 'src/pages';

export const privateRoutes = [
  {
    path: '/',
    component: HomePage,
    layout: DefaultLayout,
  },
  {
    path: '/themes',
    component: HomePage,
  },
  {
    path: '/topics',
    component: TopicPage,
  },
  {
    path: '/notes',
    component: NotesPage,
  },
  {
    path: '/notes/:slug',
    component: NoteDetailPage,
  },
  {
    path: '/pins',
    component: PinsPage,
  },
  {
    path: '/trashs',
    component: TrashsPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
];

export const authRoutes = [
  { path: '/auth/login', component: LoginPage, layout: AuthLayout },
  { path: '/auth/register', component: RegisterPage, layout: AuthLayout },
  { path: '/auth/forgot-password', component: ForgotPasswordPage, layout: AuthLayout },
  { path: '/auth/active/:activeToken', component: ActiveAccountPage, layout: AuthLayout },
];
