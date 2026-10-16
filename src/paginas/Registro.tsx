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
              
              <FormularioRegistro />

              <div className="text-center mt-3">
                <Link to="/productos" className="btn btn-outline-secondary mb-3">
                    Volver a productos
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