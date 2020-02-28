export default {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    body: '#F7F7F7',
    primary: '#FAAC1E',
    text: '#707070',
    placeholder: '#DDDDDD',
    border: '#DDDDDD'
  },
  space: [...Array(20).keys()].map(val => val * 4),
  fonts: {},
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700
  },
  shadows: {
    medium: '0 3px 6px rgba(0, 0, 0, .16)'
  }
};
