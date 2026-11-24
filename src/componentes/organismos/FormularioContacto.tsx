import { useState, FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { fetchApi } from '../../servicios/api';

function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      alert("Debe ingresar su nombre");
      return;
    }

    if (correo.trim() === "") {
      alert("Debe ingresar su correo");
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(correo)) {
      alert("Ingrese un correo válido");
      return;
    }

    if (mensaje.trim() === "") {
      alert("Debe ingresar un mensaje");
      return;
    }

    
    try {
      setCargando(true);
      
      const respuesta = await fetchApi('/mensajeria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim().toLowerCase(), 
          mensaje: mensaje.trim()
        })
      });

      if (respuesta.ok) {
        alert("¡Mensaje enviado! El administrador se contactará contigo pronto.");
        
        setNombre("");
        setCorreo("");
        setMensaje("");
      } else {
        alert("Error al enviar el mensaje. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor de mensajería.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        etiqueta="Nombre completo"
        tipo="text"
        nombre="nombre"
        valor={nombre}
        alCambiar={setNombre}
      />
      <CampoFormulario
        etiqueta="Correo electrónico"
        tipo="email"
        nombre="correo"
        valor={correo}
        alCambiar={setCorreo}
      />
      <CampoFormulario
        etiqueta="Mensaje"
        tipo="text"
        nombre="mensaje"
        valor={mensaje}
        alCambiar={setMensaje}
      />

      <button 
        type="submit" 
        className="btn btn-warning mt-3" 
        disabled={cargando}
      >
        {cargando ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}

export default FormularioContacto;