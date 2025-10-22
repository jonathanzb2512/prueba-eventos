import { createContext, useContext, useEffect, useState } from "react";
import { getEventos, createEvento,updateEvento, deleteEvento } from "../api/eventos";

const EventosContext = createContext();

export const EventosProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);

  // 🔹 Función para cargar o refrescar los eventos desde el backend
  const refreshEventos = async () => {
    try {
      const data = await getEventos();
      setEventos(data);
      console.log("🔄 Eventos actualizados desde Laravel:", data);
    } catch (error) {
      console.error("❌ Error al actualizar eventos:", error);
    }
  };

  // 🔹 Cargar eventos al iniciar la app
  useEffect(() => {
    refreshEventos();
  }, []);

  // 🔹 Agregar nuevo evento
  const handleAddEvent = async (nuevoEvento) => {
    try {
      const eventoGuardado = await createEvento(nuevoEvento);
      setEventos((prev) => [...prev, eventoGuardado]);
      console.log("🆕 Evento agregado correctamente:", eventoGuardado);
    } catch (error) {
      console.error("❌ Error al crear evento:", error);
    }
  };

  // 🔹 Actualizar cantidad de boletos después de una compra
  const handleBuy = async (id, cantidad) => {
    // Actualización local inmediata
    setEventos((prev) =>
      prev.map((evento) =>
        evento.id === id
          ? { ...evento, boletos_disponibles: evento.boletos_disponibles - cantidad }
          : evento
      )
    );

    // Luego refresca la lista desde el backend para mantener sincronizado
    await refreshEventos();

    console.log(`🎟️ Compra registrada: ${cantidad} boletos del evento ${id}`);
  };

    // 📝 Actualizar evento
    const handleUpdate = async (id, updatedData) => {
      await updateEvento(id, updatedData);
      await refreshEventos(); // recargar lista
    };

    // 🗑️ Eliminar evento
    const handleDelete = async (id) => {
      if (!confirm("¿Seguro que deseas eliminar este evento?")) return;
      await deleteEvento(id);
      await refreshEventos(); // recargar lista
    };

  return (
    <EventosContext.Provider
      value={{
        eventos,
        setEventos,
        handleAddEvent,
        handleBuy,
        refreshEventos, // 👈 lo exportamos por si lo necesitas en otros componentes
        handleDelete,
        handleUpdate,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
};

export const useEventos = () => useContext(EventosContext);
