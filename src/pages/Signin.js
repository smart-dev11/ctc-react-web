/** @jsx jsx */
import { jsx } from 'theme-ui';
import Input from '../components/Input';
import Button from '../components/Button';
import SocialContainer from '../components/SocialContainer';

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
            borderBottomWidth: 1,
            borderBottomColor: 'border',
            borderBottomStyle: 'solid'
          }}
        ></div>
        <Input placeholder="Email" sx={{ mt: 8 }}></Input>
        <Input placeholder="Password" sx={{ mt: 4 }}></Input>
        <div sx={{ mt: 8, textAlign: 'left' }}>
          <input type="checkbox"></input>
          Remember Me
        </div>
      </div>
      <Button sx={{ mt: 5, width: 320 }}>CONTINUE</Button>
    </div>
  );
};
