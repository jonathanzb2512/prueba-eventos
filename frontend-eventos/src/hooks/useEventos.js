// src/hooks/useEventos.js
import { useEffect, useState } from "react";
import { getEventos, createEvento } from "../api/eventos";

export const useEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar eventos desde Laravel al iniciar
  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const data = await getEventos();
        setEventos(data);
        console.log("📦 Eventos cargados desde Laravel:", data);
      } catch (error) {
        console.error("❌ Error al cargar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, []);

  // 🔹 Crear nuevo evento en Laravel
  const handleAddEvent = async (nuevoEvento) => {
    try {
      const eventoGuardado = await createEvento(nuevoEvento);
      setEventos((prev) => [...prev, eventoGuardado]);
      console.log("🆕 Evento creado correctamente:", eventoGuardado);
    } catch (error) {
      console.error("❌ Error al crear evento:", error);
    }
  };

  // 🔹 Registrar compra (solo actualiza estado local por ahora)
  const handleBuy = (id, cantidad) => {
    setEventos((prevEventos) =>
      prevEventos.map((evento) =>
        evento.id === id
          ? { ...evento, boletos_disponibles: evento.boletos_disponibles - cantidad }
          : evento
      )
    );
    console.log(`🎟️ Compra registrada: ${cantidad} boletos del evento ${id}`);
  };

  return {
    eventos,
    setEventos,
    handleAddEvent,
    handleBuy,
    loading,
  };
};
