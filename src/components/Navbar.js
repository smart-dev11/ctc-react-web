/** @jsx jsx */
import { jsx } from 'theme-ui';
import Input from './Input';
import Link from './Link';

export default () => (
  <div
    sx={{
      display: 'flex',
      alignItems: 'center',
      px: 140,
      py: 4,
      boxShadow: 'medium',
      bg: 'white'
    }}
  >
    <div sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <img src={require('../assets/logo.png')} alt="Logo" sx={{ pr: 11 }}></img>
      <Input
        leftComponent={
          <div sx={{ pr: 2 }}>
            <i class="fas fa-search"></i>
          </div>
        }
        placeholder="Find Companies & Connections"
        sx={{ px: 3, flex: 1 }}
        inputSx={{ py: 2, fontSize: 2 }}
      ></Input>
    </div>
    <div
      sx={{
        pl: 10,
        maxWidth: 600,
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Link>JOBS</Link>
      <Link>RESUMES</Link>
      <Link>LOGIN</Link>
    </div>
  </div>
);
