// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { Input } from 'src/layouts/UI/Form';
// Import src
import styles from './Search.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Search: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <Input
        className={cx('input')}
        type="text"
        id="search"
        name="search"
        placeholder="Search your title or content..."
        icon={<i className="fa-solid fa-magnifying-glass"></i>}
      />
    </div>
  );
};
export default Search;
