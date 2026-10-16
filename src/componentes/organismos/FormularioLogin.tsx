import { useState, FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioLogin() {
  // 1. Cambiamos 'nombre' por 'correo'
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const manejarLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (correo.trim() === "") {
      alert("Debe ingresar su correo electrónico");
      return;
    }


    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(correo)) {
      alert("Ingrese un correo válido");
      return;
    }


    if (password.trim() === "") {
      alert("Debe ingresar su contraseña");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    alert("Login correcto con el correo: " + correo);
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