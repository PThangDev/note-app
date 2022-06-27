import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const Header: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Header</div>;
};
export default Header;
