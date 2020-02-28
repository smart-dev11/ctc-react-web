/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export default ({ to = '/', color = 'text', children, ...props }) => {
  const { theme } = useThemeUI();
  return (
    <Link
      to={to}
      sx={{
        textDecoration: 'none',
        color,
        fontSize: 2,
        cursor: 'pointer',
        ':hover': { color: darken(0.1, theme.colors[color]) }
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
