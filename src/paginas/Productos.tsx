import { useState, useEffect } from 'react';
import CardProducto from '../componentes/moleculas/CardProducto';
import Carrito from '../componentes/moleculas/Carrito';
import { useNavigate } from 'react-router-dom';

interface ProductoDB {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
}

interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface ProductosProps {
  carrito: ItemCarrito[]; 
  setTotalPedido: (total: number) => void; 
  onAgregar: (id: number, nombre: string, precio: number) => void;
  onQuitar: (id: number) => void;
}

function Productos({ carrito, setTotalPedido, onAgregar, onQuitar }: ProductosProps) {
  const [productosDB, setProductosDB] = useState<ProductoDB[]>([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:8088/api/productos');
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setProductosDB(datos);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        alert("No se pudo conectar con el catálogo de productos.");
      } finally {
        setCargando(false);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const nuevoTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    setTotalPedido(nuevoTotal);
  }, [carrito, setTotalPedido]);

  if (cargando) return <div className="text-center mt-5"><h3>Cargando catálogo...</h3></div>;

  return (
    <div className="container mt-4 mb-5">
      <h1 className="text-center mb-4">Productos - Gas El Volcán</h1>

      {/* Usamos una fila (row) para dividir la pantalla */}
      <div className="row">
        
        {/* COLUMNA IZQUIERDA: Los Productos (ocupa 8 columnas en PC, 12 en móvil) */}
        <div className="col-12 col-lg-8">
          <div className="row g-3">
            {productosDB.map((prod) => (
              <div key={prod.id} className="col-12 col-md-6 d-flex justify-content-center">
                <CardProducto
                  id={prod.id.toString()}
                  nombre={prod.nombre}
                  desc={prod.descripcion}
                  precioResidencial={prod.precio}
                  img={prod.imagenUrl || "img/cilindro_5kg.png"}
                  stock={prod.stock}
                  onAgregarCarrito={() => onAgregar(prod.id, prod.nombre, prod.precio)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: El Carrito (ocupa 4 columnas en PC, 12 en móvil) */}
        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
          {/* La clase 'sticky-top' hace que el carrito te siga mientras haces scroll */}
          <div className="sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <Carrito 
              items={carrito} 
              onQuitarItem={onQuitar} 
              onFinalizar={() => {
                localStorage.setItem('carrito_pendiente', JSON.stringify(carrito));
                navigate('/despacho');
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Productos;