import FormularioRegistro from "../componentes/organismos/FormularioRegistro";
import { Link } from "react-router-dom";

function Registro() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="mb-4 text-center">Registro de Usuario</h2>
              
              {/* Aquí se renderiza tu organismo con los campos y validaciones */}
              <FormularioRegistro />

              {/* Enlace útil por si ya tiene cuenta */}
              <div className="text-center mt-3">
                <span className="text-muted">¿Ya tienes una cuenta? </span>
                <Link to="/login" className="text-decoration-none fw-bold">
                  Inicia sesión aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;