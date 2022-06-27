import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import React, { FC } from 'react';
import images from 'src/assets/images';
import { Link } from 'react-router-dom';

interface Props {}

const cx = classNames.bind(styles);

const Header: FC<Props> = (props) => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* <img src="" alt="" className="logo" /> */}
        <p className={cx('logo')}>Note App</p>
        <Link to="/profile" className={cx('user')}>
          <img className={cx('avatar')} src={images.avatarDefault} alt="" />
          <p className={cx('username')}>PThangDev</p>
        </Link>
      </div>
    </header>
  );
};
export default Header;
