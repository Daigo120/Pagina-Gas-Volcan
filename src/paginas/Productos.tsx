import { useState, useEffect } from 'react';
import CardProducto from '../componentes/moleculas/CardProducto';
import Carrito from '../componentes/moleculas/Carrito';
import { productosServicio, type Producto } from '../servicios/productosServicio';
import { useNavigate } from 'react-router-dom';

interface ItemCarrito {
  id: string | number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface ProductosProps {
  carrito: ItemCarrito[]; 
  setTotalPedido: (total: number) => void; 
  onAgregar: (id: string, nombre: string, precio: number) => void;
  onQuitar: (id: string | number) => void;
}

function Productos({ carrito, setTotalPedido, onAgregar, onQuitar }: ProductosProps) {
  const [productosDB, setProductosDB] = useState<Producto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProductosDB(productosServicio.obtenerTodos());
  }, []);

  useEffect(() => {
    const nuevoTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    setTotalPedido(nuevoTotal);
  }, [carrito, setTotalPedido]);

  const getPrecio = (codigo: string, precioPorDefecto: number) => {
    const prod = productosDB.find(p => p.codigo === codigo);
    return prod ? prod.precio : precioPorDefecto;
  };

  const getStock = (codigo: string) => {
    const prod = productosDB.find(p => p.codigo === codigo);
    return prod ? prod.stock : undefined;
  };

  const getDesc = (codigo: string, descPorDefecto: string) => {
    const prod = productosDB.find(p => p.codigo === codigo);
    return prod?.descripcion || descPorDefecto;
  };

  const getImg = (codigo: string, imgPorDefecto: string) => {
    const prod = productosDB.find(p => p.codigo === codigo);
    return prod?.imagen || imgPorDefecto;
  };

  const codigosHardcodeados = ["CL001", "CL002", "CL003", "CL004", "RG001", "RG002", "MG001", "MG004"];
  const productosNuevos = productosDB.filter(p => !codigosHardcodeados.includes(p.codigo));

  return (
    <div className="container mt-4 mb-5">
      <h1 className="text-center mb-4">Productos - Gas El Volcán</h1>

      <div className="row g-3">
        
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="CL001" nombre="Cilindro GLP 5 kg"
            desc={getDesc("CL001", "Para uso residencial (cocina, calefacción pequeña).")}
            precioResidencial={getPrecio("CL001", 6500)}
            img={getImg("CL001", "img/cilindro_5kg.png")}
            stock={getStock("CL001")}
    
            onAgregarCarrito={() => onAgregar("CL001", "Cilindro GLP 5 kg", getPrecio("CL001", 6500))}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="CL002" nombre="Cilindro GLP 11 kg"
            desc={getDesc("CL002", "Cilindro estándar doméstico. El más utilizado en hogares.")}
            precioResidencial={getPrecio("CL002", 12000)}
            img={getImg("CL002", "img/cilindro_11kg.png")}
            stock={getStock("CL002")}
            onAgregarCarrito={() => onAgregar("CL002", "Cilindro GLP 11 kg", getPrecio("CL002", 12000))}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="CL003" nombre="Cilindro GLP 15 kg"
            desc={getDesc("CL003", "Cilindro de mayor capacidad para hogares de alto consumo.")}
            precioResidencial={getPrecio("CL003", 16000)}
            img={getImg("CL003", "img/cilindro_15gk.png")}
            stock={getStock("CL003")}
            onAgregarCarrito={() => onAgregar("CL003", "Cilindro GLP 15 kg", getPrecio("CL003", 16000))}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="CL004" nombre="Cilindro GLP 45 kg"
            desc={getDesc("CL004", "Cilindro industrial. Uso comercial: restaurantes, talleres.")}
            precioResidencial={getPrecio("CL004", 45000)}
            img={getImg("CL004", "img/cilindro_45kg.png")}
            stock={getStock("CL004")}
            onAgregarCarrito={() => onAgregar("CL004", "Cilindro GLP 45 kg", getPrecio("CL004", 45000))}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="RG001" nombre="Regulador doméstico estándar"
            desc={getDesc("RG001", "Regulador de 1 etapa para cilindros 5, 11 y 15 kg.")}
            precioResidencial={getPrecio("RG001", 8990)}
            img={getImg("RG001", "img/Regulador.jpg")}
            stock={getStock("RG001")}
            onAgregarCarrito={() => onAgregar("RG001", "Regulador doméstico estándar", getPrecio("RG001", 8990))}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="RG002" nombre="Regulador de alta presión"
            desc={getDesc("RG002", "Regulador para cocinas industriales o equipos de mayor consumo.")}
            precioResidencial={getPrecio("RG002", 18990)}
            img={getImg("RG002", "img/Regulador2.jpg")}
            stock={getStock("RG002")}
            onAgregarCarrito={() => onAgregar("RG002", "Regulador de alta presión", getPrecio("RG002", 18990))}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="MG001" nombre="Manguera gas 1.5 m"
            desc={getDesc("MG001", "Manguera flexible homologada. Diámetro interior 9mm.")}
            precioResidencial={getPrecio("MG001", 3990)}
            img={getImg("MG001", "img/manguera.jpg")}
            stock={getStock("MG001")}
            onAgregarCarrito={() => onAgregar("MG001", "Manguera gas 1.5 m", getPrecio("MG001", 3990))}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <CardProducto
            id="MG004" nombre="Kit conexión completo"
            desc={getDesc("MG004", "Regulador + manguera 1.5m + abrazaderas.")}
            precioResidencial={getPrecio("MG004", 12990)}
            img={getImg("MG004", "img/kit.jpg")}
            stock={getStock("MG004")}
            onAgregarCarrito={() => onAgregar("MG004", "Kit conexión completo", getPrecio("MG004", 12990))}
          />
        </div>

        {productosNuevos.map((prod) => (
          <div key={prod.codigo} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
            <CardProducto
              id={prod.codigo}
              nombre={prod.nombre}
              desc={prod.descripcion || prod.categoria}
              precioResidencial={prod.precio}
              img={prod.imagen || "img/cilindro_5kg.png"}
              stock={prod.stock}
              onAgregarCarrito={() => onAgregar(prod.codigo, prod.nombre, prod.precio)}
            />
          </div>
        ))}
      </div>

      <Carrito 
        items={carrito} 
        onQuitarItem={onQuitar} 
        onFinalizar={() => navigate('/despacho')}
      />
    </div>
  );
}

export default Productos;