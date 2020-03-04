/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import SocialContainer from '../components/SocialContainer';
import Page from '../components/Page';
import Error from '../components/Error';
import { createLoadingSelector } from '../store/loading';
import { createErrorSelector } from '../store/error';
import { LOGIN, login } from '../store/auth';
import LoadingOverlay from '../components/LoadingOverlay';

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector(createLoadingSelector([LOGIN]));
  const error = useSelector(createErrorSelector([LOGIN]));

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      email: 'eamon@gmail.com',
      password: 'abc123'
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: values => {
      dispatch(login(values.email, values.password));
    }
  });

  return (
    <Page sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <LoadingOverlay loading={loading}>
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
            <div sx={{ fontSize: 2, fontWeight: 'bold' }}>Login</div>
            <div sx={{ mt: 8 }}>
              <SocialContainer outline>
                <i className="fab fa-linkedin-in"></i>
              </SocialContainer>
              <SocialContainer outline sx={{ ml: 3 }}>
                <i className="fab fa-facebook-f"></i>
              </SocialContainer>
              <SocialContainer outline sx={{ ml: 3 }}>
                <i className="fab fa-google"></i>
              </SocialContainer>
            </div>
            <div
              sx={{
                mt: 8,
                mb: 8,
                borderBottomWidth: 1,
                borderBottomColor: 'border',
                borderBottomStyle: 'solid'
              }}
            ></div>
            {error && <Error sx={{ textAlign: 'center' }}>{error}</Error>}
            <Input
              name="email"
              placeholder="Email"
              sx={{ mt: 4 }}
              {...getFieldProps('email')}
            ></Input>
            {touched.email && errors.email && <Error>{errors.email}</Error>}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              sx={{ mt: 4 }}
              {...getFieldProps('password')}
            ></Input>
            {touched.password && errors.password && (
              <Error>{errors.password}</Error>
            )}
            <div sx={{ mt: 8, textAlign: 'left' }}>
              <input type="checkbox"></input>
              Remember Me
            </div>
          </div>
          <Button sx={{ mt: 5, width: 320 }}>CONTINUE</Button>
        </form>
      </LoadingOverlay>
    </Page>
  );
};
