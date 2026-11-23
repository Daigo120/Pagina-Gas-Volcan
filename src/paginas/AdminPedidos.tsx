import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Interfaces ---
interface DetallePedido {
  id: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  nombreProducto?: string;
}

interface Pedido {
  id: number;
  usuarioId: number;
  total: number;
  estado: string;
  direccion: string;
  horarioEntrega: string;
  notas: string;
  fechaCreacion: string;
  detalles: DetallePedido[];
}

interface Despacho {
  id: number;
  pedidoId: number;
  estado: string;
  fechaDespacho: string;
  nombreUsuario: string;
  correoUsuario: string;
  direccion: string;
  horarioEntrega: string;
}

interface BoletaDB {
  id: number;
  pedidoId: number;
  usuarioId: number;
  montoTotal: number;
  fechaEmision: string;
  detalleJson: string;
}

interface Usuario {
  id: number;
  nombre: string;
  apellido?: string;
  correo: string;
}

function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [despachos, setDespachos] = useState<Despacho[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState<Despacho | null>(null);
  const [boletaOficial, setBoletaOficial] = useState<BoletaDB | null>(null);
  const [cargandoBoleta, setCargandoBoleta] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const token = localStorage.getItem('token'); // <-- OBTENEMOS TOKEN
        
        // 1. Traer Pedidos
        const resPedidos = await fetch('http://localhost:8088/api/pedidos', {
          headers: { 'Authorization': `Bearer ${token}` } // <-- ENVIAMOS TOKEN
        });
        if (!resPedidos.ok) throw new Error('Error al cargar pedidos');
        const dataPedidos: Pedido[] = await resPedidos.json();

        // 2. Traer Despachos
        let dataDespachos: Despacho[] = [];
        try {
          const resDespachos = await fetch('http://localhost:8088/api/despacho', {
            headers: { 'Authorization': `Bearer ${token}` } // <-- ENVIAMOS TOKEN
          });
          if (resDespachos.ok) dataDespachos = await resDespachos.json();
        } catch (e) {
          console.warn("No se pudo conectar con el microservicio de despacho.");
        }

        // 3. Traer Usuarios
        let dataUsuarios: Usuario[] = [];
        try {
          const resUsuarios = await fetch('http://localhost:8088/api/usuarios', {
            headers: { 'Authorization': `Bearer ${token}` } // <-- ENVIAMOS TOKEN
          });
          if (resUsuarios.ok) dataUsuarios = await resUsuarios.json();
        } catch (e) {
          console.warn("No se pudo conectar con el microservicio de usuarios.");
        }

        dataPedidos.sort((a, b) => b.id - a.id);
        
        setPedidos(dataPedidos);
        setDespachos(dataDespachos);
        setUsuarios(dataUsuarios);
      } catch (err) {
        console.error(err);
        setError('Error al cargar la lista de pedidos. Revisa que los microservicios estén corriendo.');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const obtenerDespachoDePedido = (pedidoId: number) => {
    return despachos.find(d => d.pedidoId === pedidoId);
  };

  const obtenerUsuario = (usuarioId: number) => {
    return usuarios.find(u => u.id === usuarioId);
  };

  const abrirBoleta = async (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
    setDespachoSeleccionado(obtenerDespachoDePedido(pedido.id) || null);
    setBoletaOficial(null);
    setCargandoBoleta(true);

    try {
      const token = localStorage.getItem('token'); // <-- OBTENEMOS TOKEN
      const res = await fetch(`http://localhost:8088/api/boletas/pedido/${pedido.id}`, {
        headers: { 'Authorization': `Bearer ${token}` } // <-- ENVIAMOS TOKEN
      });
      if (res.ok) {
        const dataBoleta: BoletaDB = await res.json();
        setBoletaOficial(dataBoleta);
      }
    } catch (e) {
      console.error("Error al conectar con boletas:", e);
    } finally {
      setCargandoBoleta(false);
    }
  };

  const renderModalBoleta = () => {
    if (!pedidoSeleccionado) return null;

    if (!boletaOficial && !cargandoBoleta) {
      return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Boleta no encontrada</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setPedidoSeleccionado(null)}></button>
              </div>
              <div className="modal-body text-center p-5">
                <i className="bi bi-exclamation-triangle text-warning display-1"></i>
                <h5 className="mt-3">No hay boleta registrada para el pedido #{pedidoSeleccionado.id}</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setPedidoSeleccionado(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (cargandoBoleta) {
      return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center p-5">
                <div className="spinner-border text-warning" role="status"></div>
                <p className="mt-2">Conectando con el servicio de boletas...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const totalFinal = boletaOficial!.montoTotal;
    const neto = Math.round(totalFinal / 1.19);
    const iva = totalFinal - neto;
    const fecha = new Date(boletaOficial!.fechaEmision).toLocaleString('es-CL');
    const folio = boletaOficial!.id.toString().padStart(6, '0');

    const usuarioInfo = obtenerUsuario(boletaOficial!.usuarioId);
    const nombreCliente = usuarioInfo ? `${usuarioInfo.nombre} ${usuarioInfo.apellido || ''}`.trim() : `Usuario ID: ${boletaOficial!.usuarioId}`;
    const correoCliente = usuarioInfo ? usuarioInfo.correo : 'No disponible';

    let detallesParaMostrar: DetallePedido[] = [];
    try {
      if (boletaOficial!.detalleJson) {
        detallesParaMostrar = JSON.parse(boletaOficial!.detalleJson);
      }
    } catch (e) {
      console.error("Error al parsear detalleJson de la boleta", e);
    }

    return (
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Boleta Electrónica Oficial</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setPedidoSeleccionado(null)}></button>
            </div>
            <div className="modal-body p-4" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-4">
                  <h5 className="fw-bold mb-1">R.U.T. 77.194.706-9</h5>
                  <h6 className="fw-bold border border-dark border-2 py-2">BOLETA ELECTRÓNICA</h6>
                  <h4 className="fw-bold mt-2">{folio}</h4>
                  <hr />
                  <p className="small mb-0">{fecha}</p>
                  <h6 className="fw-bold mt-2">GAS EL VOLCÁN SPA</h6>
                </div>

                <div className="small mb-3">
                  <p className="mb-0"><strong>Cliente:</strong> {nombreCliente}</p>
                  <p className="mb-0"><strong>Correo:</strong> {correoCliente}</p>
                  <p className="mb-0"><strong>Dirección:</strong> {despachoSeleccionado?.direccion || pedidoSeleccionado.direccion}</p>
                  <p className="mb-0"><strong>Horario:</strong> {despachoSeleccionado?.horarioEntrega || pedidoSeleccionado.horarioEntrega}</p>
                </div>

                <table className="table table-sm table-borderless small mb-3">
                  <thead className="border-bottom border-dark">
                    <tr>
                      <th>Descripción</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detallesParaMostrar.map((item, index) => (
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
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setPedidoSeleccionado(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (cargando) return <div className="container mt-5 text-center"><h4>Cargando pedidos...</h4></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div><Link to="/admin" className="btn btn-primary">Volver al Panel</Link></div>;

  return (
    <div className="container-fluid p-0">
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center border-bottom border-warning border-4">
        <h3 className="m-0" style={{ color: '#ffc107' }}>Gestión de Pedidos</h3>
        <Link to="/admin" className="btn btn-outline-light">Volver al Panel</Link>
      </header>

      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID Pedido</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Dirección</th>
                    <th>Horario Entrega</th>
                    <th>Estado Pedido</th>
                    <th>Estado Despacho</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4">No hay pedidos registrados aún.</td>
                    </tr>
                  ) : (
                    pedidos.map((pedido) => {
                      const despacho = obtenerDespachoDePedido(pedido.id);
                      const usuarioInfo = obtenerUsuario(pedido.usuarioId);
                      const nombreCliente = usuarioInfo ? `${usuarioInfo.nombre} ${usuarioInfo.apellido || ''}`.trim() : `Usuario ID: ${pedido.usuarioId}`;
                      const correoCliente = usuarioInfo ? usuarioInfo.correo : 'No disponible';

                      return (
                        <tr key={pedido.id}>
                          <td className="fw-bold">#{pedido.id}</td>
                          <td>{nombreCliente}</td>
                          <td>{correoCliente}</td>
                          <td>{despacho?.direccion || pedido.direccion}</td>
                          <td>{despacho?.horarioEntrega || pedido.horarioEntrega}</td>
                          <td>
                            <span className={`badge ${pedido.estado === 'PAGADO' ? 'bg-success' : pedido.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                              {pedido.estado}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${despacho?.estado === 'ENTREGADO' ? 'bg-success' : 'bg-info text-dark'}`}>
                              {despacho?.estado || 'Sin despacho'}
                            </span>
                          </td>
                          <td className="fw-bold text-success">${pedido.total.toLocaleString('es-CL')}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-primary" 
                              onClick={() => abrirBoleta(pedido)}
                            >
                              <i className="bi bi-receipt"></i> Ver Boleta Oficial
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {renderModalBoleta()}
    </div>
  );
}

export default AdminPedidos;