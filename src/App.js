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
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Resumes from './pages/Resumes';
import SavedJobs from './pages/SavedJobs';
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
                  <Route path="/resumes">
                    <Resumes></Resumes>
                  </Route>
                  <Route path="/saved-jobs">
                    <SavedJobs></SavedJobs>
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
    </Provider>
  );
}

export default App;
