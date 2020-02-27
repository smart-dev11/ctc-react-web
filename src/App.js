/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bg: 'body',
          width: '100%',
          height: '100vh'
        }}
      >
        <Navbar></Navbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
