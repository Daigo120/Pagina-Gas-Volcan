import React from 'react';
import ItemBeneficio from '../moleculas/ItemBeneficio';

const BeneficiosInicio: React.FC = () => {
  return (
    <div className="row g-4 py-5 border-top">
      <div className="col-md-4">
        <ItemBeneficio 
          icono="bi-fire" 
          titulo="Gas Envasado de Calidad" 
          descripcion="Durabilidad y rendimiento garantizado para tu hogar y negocio." 
        />
      </div>
      <div className="col-md-4">
        <ItemBeneficio 
          icono="bi-truck" 
          titulo="Despacho Rápido y Seguro" 
          descripcion="Entregas a domicilio oportunas con personal altamente capacitado." 
        />
      </div>
      <div className="col-md-4">
        <ItemBeneficio 
          icono="bi-shield-check" 
          titulo="Seguridad Certificada" 
          descripcion="Sellos de garantía intactos y revisión de válvulas en cada entrega." 
        />
      </div>
    </div>
  );
};

export default BeneficiosInicio;