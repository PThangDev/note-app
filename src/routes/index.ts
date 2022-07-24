import { DefaultLayout, AuthLayout } from 'src/layouts';
import { LoginPage, RegisterPage, ActiveAccountPage, ForgotPasswordPage } from 'src/pages/auth';
import {
  HomePage,
  PinsPage,
  NotesPage,
  ProfilePage,
  TrashsPage,
  TopicPage,
  NoteDetailPage,
  SearchPage,
  TopicDetailPage,
} from 'src/pages';
import { NoteDetailPageRender } from 'src/pages/note_detail';
import { TopicDetailPageRender } from 'src/pages/topic_detail';

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
    path: '/topics/:id',
    component: TopicDetailPage,
  },
  {
    path: '/topics/:id/:slug',
    component: TopicDetailPageRender,
  },
  {
    path: '/notes',
    component: NotesPage,
  },
  {
    path: '/notes/:id',
    component: NoteDetailPage,
  },
  {
    path: '/notes/:id/:slug',
    component: NoteDetailPageRender,
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
  {
    path: '/search',
    component: SearchPage,
  },
];

export const authRoutes = [
  { path: '/auth/login', component: LoginPage, layout: AuthLayout },
  { path: '/auth/register', component: RegisterPage, layout: AuthLayout },
  { path: '/auth/forgot-password', component: ForgotPasswordPage, layout: AuthLayout },
  { path: '/auth/active/:activeToken', component: ActiveAccountPage, layout: AuthLayout },
];
