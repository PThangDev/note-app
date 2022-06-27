import classNames from 'classnames/bind';
import styles from './TrashsPage.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>TrashsPage</div>;
};
export default TrashsPage;
