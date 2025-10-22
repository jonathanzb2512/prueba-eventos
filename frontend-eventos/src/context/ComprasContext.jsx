import { createContext, useContext, useEffect, useState } from "react";
import { getCompras } from "../api/compras";

const ComprasContext = createContext();

export const ComprasProvider = ({ children }) => {
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

  return (
    <ComprasContext.Provider value={{ compras, setCompras, cargando, cargarCompras }}>
      {children}
    </ComprasContext.Provider>
  );
};

export const useCompras = () => useContext(ComprasContext);
