import axios from "axios";

// 👇 Usa la ruta correcta del backend
const API_URL = "http://127.0.0.1:8000/api/compras";

// Crear una nueva compra
export const createCompra = async (compraData) => {
  const response = await axios.post(API_URL, compraData);
  return response.data;
};


export const getCompras = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener compras:", error);
    throw error;
  }
};