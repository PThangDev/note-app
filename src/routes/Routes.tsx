import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';

interface Props {
  children: JSX.Element;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const { isAuthenticate } = useAppSelector((state) => state.auth);

  if (!isAuthenticate) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};
export const AuthRoute: FC<Props> = ({ children }) => {
  const { isAuthenticate } = useAppSelector((state) => state.auth);
  if (isAuthenticate) {
    return <Navigate to="/" />;
  }
  return children;
};
