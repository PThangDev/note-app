// Lib
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
// End Lib
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Button, Link } from 'src/layouts/UI';
import { Checkbox, Input } from 'src/layouts/UI/Form';
import { UserLogin } from 'src/types/User';
import SocialAuth from '../components/SocialAuth';
import styles from './Login.module.scss';
import loginSchema from './loginSchema';
import { fetchLogin } from './loginSlice';

interface Props {}

const cx = classNames.bind(styles);
const LoginPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.login);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const handleLogin = (data: UserLogin) => {
    dispatch(fetchLogin(data));
  };

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <h1 className={cx('heading')}>Login</h1>
        <form className={cx('form')} action="" onSubmit={handleSubmit(handleLogin)}>
          <Controller
            name="account"
            control={control}
            render={({ field }) => {
              const { name } = field;
              return (
                <Input
                  id={name}
                  {...field}
                  placeholder="Your account..."
                  icon={<i className="fa-solid fa-envelope"></i>}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message || ''}
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              );
            }}
          />

          <div className={cx('options')}>
            <Checkbox className={cx('checkbox')} label="Remember me" name="remember" />
            <Link to="/auth/forgot-password" disabled={isLoading}>
              Forgot Password ?
            </Link>
          </div>

          <Button
            className={cx('btn-login')}
            type="submit"
            fullWidth
            icon={() => <i className="fa-solid fa-right-to-bracket"></i>}
            isLoading={isLoading}
          >
            Login
          </Button>
          <SocialAuth />
          <div className={cx('note')}>
            Don't have an account?
            <Link to="/auth/register" disabled={isLoading}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
