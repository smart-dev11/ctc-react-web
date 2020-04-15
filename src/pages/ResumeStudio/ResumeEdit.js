/** @jsx jsx */
import { jsx } from 'theme-ui';
import TextareaAutoSize from 'react-autosize-textarea';

export default (props) => {
  return (
    <TextareaAutoSize
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'border',
        px: 3,
        py: 2,
        fontSize: 2,
        color: 'text',
        resize: 'none',
        ':focus': { outline: 'none' },
      }}
      {...props}
    ></TextareaAutoSize>
  );
};
