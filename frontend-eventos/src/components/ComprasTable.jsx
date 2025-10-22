export const ComprasTable = ({ compras }) => {
  const formatCurrency = (value) => `$${value.toLocaleString()}`;
  const formatDate = (dateString) => new Date(dateString).toLocaleString("es-CO");

  return (
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
              <td>{compra.evento?.lugar || "No especificado"}</td>
              <td>{compra.cantidad_boletos}</td>
              <td>{formatCurrency(compra.total_compra)}</td>
              <td>{formatDate(compra.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
