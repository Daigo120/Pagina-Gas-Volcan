import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/organismos/Navbar';
import Footer from './componentes/organismos/Footer';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import Contacto from './paginas/Contacto';
import Nosotros from './paginas/Nosotros'; 
import DetalleProducto from './paginas/DetalleProducto';
import DondeEncontrarnos from './paginas/DondeEncontrarnos';
import Login from './paginas/Login';
import Registro from './paginas/Registro';

// Rutas de compra y pago
import Despacho from './paginas/Despacho'; 
import Pago from './paginas/Pago'; 
import Boleta from './paginas/Boleta'; // 👈 ¡Importante! Agregamos la Boleta de tu amigo

// Rutas de Admin
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

          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos setTotalPedido={setTotalPedido} />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/donde-encontrarnos" element={<DondeEncontrarnos />} />
          <Route path="/contacto" element={<Contacto />} />
          
 
          <Route path="/despacho" element={<Despacho totalPedido={totalPedido} />} />
          <Route path="/pago" element={<Pago totalPedido={totalPedido} />} />
          
 

          <Route path="/boleta" element={<Boleta totalPedido={totalPedido} />} />
          
          <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
          <Route path="/registro" element={<Registro />} />


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