import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";

interface FormularioLoginProps {
  setUsuarioLogueado: (usuario: any) => void;
}

function FormularioLogin({ setUsuarioLogueado }: FormularioLoginProps) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const manejarLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const correoLimpio = correo.trim().toLowerCase();
    const passwordLimpia = password.trim();

    if (!correoLimpio || !passwordLimpia) {
      alert("Debe completar todos los campos.");
      return;
    }

    // Leemos la lista de usuarios guardados
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios_db") || "[]");

    // Buscamos coincidencia exacta
    const usuarioEncontrado = usuariosGuardados.find(
      (u: any) => 
        u.correo && 
        u.correo.trim().toLowerCase() === correoLimpio && 
        u.password === passwordLimpia
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
      setUsuarioLogueado(usuarioEncontrado);
      alert("¡Login correcto! Bienvenido " + usuarioEncontrado.nombre);
      navigate("/");
    } else {
      alert("Correo o contraseña incorrectos, o usuario no registrado.");
    }
  };

  return (
    <form onSubmit={manejarLogin} noValidate>
      <CampoFormulario 
        etiqueta="Correo Electrónico" 
        tipo="email" 
        nombre="correo" 
        valor={correo} 
        alCambiar={setCorreo} 
      />
      <CampoFormulario 
        etiqueta="Contraseña" 
        tipo="password" 
        nombre="password" 
        valor={password} 
        alCambiar={setPassword} 
      />

      <button type="submit" className="btn btn-warning mt-3 w-100">
        Iniciar Sesión
      </button>
    </form>
  );
}

export default FormularioLogin;