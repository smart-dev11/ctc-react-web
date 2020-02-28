/** @jsx jsx */
import { jsx } from 'theme-ui';
import Link from './Link';

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
      <div
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 56,
          height: 56,
          borderRadius: '50%',
          bg: 'placeholder',
          color: 'white'
        }}
      >
        <i class="fab fa-linkedin-in"></i>
      </div>
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
