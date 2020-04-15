/** @jsx jsx */
import { jsx } from 'theme-ui';
import TextareaAutoSize from 'react-autosize-textarea';

export default (props) => {
  return (
    <TextareaAutoSize
      sx={{
        width: '100%',
        border: 'none',
        fontSize: 2,
        color: 'text',
        resize: 'none',
        ':focus': { outline: 'none' },
      }}
      {...props}
    ></TextareaAutoSize>
  );
};
