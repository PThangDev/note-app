import classNames from 'classnames/bind';
import styles from './PinsPage.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>PinsPage</div>;
};
export default PinsPage;
