/** @jsx jsx */
import { jsx } from 'theme-ui';
import { forwardRef } from 'react';
import Link from '../../components/Link';
import Input from '../../components/Input';

export default forwardRef(
  ({ position, inputRef, onPositionChange, onSave, onClose }, ref) => (
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
        ref={ref}
        value={position}
        onChange={e => onPositionChange(e.target.value)}
        inputSx={{ py: 2 }}
        sx={{ width: 180 }}
      ></Input>
      <Link onClick={onSave} color="primary" sx={{ fontSize: 3 }}>
        <i className="fas fa-save"></i>
      </Link>
      <Link onClick={onClose} color="primary" sx={{ fontSize: 3 }}>
        <i className="fas fa-times"></i>
      </Link>
    </div>
  )
);
