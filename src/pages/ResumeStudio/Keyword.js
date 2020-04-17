/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, ...props }) => (
  <div
    sx={{
      py: 2,
      px: 5,
      bg: 'border',
      color: 'text',
      borderRadius: 20,
      display: 'inline-block',
      mr: 4,
      mb: 3,
      cursor: 'pointer',
    }}
    {...props}
  >
    {children}
  </div>
);
