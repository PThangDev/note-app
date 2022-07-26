import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';
import React, { ChangeEvent, FC } from 'react';

interface Props {
  name?: string;
  id?: string;
  label?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const cx = classNames.bind(styles);

const Checkbox: FC<Props> = ({
  id = '',
  name = '',
  label = '',
  className = '',
  onChange = () => {},
}) => {
  return (
    <div className={classNames(cx('checkbox'), className)}>
      <input type="checkbox" name={name} id={id || name} onChange={onChange} />
      {label && <label htmlFor={id || name}>{label}</label>}
    </div>
  );
};
export default Checkbox;
