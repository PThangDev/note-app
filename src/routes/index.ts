import HomePage from 'src/pages/home';
import { LoginPage, RegisterPage } from 'src/pages/auth';
import AuthLayout from 'src/layouts/AuthLayout';
export const publicRoutes = [
  {
    path: '/',
    component: HomePage,
    layout: null,
  },
];
export const privateRoutes = [];

export const authRoutes = [
  { path: '/auth/login', component: LoginPage, layout: AuthLayout },
  { path: '/auth/register', component: RegisterPage, layout: AuthLayout },
];
