import { useState, FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioRegistro() {
  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [direccion, setDireccion] = useState("");

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!run.trim()) {
      alert("El RUN es obligatorio.");
      return;
    }
    if (!nombre.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    if (!apellidos.trim()) {
      alert("Los apellidos son obligatorios.");
      return;
    }
    if (!correo.trim()) {
      alert("El correo electrónico es obligatorio.");
      return;
    }
    if (!password.trim()) {
      alert("La contraseña es obligatoria.");
      return;
    }
    if (password.length < 4 || password.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }
    if (!tipoUsuario.trim()) {
      alert("Debe seleccionar un tipo de usuario.");
      return;
    }
    if (!direccion.trim()) {
      alert("La dirección es obligatoria.");
      return;
    }


    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(correo)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    alert("¡Registro exitoso!");
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="RUN (sin puntos ni guion)"
            tipo="text"
            nombre="run"
            valor={run}
            alCambiar={setRun}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Nombre"
            tipo="text"
            nombre="nombre"
            valor={nombre}
            alCambiar={setNombre}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Apellidos"
            tipo="text"
            nombre="apellidos"
            valor={apellidos}
            alCambiar={setApellidos}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Correo Electrónico"
            tipo="email"
            nombre="correo"
            valor={correo}
            alCambiar={setCorreo}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Contraseña (4-10 caracteres)"
            tipo="password"
            nombre="password"
            valor={password}
            alCambiar={setPassword}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Tipo de Usuario</label>
          <select 
            className="form-select" 
            value={tipoUsuario} 
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección Completa</label>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Calle, número, depto" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-warning mt-3 w-100">
        Registrarse
      </button>
    </form>
  );
}

export default FormularioRegistro;