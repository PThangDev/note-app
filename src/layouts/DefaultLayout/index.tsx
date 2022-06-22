import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
export default DefaultLayout;
