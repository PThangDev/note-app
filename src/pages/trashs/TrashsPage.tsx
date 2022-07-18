import classNames from 'classnames/bind';
import styles from './TrashsPage.module.scss';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface Props {}

const cx = classNames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Note App - Trash</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>TrashsPage</div>
    </>
  );
};
export default TrashsPage;
