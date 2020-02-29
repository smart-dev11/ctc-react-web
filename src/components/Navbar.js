/** @jsx jsx */
import { jsx } from 'theme-ui';
import Input from './Input';
import Link from './Link';

export default () => (
  <div
    sx={{
      display: 'flex',
      flexDirection: ['column', null, null, 'row'],
      alignItems: 'center',
      px: [40, 60, 90, 120],
      py: 4,
      boxShadow: 'medium',
      bg: 'white'
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
        sx={{ pr: [0, 11] }}
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
      <Link>JOBS</Link>
      <Link>RESUMES</Link>
      <Link>LOGIN</Link>
      <i
        className="fas fa-user-circle"
        sx={{ fontSize: 5, color: 'border' }}
      ></i>
    </div>
  </div>
);
