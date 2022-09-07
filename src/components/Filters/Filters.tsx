import classNames from 'classnames/bind';
import { FC } from 'react';

import Search from './components/Search';
import Sort from './components/Sort';
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
