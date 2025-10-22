import { createEvento } from "../api/eventos";
import { useForm } from "../hooks/useForm";
import { InputField } from "./InputField";

export const EventForm = ({ onAddEvent }) => {
  const initialForm = {
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: "",
    boletos_disponibles: "",
    precio: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if ( onAddEvent) await onAddEvent(formState);
      onResetForm();
    } catch (error) {
        console.error("❌ Error al guardar el evento:", error);
    }

  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
      <div
        className="card shadow-lg w-100 mx-3"
        style={{
          maxWidth: "480px",
          backgroundColor: "#1e293b",
          color: "#fff",
        }}
      >
        <div className="card-body">
          <h4 className="card-title text-center mb-4 text-light">
            Crear nuevo evento
          </h4>

          <form onSubmit={onSubmit}>
            <InputField
              label="Nombre del evento"
              name="nombre"
              placeholder="Ej: Concierto de Rock"
              value={formState.nombre}
              onChange={onInputChange}
              required
            />

            <InputField
              label="Descripción"
              name="descripcion"
              type="textarea"
              placeholder="Breve descripción del evento..."
              value={formState.descripcion}
              onChange={onInputChange}
              required
            />

            <InputField
              label="Fecha"
              name="fecha"
              type="date"
              value={formState.fecha}
              onChange={onInputChange}
              required
            />

            <InputField
              label="lugar"
              name="lugar"
              placeholder="Ej: Teatro Colón"
              value={formState.lugar}
              onChange={onInputChange}
              required
            />

            <InputField
              label="Cantidad total de boletos"
              name="boletos_disponibles"
              type="number"
              placeholder="Ej: 1000"
              min="1"
              value={formState.boletos_disponibles}
              onChange={onInputChange}
              required
            />

            <InputField
              label="Precio por boleto (USD)"
              name="precio"
              type="number"
              placeholder="Ej: 50.00"
              min="0"
              step="0.01"
              value={formState.precio}
              onChange={onInputChange}
              required
            />

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-4 font-weight-bold"
              >
                Crear evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
