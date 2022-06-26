import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/layouts/Button';
import Checkbox from 'src/layouts/Form/Checkbox';
import Input from 'src/layouts/Form/Input';
import styles from './Login.module.scss';
interface Props {}

const cx = classNames.bind(styles);
const LoginPage: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('heading')}>Login</h1>
      <form className={cx('form')} action="">
        <Input placeholder="Enter your email..." icon={<i className="fa-solid fa-envelope"></i>} />
        <Input
          placeholder="Enter your password..."
          type="password"
          icon={<i className="fa-solid fa-lock"></i>}
        />
        <div className={cx('options')}>
          <Checkbox className={cx('checkbox')} label="Remember me" name="remember-me" />
          <Link className={cx('link')} to="/auth/forgot-password">
            Forgot Password ?
          </Link>
        </div>

        <Button
          className={cx('btn-login')}
          type="submit"
          fullWidth
          icon={() => <i className="fa-solid fa-right-to-bracket"></i>}
        >
          Login
        </Button>

        <div className={cx('note')}>
          Don't have an account?
          <Link className={cx('link')} to="/auth/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
