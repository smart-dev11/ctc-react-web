/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';

export default ({ leftComponent, containerSx, inputSx, ...props }) => {
  const { theme } = useThemeUI();

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 4,
        px: 5,
        border: `1px solid ${theme.colors.border}`,
        ...containerSx
      }}
    >
      {leftComponent}
      <input
        type="text"
        sx={{
          flex: 1,
          p: 0,
          border: 'none',
          outline: 'none',
          '::placeholder': { color: 'placeholder' },
          ...inputSx
        }}
        {...props}
      ></input>
    </div>
  );
};
