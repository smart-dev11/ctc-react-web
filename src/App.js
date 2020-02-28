/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import Navbar from './components/Navbar';
import GlobalStyles from './components/GlobalStyles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Signin from './pages/Signin';

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
                <Route path="/signin">
                  <Signin></Signin>
                </Route>
                <Route path="/" exact>
                  <Redirect to={{ pathname: '/signup' }}></Redirect>
                </Route>
              </Switch>
              <Footer></Footer>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
