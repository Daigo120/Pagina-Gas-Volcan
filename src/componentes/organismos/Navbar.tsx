import { Link } from 'react-router-dom';

interface NavbarProps {
  usuarioLogueado?: any;
  onCerrarSesion?: () => void;
}

function Navbar({ usuarioLogueado, onCerrarSesion }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand bg-dark">
      <div className="container">
        <span className="navbar-brand text-white">Mi tienda</span>
        <div className="navbar-nav align-items-center">
          <Link className="nav-link text-white" to="/">
            Inicio
          </Link>

          <Link className="nav-link text-white" to="/productos">
            Productos
          </Link>

          <Link className="nav-link text-white" to="/contacto">
            Contacto
          </Link>

          <Link className="nav-link text-white" to="/quienessomos">
            Quienes Somos
          </Link>

          {/* Renderizado condicional basado en si hay un usuario logueado */}
          {usuarioLogueado ? (
            <div className="d-flex align-items-center ms-3 gap-2">
              <span className="text-white small">Hola, {usuarioLogueado.nombre}</span>
              <button 
                onClick={onCerrarSesion} 
                className="btn btn-outline-danger btn-sm"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
              <Link className="nav-link text-white" to="/registro">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;