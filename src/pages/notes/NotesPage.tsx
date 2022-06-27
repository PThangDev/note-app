import classNames from 'classnames/bind';
import styles from './NotesPage.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>NotesPage</div>;
};
export default NotesPage;
