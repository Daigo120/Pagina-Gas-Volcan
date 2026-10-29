import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface PagoProps {
  totalPedido: number;
}

function Pago({ totalPedido }: PagoProps) {
  const navigate = useNavigate();
  const [tarjeta, setTarjeta] = useState('');
  const [fecha, setFecha] = useState('');
  const [cvv, setCvv] = useState('');
  const [cuotas, setCuotas] = useState('Sin Cuotas');

  const manejarPago = (e: FormEvent) => {
    e.preventDefault();

    alert(`¡Pago exitoso por $${totalPedido.toLocaleString('es-CL')}! Tu pedido está en camino.`);
    navigate('/productos');
  };


  const formularioCompleto = tarjeta.length === 16 && fecha.length >= 4 && cvv.length === 3;

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Pasarela de Pago</h2>
        <Link to="/despacho" className="btn btn-outline-secondary">
          Volver a Despacho
        </Link>
      </div>

      <div className="card shadow-sm mx-auto" style={{ maxWidth: '450px' }}>
        <div className="card-body p-4 text-center">
          
          <h5 className="fw-bold mb-4">Ingresa los datos de tu tarjeta:</h5>

          {/* TARJETA VISUAL */}
          <div 
            className="mx-auto mb-4 p-3 rounded-3 text-white d-flex flex-column justify-content-between shadow"
            style={{ 
              maxWidth: '300px', height: '170px', 
              background: 'linear-gradient(135deg, #b8c0cd 0%, #9ba6b6 100%)',
              color: '#fff'
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <i className="bi bi-credit-card fs-2"></i>
              <span className="fw-bold small">Crédito</span>
            </div>
            
            <div className="fs-5 fw-bold text-start mt-3">
              {tarjeta ? tarjeta.replace(/(\d{4})/g, '$1 ').trim() : 'XXXX XXXX XXXX XXXX'}
            </div>
            
            <div className="d-flex justify-content-between align-items-end">
              <small>{fecha || 'XX/XX'}</small>
              <div className="d-flex gap-1">
                 <div style={{ backgroundColor: '#eb001b', width: '25px', height: '15px', borderRadius: '50%' }}></div>
                 <div style={{ backgroundColor: '#f79e1b', width: '25px', height: '15px', borderRadius: '50%', marginLeft: '-10px' }}></div>
              </div>
            </div>
          </div>

          <form onSubmit={manejarPago} className="text-start">
            
            <div className="mb-3">
              <label className="form-label text-muted small mb-1">Número de tarjeta</label>
              <input 
                type="text" 
                className="form-control bg-light"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={16}
                value={tarjeta}
                onChange={(e) => setTarjeta(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label text-muted small mb-1">Fecha de expiración</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="MM/AA"
                  maxLength={5}
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
              <div className="col-6">
                <label className="form-label text-muted small mb-1 d-flex justify-content-between">
                  CVV <i className="bi bi-question-circle text-muted"></i>
                </label>
                <div className="input-group">
                  <input 
                    type="password" 
                    className="form-control"
                    placeholder="..."
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                  <span className="input-group-text bg-white"><i className="bi bi-eye"></i></span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small mb-1">Cuotas</label>
              <select 
                className="form-select"
                value={cuotas}
                onChange={(e) => setCuotas(e.target.value)}
              >
                <option value="Sin Cuotas">Sin Cuotas</option>
                <option value="3 Cuotas sin interés">3 Cuotas sin interés</option>
                <option value="6 Cuotas">6 Cuotas</option>
                <option value="12 Cuotas">12 Cuotas</option>
              </select>
            </div>

            <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-3">
              <span className="text-muted">Total a pagar:</span>
              <span className="fs-4 fw-bold text-success">${totalPedido.toLocaleString('es-CL')}</span>
            </div>

            
            <button 
              type="submit" 
              className={`btn w-100 py-2 fw-bold ${formularioCompleto ? 'btn-success' : 'btn-secondary'}`}
              disabled={!formularioCompleto}
              style={{ 
                backgroundColor: formularioCompleto ? '' : '#d0d6e1', 
                color: formularioCompleto ? '#fff' : '#6c757d', 
                border: 'none' 
              }}
            >
              Pagar
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Pago;