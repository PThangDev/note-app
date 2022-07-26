// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { Input } from 'src/layouts/UI/Form';
import Search from './components/Search';
import Sort from './components/Sort';
// Import src
import styles from './Filters.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Filters: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <Search />
      <Sort />
    </div>
  );
};
export default Filters;
