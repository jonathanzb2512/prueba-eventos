import { ModalBase } from "./ModalBase";

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
  if (!evento) return null;

  return (
    <ModalBase title={`🧾 Comprar boletos — ${evento.nombre}`} onClose={onCerrar}>
      <div className="form-group mt-3">
        <label><strong>Nombre del comprador</strong></label>
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

      <div className="modal-footer d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={onCerrar}>Cancelar</button>
        <button className="btn btn-success" onClick={onConfirmarCompra}>
          Confirmar compra
        </button>
      </div>
    </ModalBase>
  );
};
