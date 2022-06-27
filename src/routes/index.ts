import { DefaultLayout, AuthLayout } from 'src/layouts';
import { LoginPage, RegisterPage } from 'src/pages/auth';
import HomePage from 'src/pages/home';
import NotesPage from 'src/pages/notes';
import TrashsPage from 'src/pages/trashs';
import ProfilePage from 'src/pages/profile';

export const publicRoutes = [
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
    path: '/trashs',
    component: TrashsPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
];
export const privateRoutes = [];

export const authRoutes = [
  { path: '/auth/login', component: LoginPage, layout: AuthLayout },
  { path: '/auth/register', component: RegisterPage, layout: AuthLayout },
];
