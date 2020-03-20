/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';

export default ({ leftComponent, className, inputSx, ...props }) => {
  const { theme } = useThemeUI();

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 5,
        border: `1px solid ${theme.colors.border}`,
        backgroundColor: 'white'
      }}
      className={className}
    >
      {leftComponent}
      <input
        type="text"
        sx={{
          flex: 1,
          px: 0,
          py: 4,
          border: 'none',
          outline: 'none',
          '::placeholder': { color: 'placeholder' },
          width: '100%',
          ...inputSx
        }}
        {...props}
      ></input>
    </div>
  );
};
