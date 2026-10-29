import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { usuariosServicio } from "../servicios/usuariosServicio";
import type { Usuario, TipoUsuario } from "../tipos/Usuario";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  

  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  

  const [run, setRun] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario | "">("");

  useEffect(() => {
    setUsuarios(usuariosServicio.obtenerTodos());
  }, []);

  const abrirModalEditar = (user: Usuario) => {
    setUsuarioEditando(user);
    setRun(user.run);
    setNombreCompleto(`${user.nombre} ${user.apellidos}`);
    setCorreo(user.correo);
    setTipoUsuario(user.tipoUsuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditando(null);
  };

  const guardarCambios = (e: FormEvent) => {
    e.preventDefault();
    if (!usuarioEditando) return;

    const correoLimpio = correo.trim().toLowerCase();


    if (!run.trim()) {
      alert("Debe ingresar el RUN.");
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
      alert("El RUN ingresado no es válido.");
      return;
    }

    if (!nombreCompleto.trim()) {
      alert("Debe ingresar el nombre y apellido.");
      return;
    }

    if (!correoLimpio) {
      alert("Debe ingresar el correo electrónico.");
      return;
    }


    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(correoLimpio)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    if (!tipoUsuario) {
      alert("Debe seleccionar un tipo de usuario.");
      return;
    }


    const partesNombre = nombreCompleto.trim().split(" ");
    const nuevoNombre = partesNombre[0] || "";
    const nuevosApellidos = partesNombre.slice(1).join(" ") || "";

    const usuariosActualizados = usuarios.map((u) => {
      if (u.correo === usuarioEditando.correo) {
        return {
          ...u,
          run: run.trim(),
          nombre: nuevoNombre,
          apellidos: nuevosApellidos,
          correo: correoLimpio,
          tipoUsuario,
        };
      }
      return u;
    });


    localStorage.setItem("usuarios_db", JSON.stringify(usuariosActualizados));
    setUsuarios(usuariosActualizados);
    
    alert("Usuario actualizado correctamente.");
    cerrarModal();
  };

  const eliminarUsuario = (correoUser: string) => {
    if (window.confirm("¿Seguro que deseas eliminar a este usuario?")) {
      const filtrados = usuarios.filter((u) => u.correo !== correoUser);
      localStorage.setItem("usuarios_db", JSON.stringify(filtrados));
      setUsuarios(filtrados);
    }
  };

  return (
    <div className="container-fluid p-0 position-relative">
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center border-bottom border-warning border-4">
        <h3 className="m-0" style={{ color: "#ffc107" }}>Mantenedor de Usuarios</h3>
        <Link to="/admin" className="btn btn-outline-light btn-sm">Volver al Panel</Link>
      </header>

      <div className="container mt-5">
        <h2 className="mb-4 fw-bold">Usuarios Registrados</h2>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>RUN</th>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.correo}>
                  <td>{user.run}</td>
                  <td className="fw-bold">{user.nombre} {user.apellidos}</td>
                  <td>{user.correo}</td>
                  <td className="text-capitalize">{user.tipoUsuario}</td>
                  <td>
                    <span className="badge bg-success">Activo</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-warning btn-sm me-2 text-dark fw-bold"
                      onClick={() => abrirModalEditar(user)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => eliminarUsuario(user.correo)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalAbierto && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">Editar Usuario</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
                </div>
                

                <form onSubmit={guardarCambios} noValidate>
                  <div className="modal-body">
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">RUN <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={run} 
                        onChange={(e) => setRun(e.target.value)} 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Nombre y Apellidos <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)} 
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Correo Electrónico <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Tipo de Usuario <span className="text-danger">*</span></label>
                      <select 
                        className="form-select" 
                        value={tipoUsuario} 
                        onChange={(e) => setTipoUsuario(e.target.value as TipoUsuario | "")}
                      >
                        <option value="">Seleccione...</option>
                        <option value="residencial">Residencial</option>
                        <option value="comercial">Comercial</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>

                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar Cambios
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default AdminUsuarios;