import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const HomePage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>HomePage</div>;
};
export default HomePage;
