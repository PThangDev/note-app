// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './Container.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Container: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Container</div>;
};
export default Container;
