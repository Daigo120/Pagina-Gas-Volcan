import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productosServicio, type Producto } from '../servicios/productosServicio';

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (id) {
      const todosLosProductos = productosServicio.obtenerTodos();
      const encontrado = todosLosProductos.find((item) => item.codigo === id);
      setProducto(encontrado || null);
    }
  }, [id]);

  if (!producto) {
    return (
      <div className="container mt-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-outline-secondary mt-3">Volver a productos</Link>
      </div>
    );
  }

 
  const imagenes: Record<string, string> = {
    "CL001": "cilindro_5kg.png",
    "CL002": "cilindro_11kg.png",
    "CL003": "cilindro_15gk.png",
    "CL004": "cilindro_45kg.png",
    "RG001": "Regulador.jpg",
    "RG002": "Regulador2.jpg",
    "MG001": "manguera.jpg",
    "MG004": "kit.jpg"
  };

  const descripciones: Record<string, string> = {
    "CL001": "Para uso residencial (cocina, calefacción pequeña).",
    "CL002": "Cilindro estándar doméstico. El más utilizado en hogares.",
    "CL003": "Cilindro de mayor capacidad para hogares de alto consumo.",
    "CL004": "Cilindro industrial. Uso comercial: restaurantes, talleres.",
    "RG001": "Regulador de 1 etapa para cilindros 5, 11 y 15 kg.",
    "RG002": "Regulador para cocinas industriales o equipos de mayor consumo.",
    "MG001": "Manguera flexible homologada. Diámetro interior 9mm.",
    "MG004": "Regulador + manguera 1.5m + abrazaderas."
  };

  
  const imagenFinal = producto.imagen || imagenes[producto.codigo] || 'cilindro_5kg.png';
  const descripcionFinal = producto.descripcion || descripciones[producto.codigo] || producto.categoria;

  return (
    <div className="container mt-4">
      <h1>Detalle del Producto</h1>
      
      <img
        src={`/img/${imagenFinal}`}
        alt={producto.nombre}
        style={{ width: '300px', objectFit: 'contain' }}
      />
      
      <h2 className="mt-3">{producto.nombre}</h2>
      
      
      <p className="text-muted">{descripcionFinal}</p>
      <p className="text-muted text-capitalize small">Categoría: {producto.categoria}</p>
      
      <p className="fw-bold text-success fs-4">${producto.precio.toLocaleString('es-CL')}</p>
      
      <p className="text-dark fw-bold">Stock disponible: {producto.stock} unidades</p>
      
      <Link to="/productos" className="btn btn-outline-secondary mb-3 mt-3">
        Volver a productos
      </Link>
    </div>
  );
}

export default DetalleProducto;