import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../moleculas/CampoFormulario';
import type { Usuario } from '../tipos/Usuario';

interface FormularioLoginProps {
  setUsuarioLogueado: (usuario: Usuario) => void;
}

function FormularioLogin({ setUsuarioLogueado }: FormularioLoginProps) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (correo.trim() === "") {
      alert("Debe ingresar su correo");
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(correo)) {
      alert("Ingrese un correo válido");
      return;
    }

    if (password.trim() === "") {
      alert("Debe ingresar una contraseña");
      return;
    }
    if (password.length < 4 || password.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    // CONEXIÓN AL BACKEND (Spring Boot)
    try {
      const respuesta = await fetch('http://localhost:8088/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, password })
      });

      if (respuesta.ok) {
        // --- CAMBIO IMPORTANTE: Ahora recibimos token y usuario ---
        const data = await respuesta.json(); 
        
        // Guardamos el Token JWT
        localStorage.setItem('token', data.token); 
        
        // Guardamos los datos del usuario
        localStorage.setItem('usuarioLogueado', JSON.stringify(data.usuario)); 
        
        // Actualizamos el estado global en App.tsx
        setUsuarioLogueado(data.usuario); 
        
        navigate('/');
      } else {
        setError('Correo o contraseña incorrectos.');
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError('No se pudo conectar con el servidor. Intente más tarde.');
    }
  };

  return (
    <form onSubmit={manejarLogin} noValidate>
      {error && <div className="alert alert-danger">{error}</div>}
      <CampoFormulario
        etiqueta="Correo Electrónico"
        tipo="email"
        nombre="correo"
        valor={correo}
        alCambiar={setCorreo}
        requerido
      />
      <CampoFormulario
        etiqueta="Contraseña"
        tipo="password"
        nombre="password"
        valor={password}
        alCambiar={setPassword}
        requerido
      />
      <button type="submit" className="btn btn-warning mt-3 w-100">
        Iniciar Sesión
      </button>
    </form>
  );
}

export default FormularioLogin;