/** @jsx jsx */
import { jsx } from 'theme-ui';
import Input from './Input';
import Link from './Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon
            icon={faSearch}
            sx={{ pr: 2, fontSize: 3 }}
            fixedWidth
          ></FontAwesomeIcon>
        }
        placeholder="Find Companies & Connections"
        sx={{ px: 3, flex: 1 }}
        inputSx={{ py: 2 }}
        inputSx={{ fontSize: 2 }}
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
