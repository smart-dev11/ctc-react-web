/** @jsx jsx */
import { jsx } from "theme-ui";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

export default ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div
        sx={{
          px: 8,
          py: 6,
          display: "flex",
          flexDirection: "column",
          width: 340,
        }}
      >
        <div sx={{ fontSize: 3, fontWeight: "bold" }}>Auto Update</div>
        <div sx={{ fontSize: 2, mt: 3 }}>
          This will create a new version of your résumé, replacing similar
          keywords found in your résumé with the relevant keywords found in the
          job posting.
        </div>
        <div sx={{ fontSize: 2, mt: 3 }}>This helps with ATS rankings.</div>
        <div sx={{ fontSize: 2, mt: 3 }}>
          Don’t worry, your original résumé will not be deleted or overwritten.
        </div>
        <div sx={{ mt: 9, alignSelf: "center" }}>
          <Button onClick={onConfirm} sx={{ px: 15 }}>
            Got It!
          </Button>
        </div>
      </div>
    </Modal>
  );
};
