/** @jsx jsx */
import { jsx } from 'theme-ui';
import Link from '../../components/Link';
import Input from '../../components/Input';

export default ({ position, onPositionChange, onSave, onClose }) => (
  <div
    sx={{
      display: 'inline-grid',
      gridTemplateColumns: 'auto auto auto',
      gridGap: 2,
      width: 'fit-content',
      alignItems: 'center'
    }}
  >
    <Input
      value={position}
      onChange={e => onPositionChange(e.target.value)}
      inputSx={{ py: 2 }}
      sx={{ width: 200 }}
    ></Input>
    <Link onClick={onSave} color="primary" sx={{ fontSize: 3 }}>
      <i className="fas fa-save"></i>
    </Link>
    <Link onClick={onClose} color="primary" sx={{ fontSize: 3 }}>
      <i className="fas fa-times"></i>
    </Link>
  </div>
);
