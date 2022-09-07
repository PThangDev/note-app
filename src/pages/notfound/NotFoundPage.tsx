import classNames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet';

import styles from './NotFoundPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const NotFoundPage: FC<Props> = (props) => {
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Note App - 404 Not Found</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      <div className={cx('wrapper')}>NotFoundPage</div>;
    </>
  );
};
export default NotFoundPage;
