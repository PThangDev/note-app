import * as yup from 'yup';
const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required!')
    .min(6, 'Password must have at least 6 characters')
    .max(15, 'Username must be at most 15 characters'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //   'Password must have at least one uppercase letter, one lowercase letter one number and one special character!'
  // ),
});

export default loginSchema;
