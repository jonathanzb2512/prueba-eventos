import { useState } from "react";
import { useEventos } from "../context/EventosContext";

export const useEventoEdicion = (eventoInicial) => {
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: eventoInicial.nombre,
    descripcion: eventoInicial.descripcion,
    fecha: eventoInicial.fecha,
    lugar: eventoInicial.lugar,
    boletos_disponibles: eventoInicial.boletos_disponibles,
    precio: eventoInicial.precio,
  });

  const { handleUpdate, refreshEventos } = useEventos();

  const guardarCambios = async (id) => {
    try {
      await handleUpdate(id, formData);
      alert("✅ Evento actualizado correctamente.");
      setEditando(false);
      await refreshEventos();
    } catch (error) {
      console.error("Error al actualizar evento:", error.response?.data || error);
      alert("❌ Error al guardar los cambios. Revisa los campos.");
    }
  };

  return { editando, setEditando, formData, setFormData, guardarCambios };
};
