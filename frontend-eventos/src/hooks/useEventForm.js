// src/hooks/useEventForm.js
import { useForm } from "../hooks/useForm";
import { useState } from "react";

export const useEventForm = (onAddEvent) => {
  const initialForm = {
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: "",
    boletos_disponibles: "",
    precio: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onAddEvent) await onAddEvent(formState);
      onResetForm();
    } catch (error) {
      console.error("❌ Error al guardar el evento:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    onInputChange,
    onResetForm,
    handleSubmit,
    isSubmitting,
  };
};
