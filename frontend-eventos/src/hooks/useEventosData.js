import { useEffect, useState } from "react";
import { getEventos, createEvento, updateEvento, deleteEvento } from "../api/eventos";

export const useEventosData = () => {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Cargar eventos desde backend
  const refreshEventos = async () => {
    try {
      setCargando(true);
      const data = await getEventos();
      setEventos(data);
      console.log("🔄 Eventos actualizados desde Laravel:", data);
    } catch (error) {
      console.error("❌ Error al actualizar eventos:", error);
      setError(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    refreshEventos();
  }, []);

  // 🆕 Crear evento
  const handleAddEvent = async (nuevoEvento) => {
    try {
      const eventoGuardado = await createEvento(nuevoEvento);
      setEventos((prev) => [...prev, eventoGuardado]);
      console.log("🆕 Evento agregado correctamente:", eventoGuardado);
    } catch (error) {
      console.error("❌ Error al crear evento:", error);
      setError(error);
    }
  };

  // 📝 Actualizar evento
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateEvento(id, updatedData);
      await refreshEventos();
    } catch (error) {
      console.error("❌ Error al actualizar evento:", error);
      setError(error);
    }
  };

  // 🗑️ Eliminar evento
  const handleDelete = async (id) => {
    try {
      if (!confirm("¿Seguro que deseas eliminar este evento?")) return;
      await deleteEvento(id);
      await refreshEventos();
    } catch (error) {
      console.error("❌ Error al eliminar evento:", error);
      setError(error);
    }
  };

  // 🎟️ Actualizar boletos tras compra
  const handleBuy = async (id, cantidad) => {
    try {
      setEventos((prev) =>
        prev.map((evento) =>
          evento.id === id
            ? { ...evento, boletos_disponibles: evento.boletos_disponibles - cantidad }
            : evento
        )
      );
      await refreshEventos();
      console.log(`🎟️ Compra registrada: ${cantidad} boletos del evento ${id}`);
    } catch (error) {
      console.error("❌ Error al procesar compra:", error);
      setError(error);
    }
  };

  return {
    eventos,
    cargando,
    error,
    handleAddEvent,
    handleUpdate,
    handleDelete,
    handleBuy,
    refreshEventos,
  };
};
