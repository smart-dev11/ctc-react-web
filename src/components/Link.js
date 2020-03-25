/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export default ({ to, color = 'text', disabled, children, ...props }) => {
  const { theme } = useThemeUI();
  const sx = {
    textDecoration: 'none',
    color,
    fontSize: 2,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ':hover': disabled ? {} : { color: darken(0.1, theme.colors[color]) }
  };
  return to ? (
    <Link to={to} sx={sx} {...props}>
      {children}
    </Link>
  ) : (
    <a sx={sx} {...props}>
      {children}
    </a>
  );
};
