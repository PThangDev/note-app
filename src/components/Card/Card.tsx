// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
// Import src
import styles from './Card.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Card: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Card</div>;
};
export default Card;
