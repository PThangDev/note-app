import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from 'src/layouts/UI/Button';
import { Checkbox, Input } from 'src/layouts/UI/Form';
import styles from './Register.module.scss';
import registerSchema from './registerSchema';
interface Props {}

const cx = classNames.bind(styles);

const RegisterPage: FC<Props> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
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
  const handleRegister = (data: any) => {};
  return (
    <div className={cx('wrapper')}>
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
