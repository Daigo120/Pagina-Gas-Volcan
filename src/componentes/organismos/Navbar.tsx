import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import type { Usuario } from '../../tipos/Usuario';

interface NavbarProps {
  usuarioLogueado: Usuario | null;
  onCerrarSesion: () => void;
}

function Navbar({ usuarioLogueado, onCerrarSesion }: NavbarProps) {
  const navigate = useNavigate();
  
  
  const [menuAbierto, setMenuAbierto] = useState(false);

  
  const cerrarMenu = () => setMenuAbierto(false);

  const manejarCerrarSesion = () => {
    onCerrarSesion();
    cerrarMenu(); 
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <span className="navbar-brand text-white">Gas el Volcán</span>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setMenuAbierto(!menuAbierto)} 
          aria-expanded={menuAbierto}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav align-items-lg-center ms-auto">
            
            <Link className="nav-link text-white" to="/" onClick={cerrarMenu}>Inicio</Link>
            <Link className="nav-link text-white" to="/productos" onClick={cerrarMenu}>Productos</Link>
            <Link className="nav-link text-white" to="/contacto" onClick={cerrarMenu}>Contacto</Link>
            <Link className="nav-link text-white" to="/nosotros" onClick={cerrarMenu}>Nosotros</Link>
            <Link className="nav-link text-white" to="/donde-encontrarnos" onClick={cerrarMenu}>Dónde Encontrarnos</Link>

            {usuarioLogueado && usuarioLogueado.tipoUsuario === 'admin' && (
              <Link className="nav-link text-warning fw-bold" to="/admin" onClick={cerrarMenu}>
                Panel Admin
              </Link>
            )}

            {usuarioLogueado ? (
              <div className="d-flex flex-column flex-lg-row align-items-lg-center ms-lg-3 gap-2 mt-3 mt-lg-0">
                <span className="text-white small">Hola, {usuarioLogueado.nombre}</span>
                <button
                  onClick={manejarCerrarSesion}
                  className="btn btn-outline-danger btn-sm"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column flex-lg-row mt-3 mt-lg-0 gap-2 gap-lg-0">
                <Link className="nav-link text-white" to="/login" onClick={cerrarMenu}>Login</Link>
                <Link className="nav-link text-white" to="/registro" onClick={cerrarMenu}>Registro</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;