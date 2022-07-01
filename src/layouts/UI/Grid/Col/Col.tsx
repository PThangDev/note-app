// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './Col.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Col: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Col</div>;
};
export default Col;
