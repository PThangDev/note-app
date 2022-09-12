import HeadlessTippy from '@tippyjs/react/headless';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Tooltip: FC<Props> = ({ children }) => {
  return <HeadlessTippy></HeadlessTippy>;
};
export default Tooltip;
