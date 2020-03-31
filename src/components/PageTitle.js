/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, ...props }) => (
  <h1
    sx={{
      color: 'text',
      fontSize: 5,
      fontWeight: 'normal',
      mt: 0,
      mb: 5
    }}
    {...props}
  >
    {children}
  </h1>
);
