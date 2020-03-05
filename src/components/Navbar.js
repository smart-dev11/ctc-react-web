/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useLocation, useHistory } from 'react-router-dom';
import Input from './Input';
import Link from './Link';
import { useSelector, useDispatch } from 'react-redux';
import fp from 'lodash/fp';
import { logout } from '../store/auth';

export default () => {
  const location = useLocation();
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
        flexDirection: ['column', null, null, 'row'],
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
          width: ['100%', null, null, 'auto']
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
          sx={{ px: 3, flex: 1, mt: [4, 0], width: ['100%', 'auto'] }}
          inputSx={{ py: 2, fontSize: 2 }}
        ></Input>
      </div>
      {loggedin && (
        <div
          sx={{
            pl: [0, null, null, 10],
            pt: [4, null, null, 0],
            width: ['100%', null, null, 'auto'],
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Link
            to="/jobs"
            color={location.pathname === '/jobs' ? 'primary' : 'text'}
          >
            JOBS
          </Link>
          <Link
            to="/resumes"
            color={location.pathname === '/resumes' ? 'primary' : 'text'}
          >
            RESUMES
          </Link>
          <Link onClick={handleLogoutClick}>LOGOUT</Link>
          <div sx={{ fontSize: 5, color: 'border' }}>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      )}
    </div>
  );
};
