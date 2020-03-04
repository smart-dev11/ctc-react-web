/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ children, ...props }) => (
  <div sx={{ mt: 2, textAlign: 'left' }} {...props}>
    {children}
  </div>
);
