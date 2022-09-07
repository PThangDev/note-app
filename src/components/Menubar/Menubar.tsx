import classNames from 'classnames/bind';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Menubar.module.scss';
import routes from './routes';

interface Props {}

const cx = classNames.bind(styles);

const Menubar: FC<Props> = (props) => {
  const location = useLocation();
  // console.log(location);
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('menu-list')}>
        {routes.map((route, index) => {
          const { icon: Icon, to, label } = route;
          return (
            <li className={cx('menu-item')} key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => {
                  return cx('menu-link', { active: isActive });
                }}
              >
                <span className={cx('icon')}>{<Icon />}</span>
                <span className={cx('content')}>{label}</span>
                <div className={cx('indicator')}></div>
              </NavLink>
            </li>
          );
        })}

        <li className={cx('menu-item')}>
          <div className={cx('menu-link')}>
            <span className={cx('icon')}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            <span className={cx('content')}>Logout</span>
          </div>
        </li>
        {/* <div className={cx('indicator')}></div> */}
      </ul>
    </div>
  );
};
export default Menubar;
