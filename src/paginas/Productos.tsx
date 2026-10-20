import { useState } from 'react';
import CardProducto from '../componentes/moleculas/CardProducto';
import Carrito from '../componentes/moleculas/Carrito';

interface ItemCarrito {
  id: string | number;
  nombre: string;
  precio: number;
  cantidad: number;
}

function Productos() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const handleAgregarCarrito = (id: string, nombre: string, precio: number) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { id, nombre, precio, cantidad: 1 }];
    });
  };

  // Función para quitar un producto del carrito
  const handleQuitarCarrito = (id: string | number) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  return (
    <div className="container mt-4 mb-5">
      <h1>Productos - Gas El Volcán</h1>

      <div className="d-flex gap-3 flex-wrap">
        <CardProducto
          id="CL001"
          nombre="Cilindro GLP 5 kg"
          desc="Para uso residencial (cocina, calefacción pequeña)."
          precioResidencial={6500}
          img="img/cilindro_5kg.png"
          onAgregarCarrito={() => handleAgregarCarrito("CL001", "Cilindro GLP 5 kg", 6500)}
        />

        <CardProducto
          id="CL002"
          nombre="Cilindro GLP 11 kg"
          desc="Cilindro estándar doméstico. El más utilizado en hogares."
          precioResidencial={12000}
          img="img/cilindro_11kg.png"
          onAgregarCarrito={() => handleAgregarCarrito("CL002", "Cilindro GLP 11 kg", 12000)}
        />

        <CardProducto
          id="CL003"
          nombre="Cilindro GLP 15 kg"
          desc="Cilindro de mayor capacidad para hogares de alto consumo."
          precioResidencial={16000}
          img="img/cilindro_15gk.png"
          onAgregarCarrito={() => handleAgregarCarrito("CL003", "Cilindro GLP 15 kg", 16000)}
        />

        <CardProducto
          id="CL004"
          nombre="Cilindro GLP 45 kg"
          desc="Cilindro industrial. Uso comercial: restaurantes, talleres."
          precioResidencial={45000}
          img="img/cilindro_45kg.png"
          onAgregarCarrito={() => handleAgregarCarrito("CL004", "Cilindro GLP 45 kg", 45000)}
        />

        <CardProducto
          id="RG001"
          nombre="Regulador doméstico estándar"
          desc="Regulador de 1 etapa para cilindros 5, 11 y 15 kg."
          precioResidencial={8990}
          img="img/Regulador.jpg"
          onAgregarCarrito={() => handleAgregarCarrito("RG001", "Regulador doméstico estándar", 8990)}
        />

        <CardProducto
          id="RG002"
          nombre="Regulador de alta presión"
          desc="Regulador para cocinas industriales o equipos de mayor consumo."
          precioResidencial={18990}
          img="img/Regulador2.jpg"
          onAgregarCarrito={() => handleAgregarCarrito("RG002", "Regulador de alta presión", 18990)}
        />

        <CardProducto
          id="MG001"
          nombre="Manguera gas 1.5 m"
          desc="Manguera flexible homologada. Diámetro interior 9mm."
          precioResidencial={3990}
          img="img/manguera.jpg"
          onAgregarCarrito={() => handleAgregarCarrito("MG001", "Manguera gas 1.5 m", 3990)}
        />

        <CardProducto
          id="MG004"
          nombre="Kit conexión completo"
          desc="Regulador + manguera 1.5m + abrazaderas."
          precioResidencial={12990}
          img="img/kit.jpg"
          onAgregarCarrito={() => handleAgregarCarrito("MG004", "Kit conexión completo", 12990)}
        />
      </div>

      {/* Carrito con la función de quitar */}
      <Carrito items={carrito} onQuitarItem={handleQuitarCarrito} />
    </div>
  );
}

export default Productos;