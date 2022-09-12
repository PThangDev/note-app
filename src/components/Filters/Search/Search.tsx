// Import library
import classNames from 'classnames/bind';
import React, { ChangeEvent, FC } from 'react';
import { Input } from 'src/layouts/UI/Form';
// Import src
import styles from './Search.module.scss';

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const cx = classNames.bind(styles);

const Search: FC<Props> = ({ value, onChange }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };
  return (
    <div className={cx('wrapper')}>
      <Input
        className={cx('input')}
        name="search"
        placeholder="Enter your keyword..."
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};
export default Search;
