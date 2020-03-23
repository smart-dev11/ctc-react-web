/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import Link from './Link';
import { useSelector, useDispatch } from 'react-redux';
import fp from 'lodash/fp';
import { logout } from '../store/auth';

export default () => {
  const history = useHistory();
  const loggedin = useSelector(fp.get('auth.loggedin'));
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    history.replace('/signup');
  };

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: ['column', 'column', 'row'],
        alignItems: 'center',
        px: [40, 60, 90, 120],
        py: 4,
        boxShadow: 'medium',
        bg: 'white',
        zIndex: 1
      }}
    >
      <div
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: ['column', 'row'],
          alignItems: 'center',
          width: ['100%', '100%', 'auto']
        }}
      >
        <img
          src={require('../assets/logo.png')}
          alt="Logo"
          sx={{ pr: [0, 11], ml: -4 }}
        ></img>
        <Input
          leftComponent={
            <div sx={{ pr: 2 }}>
              <i className="fas fa-search"></i>
            </div>
          }
          placeholder="Find Companies & Connections"
          sx={{
            px: 3,
            flex: 1,
            mt: [4, 0],
            width: ['100%', 'auto'],
            maxWidth: 545
          }}
          inputSx={{ py: 2, fontSize: 2 }}
        ></Input>
      </div>
      <div
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: [4, 4, 0],
          ml: [0, 0, 11],
          width: ['100%', '100%', 'auto']
        }}
      >
        {loggedin && (
          <Fragment>
            <Link onClick={handleLogoutClick}>LOGOUT</Link>
            <div sx={{ fontSize: 5, color: 'border', pl: 6 }}>
              <i className="fas fa-user-circle"></i>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
