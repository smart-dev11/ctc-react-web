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
        <div sx={{ fontSize: 2, fontWeight: 'bold' }}>Login</div>
        <Input placeholder="Email" sx={{ mt: 4 }}></Input>
        <Input placeholder="Password" sx={{ mt: 4 }}></Input>
      </div>
      <Button sx={{ mt: 5, width: 320 }}>CONTINUE</Button>
    </div>
  );
};
