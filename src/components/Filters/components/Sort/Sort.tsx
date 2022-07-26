// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { Input } from 'src/layouts/UI/Form';
// Import src
import styles from './Sort.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Sort: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <select>
        <option value="">----- Filters -----</option>
        <option value="">----- Title A-Z -----</option>
        <option value="">----- Title Z-A -----</option>
        <option value="">----- Newest -----</option>
        <option value="">----- Oldest -----</option>
      </select>
    </div>
  );
};
export default Sort;
