import classNames from 'classnames/bind';
import styles from './PinsPage.module.scss';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface Props {}

const cx = classNames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Note App - Pinned</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>PinsPage</div>
    </>
  );
};
export default PinsPage;
