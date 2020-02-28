/** @jsx jsx */
import { jsx } from 'theme-ui';
import Link from './Link';
import SocialContainer from './SocialContainer';

export default () => (
  <div
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bg: 'white',
      py: 12
    }}
  >
    <div>
      <SocialContainer>
        <i class="fab fa-linkedin-in"></i>
      </SocialContainer>
      <SocialContainer sx={{ ml: 3 }}>
        <i class="fab fa-facebook-f"></i>
      </SocialContainer>
      <SocialContainer sx={{ ml: 3 }}>
        <i class="fab fa-youtube"></i>
      </SocialContainer>
      <SocialContainer sx={{ ml: 3 }}>
        <i class="fab fa-instagram"></i>
      </SocialContainer>
    </div>
    <div sx={{ mt: 4 }}>
      <Link>Messages</Link>
      <Link sx={{ pl: 12 }}>Resumes</Link>
      <Link sx={{ pl: 12 }}>Jobs</Link>
    </div>
    <div sx={{ pt: 4 }}>
      <Link>About Us</Link>
      <Link sx={{ pl: 12 }}>Contact Us</Link>
      <Link sx={{ pl: 12 }}>Refund Policy</Link>
      <Link sx={{ pl: 12 }}>Login</Link>
    </div>
    <div sx={{ pt: 4 }}>Copyright © 2019 Couch to Career</div>
  </div>
);
