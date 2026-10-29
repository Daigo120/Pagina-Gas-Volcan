import { Link, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center border-bottom border-warning border-4">
        <h3 className="m-0" style={{ color: '#ffc107' }}>Panel Admin</h3>
        
      </header>

      <div className="container mt-5">
        <h2 className="mb-4 fw-bold">Módulos de Gestión</h2>
        <div className="row">
          
          
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm text-center p-4 h-100">
              <h3 className="card-title fw-bold">Mantenedor de Productos</h3>
              <p className="card-text text-muted mt-3 mb-4">
                Agrega, edita o elimina cilindros, reguladores y accesorios del sistema.
              </p>
              <Link to="/admin/productos" className="btn btn-warning w-100 fw-bold mt-auto">
                Gestionar Productos
              </Link>
            </div>
          </div>

          
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm text-center p-4 h-100">
              <h3 className="card-title fw-bold">Mantenedor de Usuarios</h3>
              <p className="card-text text-muted mt-3 mb-4">
                Administra los permisos y registros de clientes residenciales y comerciales.
              </p>
              <Link to="/admin/usuarios" className="btn btn-warning w-100 fw-bold mt-auto">
                Gestionar Usuarios
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Admin;