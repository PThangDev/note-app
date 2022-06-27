// Lib
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';
// End Lib
import { Controller, useForm } from 'react-hook-form';
import Button from 'src/layouts/UI/Button';
import { Checkbox, Input } from 'src/layouts/UI/Form';
import styles from './Login.module.scss';
import loginSchema from './loginSchema';

interface Props {}

const cx = classNames.bind(styles);
const LoginPage: FC<Props> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const handleLogin = (data: any) => {};
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('heading')}>Login</h1>
      <form className={cx('form')} action="" onSubmit={handleSubmit(handleLogin)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            const { name } = field;
            return (
              <Input
                id={name}
                {...field}
                placeholder="Your email..."
                icon={<i className="fa-solid fa-envelope"></i>}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message || ''}
              />
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            const { name } = field;
            return (
              <Input
                id={name}
                {...field}
                type="password"
                placeholder="Your password..."
                icon={<i className="fa-solid fa-lock"></i>}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message || ''}
              />
            );
          }}
        />

        <div className={cx('options')}>
          <Checkbox className={cx('checkbox')} label="Remember me" name="remember" />
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
