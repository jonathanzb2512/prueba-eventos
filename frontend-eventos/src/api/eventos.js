import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/eventos";

// Obtener todos los eventos
export const getEventos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crear nuevo evento
export const createEvento = async (eventoData) => {
  const response = await axios.post(API_URL, eventoData);
  return response.data;
};


export const getEventosById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}


// Actualizar evento
export const updateEvento = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Eliminar evento
export const deleteEvento = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

