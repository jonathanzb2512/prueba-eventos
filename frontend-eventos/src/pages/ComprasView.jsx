import React from "react";
import { useCompras } from "../context/ComprasContext";

export const ComprasView = () => {
  const { compras, cargando } = useCompras();

  if (cargando)
    return (
      <p className="text-center mt-5 text-secondary fs-5">
        Cargando compras...
      </p>
    );

  if (compras.length === 0)
    return (
      <p className="text-center mt-5 text-secondary fs-5">
        No hay compras registradas.
      </p>
    );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-light">
        🧾 Historial de Compras
      </h2>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle rounded shadow">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>Evento</th>
              <th>Comprador</th>
              <th>Ubicación</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id} className="text-center">
                <td>{compra.id}</td>
                <td>{compra.evento?.nombre || "Evento desconocido"}</td>
                <td>{compra.comprador}</td>
                <td>{compra.evento?.lugar}</td>
                <td>{compra.cantidad_boletos}</td>
                <td>${compra.total_compra.toLocaleString()}</td>
                <td>
                  {new Date(compra.created_at).toLocaleString("es-CO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
