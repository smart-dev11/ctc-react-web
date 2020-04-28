/** @jsx jsx */
import { jsx } from "theme-ui";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

export default ({ isOpen, onClose, onProceed }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div
        sx={{
          px: 12,
          pb: 10,
          pt: 13,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 565,
        }}
      >
        <div sx={{ fontSize: 2, textAlign: "center" }}>
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
