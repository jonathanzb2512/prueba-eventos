import { createContext, useContext } from "react";
import { useComprasData } from "../hooks/useComprasData";

const ComprasContext = createContext();

export const ComprasProvider = ({ children }) => {
  const comprasState = useComprasData();

  return (
    <ComprasContext.Provider value={comprasState}>
      {children}
    </ComprasContext.Provider>
  );
};

export const useCompras = () => useContext(ComprasContext);
