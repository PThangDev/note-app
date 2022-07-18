// Import library
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// Import form src
import { useAppDispatch } from 'src/app/hooks';
import { Button, Link } from 'src/layouts/UI';
import { Input } from 'src/layouts/UI/Form';
import { UserForgotPassword } from 'src/types/User';
import styles from './ForgotPasswordPage.module.scss';
import forgotPasswordSchema from './forgotPasswordSchema';
import { fetchForgotPassword } from './forgotPasswordSlice';

interface Props {}

const cx = classNames.bind(styles);

const ForgotPasswordPage: FC<Props> = (props) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();

  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
    // resolver: yupResolver(forgotPasswordSchema),
  });
  // ********** useEffect (Side Effect) **********

  // ********** Handle Event **********
  const handleSendEmail = async (data: UserForgotPassword) => {
    try {
      const res = await dispatch(fetchForgotPassword(data)).unwrap();
      console.log(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error.errors[0].email);
    }
  };
  // ********** Logic and render UI **********

  const renderUIForgotPassword = () => {};

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <h1 className={cx('heading')}>Forgot Password</h1>
        <span className={cx('description')}>Enter your email you forgot password</span>
        <form className={cx('form')} action="" onSubmit={handleSubmit(handleSendEmail)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              const { name } = field;
              return (
                <Input
                  id={name}
                  placeholder="Enter your email..."
                  icon={<i className="fa-solid fa-envelope"></i>}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message || ''}
                  {...field}
                />
              );
            }}
          />
          <Button className={cx('btn-send')} type="submit">
            Send to email
          </Button>
        </form>
        <p className={cx('note')}>
          You have an account? <Link to="/auth/login">Login</Link> or{' '}
          <Link to="/auth/register">Register</Link>
        </p>
      </div>
    </>
  );
};
export default ForgotPasswordPage;
