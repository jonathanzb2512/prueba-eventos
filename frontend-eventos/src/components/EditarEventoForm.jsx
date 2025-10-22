export const EditarEventoForm = ({ formData, setFormData }) => {
  return (
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
  );
};
