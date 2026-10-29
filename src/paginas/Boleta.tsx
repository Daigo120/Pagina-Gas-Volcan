import { Link, useNavigate } from 'react-router-dom';

interface BoletaProps {
  totalPedido: number;
}

function Boleta({ totalPedido }: BoletaProps) {
  const navigate = useNavigate();


  const totalFinal = totalPedido || Number(localStorage.getItem('ultimoTotal')) || 0;

  const folio = Math.floor(100000 + Math.random() * 900000);
  const fechaActual = new Date().toLocaleString('es-CL');


  const neto = Math.round(totalFinal / 1.19);
  const iva = totalFinal - neto;

  const terminarCompra = () => {

    localStorage.removeItem('ultimoTotal');
    navigate('/');
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div 
        className="card shadow p-4" 
        style={{ maxWidth: '400px', width: '100%', backgroundColor: '#fff', border: '1px solid #ccc' }}
      >
        <div className="text-center mb-4">
          <h5 className="fw-bold mb-1">R.U.T. 77194706-9</h5>
          <h6 className="fw-bold border border-dark border-2 py-2">BOLETA ELECTRÓNICA</h6>
          <h4 className="fw-bold mt-2">{folio}</h4>
          <hr />
          <p className="small mb-0">Sii - Valparaíso</p>
          <p className="small mb-0">{fechaActual}</p>
          <h6 className="fw-bold mt-2">GAS EL VOLCÁN SPA</h6>
        </div>

        <div className="small mb-3">
          <p className="mb-0">Giro: Venta de Gas Licuado</p>
          <p className="mb-0">Dirección: Av. Argentina 123, Chillán</p>
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
            <tr>
              <td>Compra de Productos Gas El Volcán</td>
              <td className="text-end">${neto.toLocaleString('es-CL')}</td>
            </tr>
          </tbody>
        </table>

        <div className="border-top border-dark pt-2">
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