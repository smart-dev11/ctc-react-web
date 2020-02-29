/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, ...props }) => (
  <div
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      px: [40, 60, 90, 120],
      py: 15
    }}
    {...props}
  >
    {children}
  </div>
);
