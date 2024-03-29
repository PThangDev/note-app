import classNames from 'classnames/bind';
import { FC } from 'react';

import { Button, Link } from 'src/layouts/UI';
import styles from './SuccessAuth.module.scss';

interface Props {
  heading: string;
  description?: string;
}

const cx = classNames.bind(styles);

const SuccessAuth: FC<Props> = ({
  heading = '',
  description = 'Success. Please check your email to verify',
}) => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('heading')}>{heading}</h1>
      <p className={cx('icon-success')}>
        <i className="fa-solid fa-circle-check"></i>
      </p>
      <p className={cx('description')}>{description}</p>
      <Button className={cx('btn-back')}>
        <Link to="/auth/login">Back to Login</Link>
      </Button>
    </div>
  );
};
export default SuccessAuth;
