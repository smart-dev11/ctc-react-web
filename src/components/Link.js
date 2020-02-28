/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, innerSx, props }) => (
  <a
    sx={{
      color: 'text',
      fontSize: 2,
      cursor: 'pointer',
      ':hover': { color: 'primary' },
      ...innerSx
    }}
    {...props}
  >
    {children}
  </a>
);
