// src/hooks/useCompraBoletos.js
import { useState } from "react";

export const useCompraBoletos = (precioInicial) => {
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(precioInicial);

  const handleCantidadChange = (e, precio) => {
    const value = parseInt(e.target.value) || 1;
    setCantidad(value);
    setTotal(precio * value);
  };

  const resetCompra = () => {
    setCantidad(1);
    setTotal(precioInicial);
  };

const formatoMoneda = (valor) => {
  const numero = Number(valor);
  if (isNaN(numero)) return "$0.00";
  return numero.toLocaleString("es-CO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

  return {
    cantidad,
    total,
    formatoMoneda,
    handleCantidadChange,
    resetCompra,
  };
};
