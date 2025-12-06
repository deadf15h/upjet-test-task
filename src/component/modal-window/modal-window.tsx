import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./modal-window.sass";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalWindow = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") || document.body;

  return ReactDOM.createPortal(
    <div className="modal-window" onClick={onClose}>
      <div
        className="modal-window__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-window__close" onClick={onClose}>
          X
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ModalWindow;
