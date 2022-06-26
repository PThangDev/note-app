import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/layouts/Button';
import Checkbox from 'src/layouts/Form/Checkbox';
import Input from 'src/layouts/Form/Input';
import styles from './Register.module.scss';
interface Props {}

const cx = classNames.bind(styles);

const RegisterPage: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('heading')}>Register</h1>
      <form className={cx('form')} action="">
        <Input
          placeholder="Enter your username..."
          name="username"
          icon={<i className="fa-solid fa-user"></i>}
        />
        <Input
          placeholder="Enter your email..."
          name="email"
          icon={<i className="fa-solid fa-envelope"></i>}
        />
        <Input
          placeholder="Enter your password..."
          type="password"
          name="password"
          icon={<i className="fa-solid fa-lock"></i>}
        />
        <Input
          placeholder="Enter your confirm password..."
          type="password"
          name="confirm-password"
          icon={<i className="fa-solid fa-unlock-keyhole"></i>}
        />
        <Checkbox className={cx('policy')} name="policy" label="I agree policy" />
        <Button
          className={cx('btn-submit')}
          type="submit"
          fullWidth
          icon={() => <i className="fa-solid fa-user-plus"></i>}
        >
          Register
        </Button>
        <div className={cx('note')}>
          Already have an account?
          <Link className={cx('link')} to="/auth/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
