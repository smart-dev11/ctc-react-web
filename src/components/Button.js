/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { darken } from 'polished';

export default ({ children, primary = true, ...props }) => {
  const { theme } = useThemeUI();
  return (
    <button
      sx={{
        py: 3,
        px: 4,
        bg: primary ? 'primary' : 'white',
        color: primary ? 'white' : 'text',
        fontSize: 2,
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        boxShadow: 'medium',
        ':hover': {
          bg: darken(0.1, primary ? theme.colors.primary : theme.colors.white),
        },
      }}
      {...props}
    >
      {children}
    </button>
  );
};
