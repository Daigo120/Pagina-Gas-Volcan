import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/organismos/Navbar';
import Footer from './componentes/organismos/Footer';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import Contacto from './paginas/Contacto';
import Nosotros from './paginas/Nosotros'; // 👈 Cambio de tu amigo
import DetalleProducto from './paginas/DetalleProducto';
import DondeEncontrarnos from './paginas/DondeEncontrarnos';
import Login from './paginas/Login';
import Registro from './paginas/Registro';
import Despacho from './paginas/Despacho'; // 👈 Nuestro
import Pago from './paginas/Pago'; // 👈 Nuestro

// 👈 Rutas de Admin Nuestras
import Admin from './paginas/Admin';
import AdminProductos from './paginas/AdminProductos';
import AdminUsuarios from './paginas/AdminUsuarios';

import type { Usuario } from './tipos/Usuario';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { inyectarAdminDePrueba } from './servicios/usuariosServicio';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('usuarioLogueado') || 'null');
    } catch {
      return null;
    }
  });

  const [totalPedido, setTotalPedido] = useState(0);

  useEffect(() => {
    inyectarAdminDePrueba();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuarioLogueado(null);
  };

  const RutaProtegidaAdmin = ({ children }: { children: React.ReactNode }) => {
    if (!usuarioLogueado || usuarioLogueado.tipoUsuario !== 'admin') {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <div className="app-container">
      <Navbar
        usuarioLogueado={usuarioLogueado}
        onCerrarSesion={cerrarSesion}
      />
      
      <main className="main-content">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos setTotalPedido={setTotalPedido} />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          
          {/* 👇 Ruta cambiada a /nosotros */}
          <Route path="/nosotros" element={<Nosotros />} /> 
          
          <Route path="/donde-encontrarnos" element={<DondeEncontrarnos />} />
          <Route path="/contacto" element={<Contacto />} />
          
          {/* 👇 Nuestras rutas de compra */}
          <Route path="/despacho" element={<Despacho totalPedido={totalPedido} />} />
          <Route path="/pago" element={<Pago totalPedido={totalPedido} />} />
          
          <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas Protegidas de Admin */}
          <Route 
            path="/admin" 
            element={
              <RutaProtegidaAdmin>
                <Admin />
              </RutaProtegidaAdmin>
            } 
          />
          <Route 
            path="/admin/productos" 
            element={
              <RutaProtegidaAdmin>
                <AdminProductos />
              </RutaProtegidaAdmin>
            } 
          />
          <Route 
            path="/admin/usuarios" 
            element={
              <RutaProtegidaAdmin>
                <AdminUsuarios />
              </RutaProtegidaAdmin>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;