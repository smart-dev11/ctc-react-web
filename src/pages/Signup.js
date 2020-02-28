/** @jsx jsx */
import { jsx } from 'theme-ui';
import Input from '../components/Input';
import Link from '../components/Link';
import Button from '../components/Button';

export default () => {
  return (
    <div
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        sx={{
          width: 320,
          py: 9,
          px: 6,
          boxShadow: 'medium',
          textAlign: 'center'
        }}
      >
        <div sx={{ fontSize: 2, fontWeight: 'bold' }}>Create an Account</div>
        <Input placeholder="Full Name" sx={{ mt: 10 }}></Input>
        <Input placeholder="Email" sx={{ mt: 4 }}></Input>
        <Input placeholder="Password" sx={{ mt: 4 }}></Input>
        <Input placeholder="Confirm Password" sx={{ mt: 4 }}></Input>
        <div sx={{ mt: 8, fontSize: 10, lineHeight: 2 }}>
          By creating an account you agree to our <br />
          Terms of Service and Privacy Policy
        </div>
      </div>
      <Link to="/signin" color="primary" sx={{ mt: 5 }}>
        I already have an account - sign in
      </Link>
      <Button sx={{ mt: 5, width: 320 }}>CONTINUE</Button>
    </div>
  );
};
