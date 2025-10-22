import { useState } from "react";
import { useCompraBoletos } from "../hooks/useCompraBoletos";
import { useEventoEdicion } from "../hooks/useEventoEdicion";
import { createCompra } from "../api/compras";
import { useEventos } from "../context/EventosContext";
import { ModalCompra } from "./ModalCompra";
import { EditarEventoForm } from "./EditarEventoForm";

export const EventCard = ({ evento }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comprador, setComprador] = useState("");

  const { cantidad, total, formatoMoneda, handleCantidadChange, resetCompra } =
    useCompraBoletos(evento.precio);

  const { handleBuy, handleDelete } = useEventos();
  const { editando, setEditando, formData, setFormData, guardarCambios } =
    useEventoEdicion(evento);

  const sinBoletos = evento.boletos_disponibles <= 0;

  const handleConfirmarCompra = async () => {
    if (!comprador.trim()) {
      alert("Por favor ingresa tu nombre antes de comprar.");
      return;
    }

    if (cantidad > evento.boletos_disponibles) {
      alert("🚫 No hay suficientes boletos disponibles.");
      return;
    }

    const nuevaCompra = {
      evento_id: evento.id,
      comprador,
      cantidad_boletos: cantidad,
      fecha_compra: new Date().toISOString().split("T")[0],
      total_compra: total,
    };

    try {
      await createCompra(nuevaCompra);
      handleBuy(evento.id, cantidad);
      alert(`🎫 ¡Compra registrada con éxito!\n${formatoMoneda(total)}`);
      setMostrarModal(false);
      resetCompra();
      setComprador("");
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      alert("Hubo un problema al guardar la compra.");
    }
  };

  return (
    <>
      <div className="card bg-dark text-light border-secondary shadow-lg h-100">
        <div
          className="card-header text-center font-weight-bold"
          style={{ backgroundColor: "#0d6efd", color: "#fff" }}
        >
          {editando ? (
            <input
              type="text"
              className="form-control text-center"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />
          ) : (
            evento.nombre
          )}
        </div>

        <div className="card-body">
          {editando ? (
            <EditarEventoForm formData={formData} setFormData={setFormData} />
          ) : (
            <>
              <p>
                <strong>📅 Fecha:</strong> {evento.fecha}
              </p>
              <p>
                <strong>📍 Ubicación:</strong> {evento.lugar}
              </p>
              <p>
                <strong>📝 Descripción:</strong> {evento.descripcion}
              </p>
              <p>
                <strong>🎟️ Boletos disponibles:</strong>{" "}
                {sinBoletos ? "Agotados" : evento.boletos_disponibles}
              </p>
              <p>
                <strong>💰 Precio:</strong> {formatoMoneda(evento.precio)}
              </p>
            </>
          )}
        </div>

        <div className="card-footer bg-transparent border-0 text-center">
          {editando ? (
            <>
              <button
                className="btn btn-success m-2"
                onClick={() => guardarCambios(evento.id)}
              >
                💾 Guardar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditando(false)}
              >
                ❌ Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-warning m-2"
                onClick={() => setEditando(true)}
              >
                ✏️ Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(evento.id)}
              >
                🗑️ Eliminar
              </button>
            </>
          )}
        </div>

        {!editando && (
          <div className="card-footer bg-transparent border-0 text-center">
            <button
              className={`btn ${
                sinBoletos ? "btn-secondary" : "btn-success"
              } btn-sm px-4`}
              disabled={sinBoletos}
              onClick={() => setMostrarModal(true)}
            >
              {sinBoletos ? "Agotado" : "Comprar boleto"}
            </button>
          </div>
        )}
      </div>

      {mostrarModal && (
        <ModalCompra
          evento={evento}
          cantidad={cantidad}
          total={total}
          formatoMoneda={formatoMoneda}
          handleCantidadChange={handleCantidadChange}
          onConfirmarCompra={handleConfirmarCompra}
          onCerrar={() => setMostrarModal(false)}
          comprador={comprador}
          setComprador={setComprador}
        />
      )}
    </>
  );
};
