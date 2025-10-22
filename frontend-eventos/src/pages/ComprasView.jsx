
import { ComprasTable } from "../components/ComprasTable";
import { useCompras } from "../context/ComprasContext";


export const ComprasView = () => {
  const { compras, cargando } = useCompras();

  if (cargando)
    return <p className="text-center mt-5 text-secondary fs-5">Cargando compras...</p>;

  if (compras.length === 0)
    return <p className="text-center mt-5 text-secondary fs-5">No hay compras registradas.</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-light">🧾 Historial de Compras</h2>
      <ComprasTable compras={compras} />
    </div>
  );
};
