import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CreateEventPage } from "./pages/CreateEventPage";
import { EventsPage } from "./pages/EventsPage";
import { EventosProvider } from "./context/EventosContext";
import { ComprasProvider } from "./context/ComprasContext"; // 👈 importa el provider
import { ComprasView } from "./pages/ComprasView";

export const App = () => {
  return (
    // 👇 Envolvemos TODO con ambos providers
    <EventosProvider>
      <ComprasProvider>
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">🎟️ Gestor de Eventos</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Crear Evento</Link>
              <Link className="nav-link" to="/eventos">Ver Eventos</Link>
              <Link className="nav-link" to="/compras">Compras</Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<CreateEventPage />} />
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/compras" element={<ComprasView />} />
          </Routes>
        </BrowserRouter>
      </ComprasProvider>
    </EventosProvider>
  );
};
