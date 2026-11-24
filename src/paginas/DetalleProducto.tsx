import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string; 
}

function DetalleProducto() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProducto = async () => {
      if (!id) return;

      try {
        setCargando(true);
       
        const respuesta = await fetch(`http://localhost:8088/api/productos/${id}`);
        
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setProducto(datos);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        console.error("Error de red:", err);
        setError('No se pudo conectar con el servidor de productos.');
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (cargando) {
    return (
      <div className="container mt-5 text-center">
        <h3>Cargando producto...</h3>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container mt-5 text-center">
        <h2>{error || 'Producto no encontrado'}</h2>
        <Link to="/productos" className="btn btn-outline-secondary mt-3">Volver a productos</Link>
      </div>
    );
  }

  
  const imagenFinal = `/${producto.imagenUrl}`; 

  return (
    <div className="container mt-4">
      <h1>Detalle del Producto</h1>
      
      <div className="row mt-4">
        <div className="col-md-5 text-center">
          <img
            src={imagenFinal}
            alt={producto.nombre}
            style={{ width: '100%', maxWidth: '300px', objectFit: 'contain' }}
            className="img-fluid shadow-sm rounded"
          />
        </div>
        
        <div className="col-md-7">
          <h2 className="fw-bold">{producto.nombre}</h2>
          <p className="text-muted fs-5">{producto.descripcion}</p>
          
          <hr />
          
          <p className="fw-bold text-success fs-3 mb-1">
            ${producto.precio.toLocaleString('es-CL')}
          </p>
          
          <p className={`fw-bold ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
            {producto.stock > 0 ? `Stock disponible: ${producto.stock} unidades` : 'Sin stock'}
          </p>
          
          <Link to="/productos" className="btn btn-outline-secondary mt-4">
            Volver a productos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;