import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/app/hooks';
import { Link } from 'src/layouts/UI';
import Button from 'src/layouts/UI/Button';
import { Checkbox, Input } from 'src/layouts/UI/Form';
import { UserRegister } from 'src/types/User';
import SocialAuth from '../components/SocialAuth';
import SuccessAuth from '../components/SuccessAuth';
import styles from './Register.module.scss';
import registerSchema from './registerSchema';
import { fetchRegister } from './registerSlice';
interface Props {}

const cx = classNames.bind(styles);

const RegisterPage: FC<Props> = (props) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();

  // ********** Hooks (use...) **********
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      cf_password: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);

  // ********** Side Effect (useEffect) **********

  // ********** Handle Event **********
  const handleRegister = async ({
    username,
    email,
    password,
  }: UserRegister & { cf_password: string }) => {
    try {
      await dispatch(fetchRegister({ username, email, password })).unwrap();
      setIsRegisterSuccess(true);
    } catch (error: any) {
      setIsRegisterSuccess(false);
      toast.error(error.errors.message, { autoClose: 4000, hideProgressBar: true });
    }
  };

  // ********** Logic and render UI **********
  const renderUIRegister = () => {
    if (!isRegisterSuccess) {
      return (
        <>
          <h1 className={cx('heading')}>Register</h1>
          <form className={cx('form')} action="" onSubmit={handleSubmit(handleRegister)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                const { name } = field;
                return (
                  <Input
                    id={name}
                    {...field}
                    placeholder="Your username..."
                    icon={<i className="fa-solid fa-user"></i>}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                    disabled={isSubmitting}
                  />
                );
              }}
            />
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
                    helperText={errors?.[name]?.message}
                    disabled={isSubmitting}
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
                    type="password"
                    placeholder="Your password..."
                    icon={<i className="fa-solid fa-lock"></i>}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                    disabled={isSubmitting}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="cf_password"
              control={control}
              render={({ field }) => {
                const { name } = field;
                return (
                  <Input
                    id={name}
                    type="password"
                    placeholder="Your confirm password..."
                    icon={<i className="fa-solid fa-lock"></i>}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                    disabled={isSubmitting}
                    {...field}
                  />
                );
              }}
            />
            <Checkbox className={cx('policy')} name="policy" label="I agree policy" />
            <Button
              className={cx('btn-submit')}
              type="submit"
              fullWidth
              icon={() => <i className="fa-solid fa-user-plus"></i>}
              isLoading={isSubmitting}
            >
              Register
            </Button>
            <SocialAuth disabled={isSubmitting} />
            <div className={cx('note')}>
              Already have an account?
              <Link to="/auth/login" disabled={isSubmitting}>
                Login
              </Link>
            </div>
          </form>
        </>
      );
    } else {
      return <SuccessAuth heading="Register" />;
    }
  };
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>{renderUIRegister()}</div>
    </>
  );
};
export default RegisterPage;
