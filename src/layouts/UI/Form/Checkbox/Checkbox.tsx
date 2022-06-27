import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';
import React, { FC } from 'react';

interface Props {
  name?: string;
  id?: string;
  label?: string;
  className?: string;
}

const cx = classNames.bind(styles);

const Checkbox: FC<Props> = ({ id = '', name = '', label = '', className = '' }) => {
  return (
    <div className={classNames(cx('checkbox'), className)}>
      <input type="checkbox" name={name} id={id || name} />
      {label && <label htmlFor={id || name}>{label}</label>}
    </div>
  );
};
export default Checkbox;
