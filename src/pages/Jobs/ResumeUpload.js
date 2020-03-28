/** @jsx jsx */
import { jsx } from 'theme-ui';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import Button from '../../components/Button';
import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0
  }
};

export default ({ isOpen, onClose }) => {
  const [fileName, setFileName] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: files => {
      if (!files.length) return;
      setFileName(files[0].name);
    }
  });
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        setFileName('');
      }}
      style={customStyles}
      ariaHideApp={false}
    >
      <div
        sx={{
          px: 12,
          pb: 10,
          pt: 13,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          sx={{
            border: '1px dashed',
            borderColor: 'text',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: 585,
            height: 265
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()}></input>
          <i className="fas fa-upload" sx={{ fontSize: 7 }}></i>
          <div sx={{ fontSize: 3, mt: 3 }}>{fileName || 'Drag and drop'}</div>
        </div>
        <div sx={{ mt: 9 }}>
          <Button onClick={onClose}>
            Upload resume <i className="fas fa-plus"></i>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
