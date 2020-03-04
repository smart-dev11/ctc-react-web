/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Link from '../components/Link';
import Button from '../components/Button';
import Page from '../components/Page';
import FormError from '../components/FormError';
import { register, REGISTER } from '../store/auth';
import { createLoadingSelector } from '../store/loading';
import LoadingOverlay from 'react-loading-overlay';

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector(createLoadingSelector([REGISTER]));
  console.log(loading);
  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      fullName: 'Eamon',
      email: 'eamon@gmail.com',
      password: 'abc123',
      confirmPassword: 'abc123'
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Required')
    }),
    onSubmit: values => {
      dispatch(register(values.email, values.password));
    }
  });
  return (
    <Page sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <LoadingOverlay
        active={loading}
        spinner
        styles={{
          overlay: base => ({
            ...base,
            background: 'rgba(255, 255, 255, 0.7)'
          }),
          spinner: base => ({
            ...base,
            '& svg circle': {
              stroke: '#FAAC1E'
            }
          })
        }}
      >
        <form
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            sx={{
              width: 320,
              py: 9,
              px: 6,
              boxShadow: 'medium',
              textAlign: 'center',
              backgroundColor: 'white'
            }}
          >
            <div sx={{ fontSize: 2, fontWeight: 'bold' }}>
              Create an Account
            </div>
            <Input
              name="fullName"
              placeholder="Full Name"
              sx={{ mt: 10 }}
              {...getFieldProps('fullName')}
            ></Input>
            {touched.fullName && errors.fullName && (
              <FormError>{errors.fullName}</FormError>
            )}
            <Input
              name="email"
              placeholder="Email"
              sx={{ mt: 4 }}
              {...getFieldProps('email')}
            ></Input>
            {touched.email && errors.email && (
              <FormError>{errors.email}</FormError>
            )}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              sx={{ mt: 4 }}
              {...getFieldProps('password')}
            ></Input>
            {touched.password && errors.password && (
              <FormError>{errors.password}</FormError>
            )}
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              sx={{ mt: 4 }}
              {...getFieldProps('confirmPassword')}
            ></Input>
            {touched.confirmPassword && errors.confirmPassword && (
              <FormError>{errors.confirmPassword}</FormError>
            )}
            <div sx={{ mt: 8, fontSize: 10, lineHeight: 2 }}>
              By creating an account you agree to our <br />
              Terms of Service and Privacy Policy
            </div>
          </div>
          <Link to="/signin" color="primary" sx={{ mt: 5 }}>
            I already have an account - sign in
          </Link>
          <Button type="submit" sx={{ mt: 5, width: 320 }}>
            CONTINUE
          </Button>
        </form>
      </LoadingOverlay>
    </Page>
  );
};
