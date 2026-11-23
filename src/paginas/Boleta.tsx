import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface BoletaDB {
  id: number;
  pedidoId: number;
  usuarioId: number;
  montoTotal: number;
  fechaEmision: string;
  detalleJson: string;
}

// Interfaz para los productos dentro de la boleta
interface DetalleItem {
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  nombreProducto: string; 
}

function Boleta() {
  const navigate = useNavigate();
  const [boleta, setBoleta] = useState<BoletaDB | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const generarBoleta = async () => {
      const pedidoIdString = localStorage.getItem('pedido_actual_id');
      
      if (!pedidoIdString) {
        setError('No se encontró información del pedido.');
        setCargando(false);
        return;
      }

      const pedidoId = parseInt(pedidoIdString);

      try {
        const token = localStorage.getItem('token');
        const respuesta = await fetch('http://localhost:8088/api/boletas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ pedidoId })
        });

        if (respuesta.ok) {
          const datosBoleta = await respuesta.json();
          setBoleta(datosBoleta);
        } else {
          setError('Error al generar la boleta. Intente nuevamente.');
        }
      } catch (err) {
        console.error("Error de red:", err);
        setError('No se pudo conectar con el servidor de boletas.');
      } finally {
        setCargando(false);
      }
    };

    generarBoleta();
  }, []);

  const terminarCompra = () => {
    localStorage.removeItem('pedido_actual_id');
    localStorage.removeItem('pedido_actual_total');
    localStorage.removeItem('ultimoTotal');
    navigate('/');
  };

  if (cargando) {
    return (
      <div className="container mt-5 text-center">
        <h3>Generando tu boleta electrónica...</h3>
      </div>
    );
  }

  if (error || !boleta) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">{error || 'No se pudo cargar la boleta.'}</div>
        <Link to="/productos" className="btn btn-primary">Volver a Productos</Link>
      </div>
    );
  }

  const totalFinal = boleta.montoTotal;
  const neto = Math.round(totalFinal / 1.19);
  const iva = totalFinal - neto;
  const fechaActual = new Date(boleta.fechaEmision).toLocaleString('es-CL');

  // Parseamos el JSON de detalles que viene del backend
  let detallesParseados: DetalleItem[] = [];
  try {
    if (boleta.detalleJson) {
      detallesParseados = JSON.parse(boleta.detalleJson);
    }
  } catch (e) {
    console.error("Error al leer el detalle de la boleta", e);
  }

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div 
        className="card shadow p-4" 
        style={{ maxWidth: '400px', width: '100%', backgroundColor: '#fff', border: '1px solid #ccc' }}
      >
        <div className="text-center mb-4">
          <h5 className="fw-bold mb-1">R.U.T. 77.194.706-9</h5>
          <h6 className="fw-bold border border-dark border-2 py-2">BOLETA ELECTRÓNICA</h6>
          <h4 className="fw-bold mt-2">{boleta.id.toString().padStart(6, '0')}</h4>
          <hr />
          <p className="small mb-0">Sii - Santiago</p>
          <p className="small mb-0">{fechaActual}</p>
          <h6 className="fw-bold mt-2">GAS EL VOLCÁN SPA</h6>
        </div>

        <div className="small mb-3">
          <p className="mb-0">Giro: Venta de Gas Licuado</p>
          <p className="mb-0">Dirección: Sta. Elena de Huechuraba 1660 </p>
          <p className="mb-0">Fono: 600 777 44 33</p>
        </div>

        <table className="table table-sm table-borderless small mb-3">
          <thead className="border-bottom border-dark">
            <tr>
              <th>Descripción</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Si por alguna razón no hay detalles, mostramos un texto genérico */}
            {detallesParseados.length === 0 && (
              <tr>
                <td>Compra de Productos Gas El Volcán (Pedido #{boleta.pedidoId})</td>
                <td className="text-end">${neto.toLocaleString('es-CL')}</td>
              </tr>
            )}

            {/* Recorremos los productos y los pintamos */}
            {detallesParseados.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.nombreProducto || `Producto ID: ${item.productoId}`} <br/>
                  <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {item.cantidad} x ${item.precioUnitario.toLocaleString('es-CL')}
                  </span>
                </td>
                <td className="text-end align-middle">
                  ${(item.cantidad * item.precioUnitario).toLocaleString('es-CL')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-top border-dark pt-2">
          <div className="d-flex justify-content-between small">
            <span>Neto:</span>
            <span>${neto.toLocaleString('es-CL')}</span>
          </div>
          <div className="d-flex justify-content-between small">
            <span>Iva (19%):</span>
            <span>${iva.toLocaleString('es-CL')}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold fs-5 mt-1">
            <span>Total:</span>
            <span>${totalFinal.toLocaleString('es-CL')}</span>
          </div>
        </div>

        <div className="text-center mt-4 mb-3">
          <i className="bi bi-upc-scan" style={{ fontSize: '4rem', letterSpacing: '-5px' }}></i>
        </div>

        <div className="text-center small text-muted mt-2" style={{ fontSize: '0.7rem' }}>
          <p className="mb-0">Timbre electrónico S.I.I. Resolución: 80 de 22/08/2014</p>
          <p className="mb-0">Verifique documento en www.sii.cl - Documento creado</p>
        </div>

        <button onClick={terminarCompra} className="btn btn-outline-dark w-100 mt-4">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default Boleta;