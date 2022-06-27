import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import React, { FC } from 'react';
import CardContainer from 'src/containers/CardContainer';

interface Props {}

const cx = classNames.bind(styles);

const HomePage: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <CardContainer heading="Pinned" to="/pinned" />
    </div>
  );
};
export default HomePage;
