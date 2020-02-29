/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { darken } from 'polished';

export default ({ children, ...props }) => {
  const { theme } = useThemeUI();
  return (
    <button
      sx={{
        py: 3,
        px: 4,
        bg: 'primary',
        color: 'white',
        fontSize: 2,
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        boxShadow: 'medium',
        ':hover': {
          bg: darken(0.1, theme.colors.primary)
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
