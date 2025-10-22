import { createContext, useContext } from "react";
import { useEventosData } from "../hooks/useEventosData";

const EventosContext = createContext();

export const EventosProvider = ({ children }) => {
  const eventosState = useEventosData();

  return (
    <EventosContext.Provider value={eventosState}>
      {children}
    </EventosContext.Provider>
  );
};

export const useEventos = () => useContext(EventosContext);
