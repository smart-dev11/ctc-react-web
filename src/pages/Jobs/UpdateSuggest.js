/** @jsx jsx */
import { jsx } from 'theme-ui';
import Modal from 'react-modal';
import Button from '../../components/Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    borderRadius: 0,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 2,
  },
};

export default ({ isOpen, onClose, onProceed }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
          alignItems: 'center',
          width: 565,
        }}
      >
        <div sx={{ fontSize: 2, textAlign: 'center' }}>
          We strongly suggest you update your resumewith similar keywords found
          in the job description before you apply. Visit the Resume Studio to
          edit your resume now.
        </div>
        <div sx={{ mt: 9 }}>
          <Button onClick={onProceed}>Proceed anyway</Button>
        </div>
      </div>
    </Modal>
  );
};
