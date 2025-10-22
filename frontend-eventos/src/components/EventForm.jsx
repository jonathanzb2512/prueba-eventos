// src/components/EventForm.jsx
import { InputField } from "./InputField";
import { eventFormFields } from "../data/eventFormFields";
import { useEventForm } from "../hooks/useEventForm";

export const EventForm = ({ onAddEvent }) => {
  const { formState, onInputChange, handleSubmit, isSubmitting } =
    useEventForm(onAddEvent);

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

          <form onSubmit={handleSubmit}>
            {eventFormFields.map((field) => (
              <InputField
                key={field.name}
                {...field}
                value={formState[field.name]}
                onChange={onInputChange}
              />
            ))}

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary px-4 font-weight-bold"
              >
                {isSubmitting ? "Guardando..." : "Crear evento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
