import { ReactNode } from "react";
import "./modal-window.sass";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalWindow = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
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
    </div>
  );
};

export default ModalWindow;
