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
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("residencial");

  
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

   
    const partesNombre = nombreCompleto.trim().split(" ");
    const nuevoNombre = partesNombre[0] || "";
    const nuevosApellidos = partesNombre.slice(1).join(" ") || "";

    
    const usuariosActualizados = usuarios.map((u) => {
      
      if (u.correo === usuarioEditando.correo) {
        return {
          ...u,
          run,
          nombre: nuevoNombre,
          apellidos: nuevosApellidos,
          correo,
          tipoUsuario,
        };
      }
      return u;
    });

    
    localStorage.setItem("usuarios_db", JSON.stringify(usuariosActualizados));
    setUsuarios(usuariosActualizados); 
    cerrarModal(); 
  };

  
  const eliminarUsuario = (correo: string) => {
    if (window.confirm("¿Seguro que deseas eliminar a este usuario?")) {
      const filtrados = usuarios.filter((u) => u.correo !== correo);
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
                      Bloquear
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
                
                <form onSubmit={guardarCambios}>
                  <div className="modal-body">
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">RUN</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={run} 
                        onChange={(e) => setRun(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Nombre y Apellidos</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={nombreCompleto} 
                        onChange={(e) => setNombreCompleto(e.target.value)} 
                        placeholder="Ej: Juan Pérez"
                        required 
                      />
                      <div className="form-text">Escribe el nombre y apellidos separados por un espacio.</div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Correo Electrónico</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Tipo de Usuario</label>
                      <select 
                        className="form-select" 
                        value={tipoUsuario} 
                        onChange={(e) => setTipoUsuario(e.target.value as TipoUsuario)}
                      >
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