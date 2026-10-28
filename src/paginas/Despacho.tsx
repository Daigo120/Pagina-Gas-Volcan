import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface DespachoProps {
  totalPedido: number;
}

function Despacho({ totalPedido }: DespachoProps) {
  const navigate = useNavigate();
  
  
  const [direccion, setDireccion] = useState('');
  const [zona, setZona] = useState('');
  const [horario, setHorario] = useState('');
  const [notas, setNotas] = useState('');

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    if (!direccion || !zona || !horario) {
      alert("Por favor, completa los datos obligatorios de entrega.");
      return;
    }
    
    alert(`Pedido por $${totalPedido.toLocaleString('es-CL')} agendado con éxito.`);
    navigate('/pago'); 
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Zona de Despacho</h2>
        <Link to="/productos" className="btn btn-outline-secondary">
          Volver a Productos
        </Link>
      </div>

      
      <div className="table-responsive mb-5 shadow-sm">
        <table className="table table-bordered align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Cobertura y Horarios de Entrega</th>
              <th>Comunas cubiertas</th>
              <th>Días de despacho</th>
              <th>Horario</th>
              <th>Tiempo estimado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">Zona Centro</td>
              <td>Chillán (sectores centro, norte y sur)</td>
              <td>Lunes a Sábado</td>
              <td>08:00 - 20:00</td>
              <td>1 - 3 horas</td>
            </tr>
            <tr>
              <td className="fw-bold">Zona Oriente</td>
              <td>Chillán (sector oriente), Chillán Viejo</td>
              <td>Lunes a Viernes</td>
              <td>08:00 - 18:00</td>
              <td>2 - 4 horas</td>
            </tr>
            <tr>
              <td className="fw-bold">Zona Rural</td>
              <td>El Carmen, Pinto, San Ignacio</td>
              <td>Martes y Jueves</td>
              <td>08:00 - 16:00</td>
              <td>3 - 6 horas</td>
            </tr>
            <tr>
              <td className="fw-bold">Zona Sur</td>
              <td>Bulnes, Quillón</td>
              <td>Miércoles</td>
              <td>08:00 - 16:00</td>
              <td>4 - 6 horas</td>
            </tr>
            <tr>
              <td className="fw-bold">Zona Comercial</td>
              <td>Parques industriales y locales comerciales</td>
              <td>Lunes a Viernes</td>
              <td>07:00 - 17:00</td>
              <td>Según agenda</td>
            </tr>
          </tbody>
        </table>
      </div>

      
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-header bg-warning text-dark fw-bold py-3 text-center">
          Completa los Datos para la Entrega
        </div>
        <div className="card-body p-4">
          <form onSubmit={manejarEnvio}>
            
            
            <div className="mb-3">
              <label className="form-label fw-bold">Dirección de Entrega <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej: Av. Argentina 1234, Depto 501"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>

           
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Zona / Sector <span className="text-danger">*</span></label>
                <select 
                  className="form-select"
                  value={zona}
                  onChange={(e) => setZona(e.target.value)}
                  required
                >
                  <option value="">Selecciona tu zona...</option>
                  <option value="Zona Centro">Zona Centro (Chillán centro, norte y sur)</option>
                  <option value="Zona Oriente">Zona Oriente (Chillán oriente, Chillán Viejo)</option>
                  <option value="Zona Rural">Zona Rural (El Carmen, Pinto, San Ignacio)</option>
                  <option value="Zona Sur">Zona Sur (Bulnes, Quillón)</option>
                  <option value="Zona Comercial">Zona Comercial (Parques industriales)</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Horario Preferente <span className="text-danger">*</span></label>
                <select 
                  className="form-select"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  required
                >
                  <option value="">Selecciona un bloque...</option>
                  <option value="Mañana (08:00 - 13:00)">Mañana (08:00 - 13:00)</option>
                  <option value="Tarde (13:00 - 18:00)">Tarde (13:00 - 18:00)</option>
                  <option value="Vespertino (18:00 - 20:00)">Vespertino (18:00 - 20:00)</option>
                </select>
              </div>
            </div>

            {/* Input Notas */}
            <div className="mb-4">
              <label className="form-label fw-bold">Notas o Indicaciones Adicionales</label>
              <textarea 
                className="form-control" 
                rows={2}
                placeholder="Ej: Timbre defectuoso, dejar con conserje..."
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
              ></textarea>
            </div>

            {/* Total y Botón */}
            <div className="d-flex justify-content-between align-items-end border-top pt-4 mt-2">
              <div>
                <span className="text-muted d-block">Monto Pedido:</span>
                <span className="fs-3 fw-bold text-success">
                  ${totalPedido.toLocaleString('es-CL')}
                </span>
              </div>
              <button type="submit" className="btn btn-success fw-bold px-4 py-2">
                Continuar al Pago →
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Despacho;