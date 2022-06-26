import classNames from 'classnames/bind';
import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
  children?: ReactNode;
  type?: string;
  primary?: boolean;
  icon?: FC;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const cx = classNames.bind(styles);

const Button: FC<Props> = ({
  children = '',
  primary = true,
  icon: Icon,
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
}) => {
  return (
    <button
      className={cx(
        'button',
        {
          'button--primary': primary,
          'button--full-width': fullWidth,
          'button--disabled': disabled,
          'button--loading': loading,
        },
        className
      )}
      disabled={disabled || loading}
    >
      {Icon && !loading && (
        <span className={cx('icon')}>
          <Icon />
        </span>
      )}
      {loading && (
        <span className={cx('icon-loading')}>
          <i className="fa-solid fa-fan"></i>
        </span>
      )}
      {children}
    </button>
  );
};
export default Button;
