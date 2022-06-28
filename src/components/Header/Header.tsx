import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import React, { FC } from 'react';
import images from 'src/assets/images';
import { Link } from 'react-router-dom';

interface Props {
  isOpenSidebar: boolean;
  onToggleSidebar: () => void;
}

const cx = classNames.bind(styles);

const Header: FC<Props> = ({ isOpenSidebar, onToggleSidebar }) => {
  return (
    <header className={cx('wrapper', { 'open-sidebar': isOpenSidebar })}>
      <div className={cx('inner')}>
        {/* <img src="" alt="" className="logo" /> */}
        <div className={cx('logo')}>
          <p className={cx('menu-text')}>Menu</p>
          <span className={cx('icon-menu')} onClick={onToggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </span>
          Note App
        </div>
        <Link to="/profile" className={cx('user')}>
          <img className={cx('avatar')} src={images.avatarDefault} alt="" />
          <p className={cx('username')}>PThangDev</p>
        </Link>
      </div>
    </header>
  );
};
export default Header;
