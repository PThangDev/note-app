import classNames from 'classnames/bind';
import styles from './Template.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const Template: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Template</div>;
};
export default Template;
