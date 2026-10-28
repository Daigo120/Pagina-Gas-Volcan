import { Link, useNavigate } from 'react-router-dom';
import type { Usuario } from '../../tipos/Usuario';

interface NavbarProps {
  usuarioLogueado: Usuario | null;
  onCerrarSesion: () => void;
}

function Navbar({ usuarioLogueado, onCerrarSesion }: NavbarProps) {
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    onCerrarSesion();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand bg-dark">
      <div className="container">
        {/* 👇 Nombre de tu amigo */}
        <span className="navbar-brand text-white">Gas el Volcán</span> 
        
        <div className="navbar-nav align-items-center">
          <Link className="nav-link text-white" to="/">Inicio</Link>
          <Link className="nav-link text-white" to="/productos">Productos</Link>
          <Link className="nav-link text-white" to="/contacto">Contacto</Link>
          
          {/* 👇 Enlace de tu amigo */}
          <Link className="nav-link text-white" to="/nosotros">Nosotros</Link>
          
          <Link className="nav-link text-white" to="/donde-encontrarnos">Dónde Encontrarnos</Link>

          {/* 👇 Botón de Admin Nuestro */}
          {usuarioLogueado && usuarioLogueado.tipoUsuario === 'admin' && (
            <Link className="nav-link text-warning fw-bold" to="/admin">
              Panel Admin
            </Link>
          )}

          {/* Renderizado condicional del Login (Nuestro) */}
          {usuarioLogueado ? (
            <div className="d-flex align-items-center ms-3 gap-2">
              <span className="text-white small">Hola, {usuarioLogueado.nombre}</span>
              <button
                onClick={manejarCerrarSesion}
                className="btn btn-outline-danger btn-sm"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <Link className="nav-link text-white" to="/login">Login</Link>
              <Link className="nav-link text-white" to="/registro">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;