import { Routes, Route } from 'react-router-dom';
import Navbar from './componentes/organismos/Navbar';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import Contacto from './paginas/Contacto';
import QuienesSomos from './paginas/QuienesSomos';
import DetalleProducto from './paginas/DetalleProducto';
import Login from './paginas/Login'; 
import Registro from './paginas/Registro';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={<Inicio />} 
        />
        <Route 
          path="/productos" 
          element={<Productos />} 
        />
        <Route
          path="/producto/:id" 
          element={<DetalleProducto />} 
        />
        <Route 
          path="/quienessomos" 
          element={<QuienesSomos />} 
        />
        <Route
          path="/contacto" 
          element={<Contacto />} 
        />
        
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/registro" 
          element={<Registro />} 
        />

      </Routes>
    </>
  );
}

export default App;
