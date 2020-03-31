/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useSelector } from 'react-redux';
import fp from 'lodash/fp';
import { Route, Redirect } from 'react-router-dom';

export default ({ children, ...props }) => {
  const loggedin = useSelector(fp.get('auth.loggedin'));
  return (
    <Route {...props}>
      {loggedin ? children : <Redirect to={{ pathname: '/signup' }}></Redirect>}
    </Route>
  );
};
