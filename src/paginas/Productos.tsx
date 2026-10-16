import CardProducto from '../componentes/moleculas/CardProducto';

function Productos() {
  return (
    <div className="container mt-4">
      <h1>Productos - Gas El Volcán</h1>

      <div className="d-flex gap-3 flex-wrap">
        <CardProducto
          id="CL001"
          nombre="Cilindro GLP 5 kg"
          desc="Para uso residencial (cocina, calefacción pequeña)."
          precioResidencial={6500}
          img="img/cilindro_5kg.png"
        />

        <CardProducto
          id="CL002"
          nombre="Cilindro GLP 11 kg"
          desc="Cilindro estándar doméstico. El más utilizado en hogares."
          precioResidencial={12000}
          img="img/cilindro_11kg.png"
        />

        <CardProducto
          id="CL003"
          nombre="Cilindro GLP 15 kg"
          desc="Cilindro de mayor capacidad para hogares de alto consumo."
          precioResidencial={16000}
          img="img/cilindro_15gk.png"
        />

        <CardProducto
          id="CL004"
          nombre="Cilindro GLP 45 kg"
          desc="Cilindro industrial. Uso comercial: restaurantes, talleres."
          precioResidencial={45000}
          img="img/cilindro_45kg.png"
        />

        <CardProducto
          id="RG001"
          nombre="Regulador doméstico estándar"
          desc="Regulador de 1 etapa para cilindros 5, 11 y 15 kg."
          precioResidencial={8990}
          img="img/Regulador.jpg"
        />

        <CardProducto
          id="RG002"
          nombre="Regulador de alta presión"
          desc="Regulador para cocinas industriales o equipos de mayor consumo."
          precioResidencial={18990}
          img="img/Regulador2.jpg"
        />

        <CardProducto
          id="MG001"
          nombre="Manguera gas 1.5 m"
          desc="Manguera flexible homologada. Diámetro interior 9mm."
          precioResidencial={3990}
          img="img/manguera.jpg"
        />

        <CardProducto
          id="MG004"
          nombre="Kit conexión completo"
          desc="Regulador + manguera 1.5m + abrazaderas."
          precioResidencial={12990}
          img="img/kit.jpg"
        />
      </div>
    </div>
  );
}

export default Productos;