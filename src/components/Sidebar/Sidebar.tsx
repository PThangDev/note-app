import classNames from 'classnames/bind';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import { fetchLogout } from 'src/pages/auth/authSlice';
import routes from './routes';
import styles from './Sidebar.module.scss';

interface Props {
  isOpen: boolean;
}

const cx = classNames.bind(styles);

const Sidebar: FC<Props> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(fetchLogout());
  };
  return (
    <div className={cx('wrapper', { close: !isOpen })}>
      <ul className={cx('list')}>
        {routes.map((route, index) => {
          const { icon: Icon, to, label } = route;
          return (
            <li className={cx('item')} key={to}>
              <NavLink className={({ isActive }) => cx('link', { active: isActive })} to={to}>
                <span className={cx('icon')}>
                  <Icon />
                </span>
                <span className={cx('label')}>{label}</span>
              </NavLink>
            </li>
          );
        })}
        <li className={cx('item')} onClick={handleLogout}>
          <div className={cx('link')}>
            <span className={cx('icon')}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            <span className={cx('label')}>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
