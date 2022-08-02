// Import library
import classNames from 'classnames/bind';
import React, { ChangeEvent, FC } from 'react';
import { Input } from 'src/layouts/UI/Form';
// Import src
import styles from './Search.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Search: FC<Props> = (props) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div className={cx('wrapper')}>
      <Input
        className={cx('input')}
        name="search-note"
        placeholder="Enter your keyword..."
        onChange={handleSearch}
      />
    </div>
  );
};
export default Search;
