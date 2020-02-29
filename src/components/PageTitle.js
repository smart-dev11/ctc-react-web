/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, ...props }) => (
  <h1
    sx={{
      color: 'text',
      fontSize: 5,
      fontWeight: 'normal'
    }}
    {...props}
  >
    {children}
  </h1>
);
