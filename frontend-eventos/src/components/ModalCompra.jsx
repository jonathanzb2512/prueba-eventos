import ReactDOM from "react-dom";
import "../index.css";

export const ModalCompra = ({
  evento,
  cantidad,
  total,
  formatoMoneda,
  handleCantidadChange,
  onConfirmarCompra,
  onCerrar,
  comprador,
  setComprador,
}) => {

  console.log("🧩 ModalCompra renderizado con:", evento); // 👈 Aquí agrégalo
  if (!evento) return null;

  const modalContent = (
    <div className="modal-backdrop show d-flex align-items-center justify-content-center">
      <div
        className="modal-content bg-dark text-light border-secondary p-4 rounded shadow-lg"
        style={{ width: "400px" }}
      >
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h5 className="modal-title">🧾 Comprar boletos — {evento.nombre}</h5>
          <button
            className="btn btn-close btn-sm btn-light"
            onClick={onCerrar}
          ></button>
        </div>

        <div className="modal-body">

          <div className="form-group mt-3">
              <label><strong>Nombre del Comprador</strong></label>
              <input
                type="text"
                className="form-control bg-secondary text-light"
                value={comprador}
                onChange={(e) => setComprador(e.target.value)}
              />
          </div>

          <p><strong>📍 Ubicación:</strong> {evento.lugar}</p>
          <p><strong>🎟️ Boletos disponibles:</strong> {evento.boletos_disponibles}</p>
          <p><strong>💰 Precio unitario:</strong> {formatoMoneda(evento.precio)}</p>

          <div className="form-group mt-3">
            <label><strong>Cantidad de boletos:</strong></label>
            <input
              type="number"
              className="form-control bg-secondary text-light"
              min="1"
              max={evento.boletos_disponibles}
              value={cantidad}
              onChange={(e) => handleCantidadChange(e, evento.precio)}
            />
          </div>

          <div className="alert alert-info mt-3">
            <strong>Total a pagar:</strong> {formatoMoneda(total)}
          </div>
        </div>

        <div className="modal-footer d-flex justify-content-end">
          <button className="btn btn-secondary" onClick={onCerrar}>Cancelar</button>
          <button className="btn btn-success" onClick={onConfirmarCompra}>
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );

  // 👇 Esta línea es la clave
  return ReactDOM.createPortal(modalContent, document.body);
};
