import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const ProfilePage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>ProfilePage</div>;
};
export default ProfilePage;
