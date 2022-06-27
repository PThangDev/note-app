// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './Sidebar.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Sidebar: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Sidebar</div>;
};
export default Sidebar;
