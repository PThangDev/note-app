import classNames from 'classnames/bind';
import { FC, ReactNode, useState } from 'react';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';
import styles from './DefaultLayout.module.scss';
interface Props {
  children: ReactNode;
}
const cx = classNames.bind(styles);
const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('inner')}>
        <Sidebar />
        <main className={cx('main')}>{children}</main>
      </div>
      {/* <Menubar /> */}
    </div>
  );
};
export default DefaultLayout;
