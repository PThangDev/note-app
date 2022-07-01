import { DefaultLayout, AuthLayout } from 'src/layouts';
import { LoginPage, RegisterPage } from 'src/pages/auth';
import { HomePage, PinsPage, NotesPage, ProfilePage, TrashsPage } from 'src/pages';

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
    path: '/notes',
    component: NotesPage,
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
];
