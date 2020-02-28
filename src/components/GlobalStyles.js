import React from 'react';
import { Global } from '@emotion/core';
export default () => (
  <Global
    styles={theme => ({
      '*': {
        boxSizing: 'border-box',
        fontFamily: 'Gotham',
        fontSize: theme.fontSizes[1]
      },
      '@font-face': {
        fontFamily: 'Gotham',
        src: `url("${require('../assets/gotham.otf')}") format("opentype")`
      }
    })}
  />
);
