// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './Template.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Template: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Template</div>;
};
export default Template;
