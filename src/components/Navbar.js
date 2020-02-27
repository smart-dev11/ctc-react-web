/** @jsx jsx */
import { jsx } from 'theme-ui';
import Input from './Input';
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
        leftComponent={<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>}
        placeholder="Find Companies & Connections"
        sx={{ borderColor: 'border', py: 1, px: 3 }}
      ></Input>
    </div>
  </div>
);
