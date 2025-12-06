import Button from "../button/button";
import ModalWindow from "../modal-window/modal-window";
import "./confirmation-modal-window.sass";

type Props = {
  onConfirm: () => void;
  onReject: () => void;
  isOpen: boolean;
  title: string;
};

const ConfirmationModalWindow = ({
  isOpen,
  onConfirm,
  onReject,
  title,
}: Props) => {
  return (
    <ModalWindow isOpen={isOpen} onClose={onReject}>
      <div className="confirmation-modal-window">
        <div className="confirmation-modal-window__title">{title}</div>

        <div className="confirmation-modal-window__button-list">
          <Button onClick={onConfirm}>Confirm</Button>

          <Button onClick={onReject} color="red">
            Reject
          </Button>
        </div>
      </div>
    </ModalWindow>
  );
};

export default ConfirmationModalWindow;
