/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ description, maxLines = 15, ...props }) => (
  <div
    sx={{
      fontSize: 2,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: `${maxLines}`,
      whiteSpace: 'pre-line',
      wordBreak: 'break-all',
      // '.keyword-highlight': {
      //   bg: 'primary',
      //   color: 'white',
      //   py: '1px',
      //   px: '3px',
      //   borderRadius: 4,
      // },
    }}
    {...props}
  >
    {description}
  </div>
);
