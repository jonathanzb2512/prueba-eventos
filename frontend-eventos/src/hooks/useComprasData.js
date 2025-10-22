import { useEffect, useState } from "react";
import { getCompras } from "../api/compras";

export const useComprasData = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarCompras = async () => {
    try {
      setCargando(true);
      const data = await getCompras();
      setCompras(data);
      console.log("🧾 Compras cargadas desde Laravel:", data);
    } catch (error) {
      console.error("❌ Error al cargar compras:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCompras();
  }, []);

  return { compras, setCompras, cargando, cargarCompras };
};
