/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import LoadingOverlay from 'react-loading-overlay';

export default ({
  loading,
  overlayColor = 'rgba(255, 255, 255, 0.7)',
  children,
  ...props
}) => {
  const { theme } = useThemeUI();
  return (
    <LoadingOverlay
      active={loading}
      spinner
      fadeSpeed={200}
      styles={{
        overlay: base => ({
          ...base,
          background: overlayColor
        }),
        spinner: base => ({
          ...base,
          '& svg circle': {
            stroke: theme.colors.primary
          }
        })
      }}
      {...props}
    >
      {children}
    </LoadingOverlay>
  );
};
