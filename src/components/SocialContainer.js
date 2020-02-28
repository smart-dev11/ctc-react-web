/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useThemeUI } from 'theme-ui';

export default ({ outline, children, ...props }) => {
  const { theme } = useThemeUI();
  return (
    <div
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        height: 56,
        borderRadius: '50%',
        bg: outline ? 'white' : 'placeholder',
        border: `1px solid ${theme.colors.border}`,
        color: outline ? 'border' : 'white'
      }}
      {...props}
    >
      {children}
    </div>
  );
};
