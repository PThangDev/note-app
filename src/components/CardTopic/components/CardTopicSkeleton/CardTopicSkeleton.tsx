// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './CardTopicSkeleton.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const CardTopicSkeleton: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>CardTopicSkeleton</div>;
};
export default CardTopicSkeleton;
