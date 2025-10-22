// src/components/ModalBase.jsx
import ReactDOM from "react-dom";

export const ModalBase = ({ title, onClose, children, width = "400px" }) => {
  const modal = (
    <div className="modal-backdrop show d-flex align-items-center justify-content-center">
      <div
        className="modal-content bg-dark text-light border-secondary p-4 rounded shadow-lg"
        style={{ width }}
      >
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h5 className="modal-title">{title}</h5>
          <button
            className="btn btn-close btn-sm btn-light"
            onClick={onClose}
          ></button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};
