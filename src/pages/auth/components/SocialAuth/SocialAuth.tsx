import classNames from 'classnames/bind';
import styles from './SocialAuth.module.scss';
import React, { FC } from 'react';

interface Props {}

const cx = classNames.bind(styles);

const SocialAuth: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <li className={cx('item')}>
          <span className={cx('icon', 'icon--google')}>
            <i className="fa-brands fa-google"></i>
          </span>
        </li>
        <li className={cx('item')}>
          <span className={cx('icon', 'icon--facebook')}>
            <i className="fa-brands fa-facebook-square"></i>
          </span>
        </li>
      </ul>
    </div>
  );
};
export default SocialAuth;
