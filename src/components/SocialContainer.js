/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, ...props }) => (
  <div
    sx={{
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 56,
      height: 56,
      borderRadius: '50%',
      bg: 'placeholder',
      color: 'white'
    }}
    {...props}
  >
    {children}
  </div>
);
