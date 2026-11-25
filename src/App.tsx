import { useState } from 'react'; 
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
import Despacho from './paginas/Despacho'; 
import Pago from './paginas/Pago'; 
import Boleta from './paginas/Boleta';
import Admin from './paginas/Admin';
import AdminProductos from './paginas/AdminProductos';
import AdminUsuarios from './paginas/AdminUsuarios';
import AdminMensajes from './paginas/AdminMensajes';
import AdminPedidos from './paginas/AdminPedidos';

import type { Usuario } from './tipos/Usuario';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

function App() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('usuarioLogueado') || 'null');
    } catch {
      return null;
    }
  });

  const handleAgregarCarrito = (id: number, nombre: string, precio: number) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { id, nombre, precio, cantidad: 1 }];
    });
  };

  const handleQuitarCarrito = (id: number) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const [totalPedido, setTotalPedido] = useState(0);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('token');
    setUsuarioLogueado(null);
  };

  const RutaProtegidaAdmin = ({ children }: { children: React.ReactNode }) => {
    if (!usuarioLogueado || usuarioLogueado.rol !== 'ADMIN') {
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
          <Route 
            path="/productos" 
            element={
              <Productos 
                carrito={carrito}
                setTotalPedido={setTotalPedido} 
                onAgregar={handleAgregarCarrito}
                onQuitar={handleQuitarCarrito}
              />
            } 
          />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          
          <Route path="/nosotros" element={<Nosotros />} /> 
          
          <Route path="/donde-encontrarnos" element={<DondeEncontrarnos />} />
          <Route path="/contacto" element={<Contacto />} />
          
          <Route path="/despacho" element={<Despacho totalPedido={totalPedido} />} />
          <Route path="/pago" element={<Pago totalPedido={totalPedido} />} />
          
          
          <Route path="/boleta" element={<Boleta />} />
          
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
          <Route 
          path="/admin/mensajes" 
          element={
          <RutaProtegidaAdmin>
          <AdminMensajes />
            </RutaProtegidaAdmin>
          } 
          />
          <Route 
          path="/admin/pedidos" 
          element={
          <RutaProtegidaAdmin>
          <AdminPedidos />
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