import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioRegistro() {
  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const correoLimpio = correo.trim().toLowerCase();
    const passwordLimpia = password.trim();

    if (!run.trim() || !nombre.trim() || !apellidos.trim() || !correoLimpio || !passwordLimpia || !tipoUsuario.trim() || !direccion.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (passwordLimpia.length < 4 || passwordLimpia.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(correoLimpio)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    // Obtenemos los usuarios previos de localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios_db") || "[]");

    // Verificamos si el correo ya existe
    const existe = usuariosGuardados.some(
      (u: any) => u.correo && u.correo.trim().toLowerCase() === correoLimpio
    );

    if (existe) {
      alert("Este correo electrónico ya está registrado.");
      return;
    }

    // Creamos y guardamos el nuevo usuario
    const nuevoUsuario = { 
      run: run.trim(), 
      nombre: nombre.trim(), 
      apellidos: apellidos.trim(), 
      correo: correoLimpio, 
      password: passwordLimpia, 
      tipoUsuario, 
      direccion: direccion.trim() 
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuarios_db", JSON.stringify(usuariosGuardados));

    alert("¡Registro exitoso! Por favor, inicia sesión.");
    navigate("/login");
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario etiqueta="RUN (sin puntos ni guion)" tipo="text" nombre="run" valor={run} alCambiar={setRun} />
        </div>
        <div className="col-md-6">
          <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario etiqueta="Apellidos" tipo="text" nombre="apellidos" valor={apellidos} alCambiar={setApellidos} />
        </div>
        <div className="col-md-6">
          <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario etiqueta="Contraseña (4-10 caracteres)" tipo="password" nombre="password" valor={password} alCambiar={setPassword} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Tipo de Usuario</label>
          <select className="form-select" value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección Completa</label>
        <input type="text" className="form-control" placeholder="Calle, número, depto" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-warning mt-3 w-100">
        Registrarse
      </button>
    </form>
  );
}

export default FormularioRegistro;