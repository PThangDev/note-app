import classNames from 'classnames/bind';
import { ForwardedRef, forwardRef, HTMLInputTypeAttribute, ReactElement, useEffect, useState } from 'react';
import styles from './Input.module.scss';

interface Props {
  id?: string;
  placeholder?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  icon?: ReactElement;
  error?: boolean;
  helperText?: string;
  className?: string;
  value?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

const cx = classNames.bind(styles);

const Input = (
  {
    id = '',
    placeholder = '',
    name = '',
    type = 'text',
    icon: Icon,
    error = false,
    helperText = '',
    className = '',
    onChange,
    onBlur,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isShowValue, setIsShowValue] = useState<boolean>(false);
  useEffect(() => {
    if (type === 'password') {
      setIsShowValue(false);
    }
  }, [type]);

  return (
    <div className={cx('input-group', { error: error }, className)}>
      <div className={cx('input-field')}>
        <input
          id={id}
          placeholder={placeholder}
          type={isShowValue ? (type === 'password' ? 'text' : 'password') : type}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        <span className={cx('icon')}>{Icon ? Icon : ''}</span>
        {type === 'password' && (
          <span
            className={cx('eye')}
            onMouseDown={() => setIsShowValue(!isShowValue)}
            onMouseUp={() => setIsShowValue(!isShowValue)}
          >
            {isShowValue ? (
              <i className="fa-solid fa-eye-low-vision"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </span>
        )}
      </div>

      {helperText && <p className={cx('helper-text')}>(*) {helperText}</p>}
    </div>
  );
};
export default forwardRef(Input);
