import { EventCard } from "../components/EventCard";
import { useEventos } from "../context/EventosContext";

export const EventsPage = () => {
  const { eventos, handleBuy } = useEventos();

  return (
    <div className="container mt-5">
      <h2 className="text-center text-light mb-4">Lista de eventos</h2>

      <div className="row">
        {eventos.length === 0 ? (
          <p className="text-center text-light">
            No hay eventos creados todavía.
          </p>
        ) : (
          eventos.map((evento) => (
            <div key={evento.id} className="col-md-4 mb-4">
              <EventCard evento={evento} onBuy={handleBuy} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
