/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { ThemeProvider } from 'theme-ui';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './theme';
import Navbar from './components/Navbar';
import GlobalStyles from './components/GlobalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Jobs from './pages/Jobs';
import ResumeStudio from './pages/ResumeStudio';
import configureStore from './store/configureStore';

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
                    <PrivateRoute path="/" exact>
                      <Jobs></Jobs>
                    </PrivateRoute>
                    <Route path="/signup" exact>
                      <Signup></Signup>
                    </Route>
                    <Route path="/signin" exact>
                      <Signin></Signin>
                    </Route>
                    <PrivateRoute path="/:positionId/:jobId">
                      <ResumeStudio></ResumeStudio>
                    </PrivateRoute>
                  </Switch>
                  <Footer></Footer>
                </div>
              </div>
            </Fragment>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
