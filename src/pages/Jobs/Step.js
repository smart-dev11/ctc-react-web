/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ step, detail, ...props }) => (
  <div sx={{ mt: 8, fontSize: 2, textAlign: 'left' }} {...props}>
    <span sx={{ fontWeight: 'bold' }}>Step {step}</span> | {detail}
  </div>
);
