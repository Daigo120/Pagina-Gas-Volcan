import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './componentes/organismos/Navbar';
import Footer from './componentes/organismos/Footer';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import Contacto from './paginas/Contacto';
import Nosotros from './paginas/Nosotros';
import DetalleProducto from './paginas/DetalleProducto';
import Login from './paginas/Login'; 
import Registro from './paginas/Registro';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Si quieres usar los íconos
import DondeEncontrarnos from './paginas/DondeEncontrarnos';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState<any | null>(() => {
    const guardado = localStorage.getItem('usuarioLogueado');
    return guardado ? JSON.parse(guardado) : null;
  });

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuarioLogueado(null);
  };

  return (
    <div className="app-container">
      {/* Pasamos el usuario activo y la función de cerrar sesión al Navbar */}
      <Navbar usuarioLogueado={usuarioLogueado} onCerrarSesion={cerrarSesion} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/donde-encontrarnos" element={<DondeEncontrarnos />} />
          <Route path="/contacto" element={<Contacto />} />
        
          {/* Pasamos la función para actualizar el login */}
          <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
         <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />

    </div>
  );
}

export default App;
