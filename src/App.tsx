import { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import DefaultLayout from './layouts/DefaultLayout';
import { authRoutes, publicRoutes } from './routes';

interface Props {}

const App: FC<Props> = (props) => {
  return (
    <div className="app">
      <GlobalStyles />
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => {
          const Component = route.component;
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
        {/* Auth Routes */}
        {authRoutes.map((route, index) => {
          const Component = route.component;
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};
export default App;
