import { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import DefaultLayout from './layouts/DefaultLayout';
import { authRoutes, privateRoutes } from './routes';
import { AuthRoute, PrivateRoute } from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {}

const App: FC<Props> = (props) => {
  return (
    <div className="app">
      {/* Global styles */}
      <GlobalStyles />
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        {/* Private Routes */}
        {privateRoutes.map((route, index) => {
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
                <PrivateRoute>
                  <Layout>
                    <Component />
                  </Layout>
                </PrivateRoute>
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
                <AuthRoute>
                  <Layout>
                    <Component />
                  </Layout>
                </AuthRoute>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};
export default App;
