// src/data/eventFormFields.js
export const eventFormFields = [
  {
    label: "Nombre del evento",
    name: "nombre",
    placeholder: "Ej: Concierto de Rock",
    required: true,
  },
  {
    label: "Descripción",
    name: "descripcion",
    type: "textarea",
    placeholder: "Breve descripción del evento...",
    required: true,
  },
  {
    label: "Fecha",
    name: "fecha",
    type: "date",
    required: true,
  },
  {
    label: "Lugar",
    name: "lugar",
    placeholder: "Ej: Teatro Colón",
    required: true,
  },
  {
    label: "Cantidad total de boletos",
    name: "boletos_disponibles",
    type: "number",
    placeholder: "Ej: 1000",
    min: 1,
    required: true,
  },
  {
    label: "Precio por boleto (USD)",
    name: "precio",
    type: "number",
    placeholder: "Ej: 50.00",
    min: 0,
    step: "0.01",
    required: true,
  },
];
