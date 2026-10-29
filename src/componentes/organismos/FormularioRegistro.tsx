import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { usuariosServicio } from "../../servicios/usuariosServicio";
import type { TipoUsuario } from "../../tipos/Usuario";

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

    
    if (!run.trim()) {
      alert("Debe ingresar su RUN.");
      return;
    } 


    if (
      !/^\d{1,8}[\dKk]$/.test(run.replace(/[.-]/g, '')) || 
      (() => {
        let t = run.replace(/[.-]/g, '').toUpperCase();
        let s = 0, m = 2;
        for (let i = t.length - 2; i >= 0; i--) {
          s += parseInt(t[i]) * m;
          m = m === 7 ? 2 : m + 1;
        }
        let d = 11 - (s % 11);
        return t.slice(-1) !== (d === 11 ? '0' : d === 10 ? 'K' : d.toString());
      })()
    ) {
      alert("Rut invalido.");
      return;
    }

  
    if (!nombre.trim()) {
      alert("Debe ingresar su nombre.");
      return;
    }

  
    if (!apellidos.trim()) {
      alert("Debe ingresar sus apellidos.");
      return;
    }

  
    if (!correoLimpio) {
      alert("Debe ingresar su correo electrónico.");
      return;
    }

  
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(correoLimpio)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

   
    if (!passwordLimpia) {
      alert("Debe ingresar su contraseña.");
      return;
    }

  
    if (passwordLimpia.length < 4 || passwordLimpia.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    
    if (!tipoUsuario || !tipoUsuario.trim()) {
      alert("Debe seleccionar un tipo de usuario.");
      return;
    }

   
    if (!direccion.trim()) {
      alert("Debe ingresar su dirección.");
      return;
    }

   
    if (usuariosServicio.existeCorreo(correo)) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }

    
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios_db") || "[]");
    const nuevoUsuario = { 
      run: run.trim(), 
      nombre: nombre.trim(), 
      apellidos: apellidos.trim(), 
      correo: correoLimpio, 
      password: passwordLimpia, 
      tipoUsuario: tipoUsuario as TipoUsuario,
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