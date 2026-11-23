import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Mensaje {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  fecha: string;
  respondido: boolean;
  respuesta: string | null;
}

function AdminMensajes() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargando, setCargando] = useState(true);

  // Estados para el modal de respuesta
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<Mensaje | null>(null);
  const [textoRespuesta, setTextoRespuesta] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Cargar los mensajes desde Spring Boot
  const cargarMensajes = async () => {
    try {
      const res = await fetch('http://localhost:8088/api/mensajeria');
      if (res.ok) {
        const data = await res.json();
        setMensajes(data);
      }
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  // Abrir el modal con el mensaje seleccionado
  const abrirModalRespuesta = (mensaje: Mensaje) => {
    setMensajeSeleccionado(mensaje);
    setTextoRespuesta(''); // Limpiamos la caja de texto al abrir
  };

  // Cerrar el modal
  const cerrarModal = () => {
    setMensajeSeleccionado(null);
    setTextoRespuesta('');
  };

  // Enviar la respuesta real al backend
  const enviarRespuesta = async () => {
    if (!textoRespuesta.trim()) {
      alert("Por favor, escribe una respuesta antes de enviar.");
      return;
    }

    if (!mensajeSeleccionado) return;

    try {
      setEnviando(true);
      // Enviamos la respuesta escrita por el admin
      const res = await fetch(`http://localhost:8088/api/mensajeria/${mensajeSeleccionado.id}/responder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(textoRespuesta) // <-- Enviamos el texto real
      });

      if (res.ok) {
        cerrarModal();
        cargarMensajes(); // Recargamos la lista para ver el cambio
      } else {
        alert("Error al enviar la respuesta.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red al conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) return <div className="text-center mt-5"><h3>Cargando mensajes...</h3></div>;

  return (
    <div className="container-fluid p-0">
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center border-bottom border-warning border-4">
        <h3 className="m-0" style={{ color: "#ffc107" }}>Bandeja de Entrada</h3>
        <Link to="/admin" className="btn btn-outline-light btn-sm">Volver al Panel</Link>
      </header>

      <div className="container mt-5">
        <h2 className="mb-4 fw-bold">Mensajes Recibidos</h2>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Mensaje</th>
                <th>Respuesta</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">No hay mensajes recibidos.</td>
                </tr>
              ) : (
                mensajes.map((msg) => (
                  <tr key={msg.id}>
                    <td>{new Date(msg.fecha).toLocaleString('es-CL')}</td>
                    <td className="fw-bold">{msg.nombre}</td>
                    <td>{msg.correo}</td>
                    <td style={{ maxWidth: '300px' }}>{msg.mensaje}</td>
                    <td style={{ maxWidth: '200px' }} className="text-muted small">
                      {msg.respuesta || '-'}
                    </td>
                    <td>
                      {msg.respondido ? (
                        <span className="badge bg-success">Respondido</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pendiente</span>
                      )}
                    </td>
                    <td>
                      {!msg.respondido && (
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => abrirModalRespuesta(msg)}
                        >
                          Responder
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DE RESPUESTA (Bootstrap) --- */}
      {mensajeSeleccionado && (
        <>
          <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">Responder a {mensajeSeleccionado.nombre}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
                </div>
                <div className="modal-body">
                  <p className="mb-2"><strong>Mensaje original:</strong></p>
                  <div className="p-2 bg-light border rounded mb-3 small">
                    {mensajeSeleccionado.mensaje}
                  </div>
                  
                  <label className="form-label fw-bold">Tu respuesta:</label>
                  <textarea 
                    className="form-control" 
                    rows={4} 
                    placeholder="Escribe aquí la respuesta que se enviará por correo..."
                    value={textoRespuesta}
                    onChange={(e) => setTextoRespuesta(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModal} disabled={enviando}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-success" onClick={enviarRespuesta} disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar Respuesta'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminMensajes;