import { useState } from "react";
import { useCompraBoletos } from "../hooks/useCompraBoletos";
import { ModalCompra } from "./ModalCompra";
import { createCompra } from "../api/compras";
import { useEventos } from "../context/EventosContext";

export const EventCard = ({ evento }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comprador, setComprador] = useState("");
  const [editando, setEditando] = useState(false);

  const [formData, setFormData] = useState({
    nombre: evento.nombre,
    descripcion: evento.descripcion,
    fecha: evento.fecha,
    lugar: evento.lugar,
    boletos_disponibles: evento.boletos_disponibles,
    precio: evento.precio,
  });

  const sinBoletos = evento.boletos_disponibles <= 0;

  const { cantidad, total, formatoMoneda, handleCantidadChange, resetCompra } =
    useCompraBoletos(evento.precio);

  const { handleBuy, handleDelete, handleUpdate, refreshEventos } = useEventos();

  // 🧾 Confirmar compra
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

  // ✏️ Guardar cambios del evento
  const handleGuardarEdicion = async () => {
    try {
      await handleUpdate(evento.id, formData);
      alert("✅ Evento actualizado correctamente.");
      setEditando(false);
      await refreshEventos();
    } catch (error) {
      console.error("Error al actualizar evento:", error.response?.data || error);
      alert("❌ Error al guardar los cambios. Revisa que todos los campos estén completos.");
    }
  };

  return (
    <>
      <div className="card bg-dark text-light border-secondary shadow-lg h-100">
        {/* 🔹 Encabezado */}
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

        {/* 🔹 Cuerpo */}
        <div className="card-body">
          {editando ? (
            <>
              <div className="mb-2">
                <label>📅 Fecha:</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.fecha}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label>📍 Ubicación:</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.lugar}
                  onChange={(e) =>
                    setFormData({ ...formData, lugar: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label>📝 Descripción:</label>
                <textarea
                  className="form-control"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label>💰 Precio:</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({ ...formData, precio: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label>🎟️ Boletos disponibles:</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.boletos_disponibles}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      boletos_disponibles: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </>
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

        {/* 🔹 Botones de acción */}
        <div className="card-footer bg-transparent border-0 text-center">
          {editando ? (
            <>
              <button
                className="btn btn-success m-2"
                onClick={handleGuardarEdicion}
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

        {/* 🔹 Botón de compra */}
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

      {/* 🔹 Modal de compra */}
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
