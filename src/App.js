/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { ThemeProvider } from 'theme-ui';
import { Provider } from 'react-redux';
import theme from './theme';
import Navbar from './components/Navbar';
import GlobalStyles from './components/GlobalStyles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Jobs from './pages/Jobs';
import ResumeStudio from './pages/ResumeStudio';
import configureStore from './store/configureStore';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
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
                  <PrivateRoute path="/jobs/:id/resume-studio">
                    <ResumeStudio></ResumeStudio>
                  </PrivateRoute>
                  <PrivateRoute path="/jobs">
                    <Jobs></Jobs>
                  </PrivateRoute>
                  <Route path="/" exact>
                    <Redirect to={{ pathname: '/jobs' }}></Redirect>
                  </Route>
                </Switch>
                <Footer></Footer>
              </div>
            </div>
          </Fragment>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
