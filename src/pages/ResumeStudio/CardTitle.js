/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, ...props }) => (
  <div
    sx={{
      fontSize: 2,
      fontWeight: 'bold',
      borderBottom: '1px solid',
      borderColor: 'border',
      pb: 3,
    }}
    {...props}
  >
    {children}
  </div>
);
