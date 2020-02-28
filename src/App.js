/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import Navbar from './components/Navbar';
import GlobalStyles from './components/GlobalStyles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import Link from './components/Link';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Fragment>
          <GlobalStyles></GlobalStyles>
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
            <div
              sx={{
                flex: 1,
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Switch>
                <Route path="/signup">
                  <Signup></Signup>
                </Route>
                <Route path="/" exact>
                  <Redirect to={{ pathname: '/signup' }}></Redirect>
                </Route>
              </Switch>
              <div sx={{ textAlign: 'center', bg: 'white', py: 12 }}>
                <div>
                  <Link>Messages</Link>
                  <Link sx={{ pl: 12 }}>Resumes</Link>
                  <Link sx={{ pl: 12 }}>Jobs</Link>
                </div>
                <div sx={{ pt: 4 }}>
                  <Link>About Us</Link>
                  <Link sx={{ pl: 12 }}>Contact Us</Link>
                  <Link sx={{ pl: 12 }}>Refund Policy</Link>
                  <Link sx={{ pl: 12 }}>Login</Link>
                </div>
                <div sx={{ pt: 4 }}>Copyright © 2019 Couch to Career</div>
              </div>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
