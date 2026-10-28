import FormularioLogin from "../componentes/organismos/FormularioLogin";
import type { Usuario } from "../tipos/Usuario";

interface LoginProps {
  setUsuarioLogueado: (usuario: Usuario) => void;
}

function Login({ setUsuarioLogueado }: LoginProps) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Login</h2>
            <FormularioLogin setUsuarioLogueado={setUsuarioLogueado} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;