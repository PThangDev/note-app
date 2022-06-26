import classNames from 'classnames/bind';
import styles from './NotFoundPage.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const NotFoundPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>NotFoundPage</div>;
};
export default NotFoundPage;
