/** @jsx jsx */
import { jsx } from 'theme-ui';

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
      <input
        type="text"
        sx={{ borderColor: 'border', py: 1, px: 3 }}
        placeholder="Find Companies & Connections"
      ></input>
    </div>
  </div>
);
