import React from 'react';
import CardValor from '../moleculas/CardValor';

const BeneficiosInicio: React.FC = () => {
  return (
    <div className="row g-4 py-5 border-top">
      <div className="col-md-4">
        <CardValor 
          icono="bi-fire" 
          titulo="Gas Envasado de Calidad" 
          texto="Durabilidad y rendimiento garantizado para tu hogar y negocio." 
        />
      </div>
      <div className="col-md-4">
        <CardValor 
          icono="bi-truck" 
          titulo="Despacho Rápido y Seguro" 
          texto="Entregas a domicilio oportunas con personal altamente capacitado." 
        />
      </div>
      <div className="col-md-4">
        <CardValor 
          icono="bi-shield-check" 
          titulo="Seguridad Certificada" 
          texto="Sellos de garantía intactos y revisión de válvulas en cada entrega." 
        />
      </div>
    </div>
  );
};

export default BeneficiosInicio;