import * as yup from 'yup';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid Email'),
});
export default forgotPasswordSchema;
