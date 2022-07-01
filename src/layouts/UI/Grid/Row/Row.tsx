// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './Row.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Row: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Row</div>;
};
export default Row;
