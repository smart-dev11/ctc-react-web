/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { darken } from 'polished';

export default ({ children, ...props }) => {
  const { theme } = useThemeUI();
  return (
    <button
      sx={{
        p: 4,
        bg: 'primary',
        color: 'white',
        fontSize: 2,
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
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
