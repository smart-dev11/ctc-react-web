/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';

export default ({ leftComponent, sx, ...props }) => {
  const { theme } = useThemeUI();

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 4,
        px: 5,
        border: `1px solid ${theme.colors.border}`,
        ...sx
      }}
    >
      {leftComponent}
      <input
        type="text"
        sx={{
          border: 'none',
          outline: 'none',
          '::placeholder': { color: 'placeholder' }
        }}
        {...props}
      ></input>
    </div>
  );
};
