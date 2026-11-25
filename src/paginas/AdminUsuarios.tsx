import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { Usuario, TipoUsuario } from "../tipos/Usuario";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [guardando, setGuardando] = useState(false);

  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario | "">("");

  const cargarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8088/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      } else {
        console.error("No se pudieron cargar los usuarios:", res.status);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirModalEditar = (user: Usuario) => {
    setUsuarioEditando(user);
    setRun(user.run);
    setNombre(user.nombre);
    setApellidos(user.apellidos);
    setCorreo(user.correo);
    setTipoUsuario(user.tipoUsuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditando(null);
  };

  const guardarCambios = async (e: FormEvent) => {
    e.preventDefault();
    if (!usuarioEditando) return;

    if (!run.trim()) { alert("Debe ingresar el RUN."); return; }
    if (!nombre.trim() || !apellidos.trim()) { alert("Debe ingresar nombre y apellidos."); return; }
    if (!correo.trim()) { alert("Debe ingresar el correo electrónico."); return; }
    if (!tipoUsuario) { alert("Debe seleccionar un tipo de usuario."); return; }

    
    const usuarioActualizado = {
      run: run.trim(),
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      correo: correo.trim().toLowerCase(),
      tipoUsuario: tipoUsuario as TipoUsuario,
    };

    setGuardando(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8088/api/usuarios/${usuarioEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(usuarioActualizado),
        }
      );

      if (res.ok) {
        alert("Usuario actualizado correctamente.");
        await cargarUsuarios();
        cerrarModal();
      } else {
        const texto = await res.text().catch(() => "");
        console.error("PUT /api/usuarios falló:", res.status, texto);
        alert(`Error al actualizar (${res.status}): ${texto || "sin detalle"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
    } finally {
      setGuardando(false);
    }
  };

  const eliminarUsuario = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar a este usuario?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8088/api/usuarios/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await cargarUsuarios();
      } else {
        const texto = await res.text().catch(() => "");
        console.error("DELETE /api/usuarios falló:", res.status, texto);
        alert(`No se pudo eliminar el usuario (${res.status}).`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
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
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No hay usuarios para mostrar.
                  </td>
                </tr>
              ) : (
                usuarios.map((user) => (
                  <tr key={user.id}>
                    <td>{user.run}</td>
                    <td className="fw-bold">{user.nombre} {user.apellidos}</td>
                    <td>{user.correo}</td>
                    <td className="text-capitalize">{user.tipoUsuario}</td>
                    <td>
                      <span className={`badge ${user.rol === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                        {user.rol}
                      </span>
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
                        onClick={() => eliminarUsuario(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={cerrarModal}
                    disabled={guardando}
                  ></button>
                </div>

                <form onSubmit={guardarCambios} noValidate>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        RUN <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={run}
                        onChange={(e) => setRun(e.target.value)}
                        disabled={guardando}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          Nombre <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          disabled={guardando}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          Apellidos <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={apellidos}
                          onChange={(e) => setApellidos(e.target.value)}
                          disabled={guardando}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Correo Electrónico <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        disabled={guardando}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tipo de Usuario <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value as TipoUsuario | "")}
                        disabled={guardando}
                      >
                        <option value="">Seleccione...</option>
                        <option value="residencial">Residencial</option>
                        <option value="comercial">Comercial</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={cerrarModal}
                      disabled={guardando}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={guardando}>
                      {guardando ? "Guardando..." : "Guardar Cambios"}
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