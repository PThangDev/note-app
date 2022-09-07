import classNames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet';

import styles from './ProfilePage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const ProfilePage: FC<Props> = (props) => {
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>ProfilePage</div>
    </>
  );
};
export default ProfilePage;
