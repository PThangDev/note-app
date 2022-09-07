import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'src/app/hooks';
import images from 'src/assets/images';
import styles from './Header.module.scss';
import Search from './Search';

interface Props {
  isOpenSidebar: boolean;
  onToggleSidebar: () => void;
}

const cx = classNames.bind(styles);

const Header: FC<Props> = ({ isOpenSidebar, onToggleSidebar }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className={cx('wrapper', { 'open-sidebar': isOpenSidebar })}>
      <div className={cx('inner')}>
        {/* <img src="" alt="" className="logo" /> */}
        <div className={cx('left')}>
          <p className={cx('menu-text')}>Menu</p>
          <span className={cx('icon-menu')} onClick={onToggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <Search />
        </div>

        <Link to="/profile" className={cx('user')}>
          <img className={cx('avatar')} src={user?.avatar || images.avatarDefault} alt="" />
          <p className={cx('username')}>{user?.username}</p>
        </Link>
      </div>
    </header>
  );
};
export default Header;
