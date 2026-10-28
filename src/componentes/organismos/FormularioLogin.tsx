import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../moleculas/CampoFormulario';
import { usuariosServicio } from "../../servicios/usuariosServicio";
import { esTextoVacio } from "../../validaciones/Validaciones";
import type { Usuario } from '../tipos/Usuario';

interface FormularioLoginProps {
  setUsuarioLogueado: (usuario: Usuario) => void;
}

function FormularioLogin({ setUsuarioLogueado }: FormularioLoginProps) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (esTextoVacio(correo) || esTextoVacio(password)) {
      setError('Debe completar todos los campos.');
      return;
    }

    const encontrado = usuariosServicio.buscarPorCredenciales(correo, password);
    if (encontrado) {
      usuariosServicio.guardarSesion(encontrado);
      setUsuarioLogueado(encontrado);
      navigate('/');
    } else {
      setError('Correo o contraseña incorrectos.');
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