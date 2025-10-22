import { useNavigate } from "react-router-dom";
import { EventForm } from "../components/EventForm";
import { useEventos } from "../context/EventosContext"; // 👈 ahora viene del contexto

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const { handleAddEvent } = useEventos();

  const onAddEvent = (nuevoEvento) => {
    handleAddEvent(nuevoEvento);
    navigate("/eventos");
  };

  return <EventForm onAddEvent={onAddEvent} />;
};
