// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './EmptyItem.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const EmptyItem: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Empty Item</div>;
};
export default EmptyItem;
