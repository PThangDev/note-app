import classNames from 'classnames/bind';
import React, { FC, ReactNode } from 'react';
import styles from './DefaultLayout.module.scss';
interface Props {
  children: ReactNode;
}
const cx = classNames.bind(styles);
const DefaultLayout: FC<Props> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>;
};
export default DefaultLayout;
