import { DefaultLayout } from 'src/layouts';
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
import { TopicDetailPageRender } from 'src/pages/topic-detail';
import { PrivateRoute } from './OuterRoutes';

const routes = [
  // Public Routes

  //   Private routes
  {
    path: '/',
    component: HomePage,
    layout: DefaultLayout,
    outer: PrivateRoute,
  },
  {
    path: '/themes',
    component: HomePage,
    outer: PrivateRoute,
  },
  {
    path: '/topics',
    component: TopicPage,
    outer: PrivateRoute,
  },
  {
    path: '/topics/:id',
    component: TopicDetailPage,
    outer: PrivateRoute,
  },
  {
    path: '/topics/:id/:slug',
    component: TopicDetailPageRender,
    outer: PrivateRoute,
  },
  {
    path: '/notes',
    component: NotesPage,
    outer: PrivateRoute,
  },
  {
    path: '/notes/:id',
    component: NoteDetailPage,
    outer: PrivateRoute,
  },
  {
    path: '/notes/:id/:slug',
    component: NoteDetailPageRender,
    outer: PrivateRoute,
  },
  {
    path: '/pins',
    component: PinsPage,
    outer: PrivateRoute,
  },
  {
    path: '/trashs',
    component: TrashsPage,
    outer: PrivateRoute,
  },
  {
    path: '/profile',
    component: ProfilePage,
    outer: PrivateRoute,
  },
  {
    path: '/search',
    component: SearchPage,
    outer: PrivateRoute,
  },
];

export default routes;
