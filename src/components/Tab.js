/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { forwardRef } from 'react';

export default forwardRef(({ children, active, ...props }, ref) => {
  const { theme } = useThemeUI();
  return (
    <div
      ref={ref}
      sx={{
        display: 'inline-block',
        py: 2,
        px: 3,
        fontSize: 2,
        cursor: 'pointer',
        borderBottom: active
          ? `2px solid ${theme.colors.primary}`
          : `2px solid transparent`
      }}
      {...props}
    >
      {children}
    </div>
  );
});
