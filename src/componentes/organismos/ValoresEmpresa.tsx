import React from 'react';
import CardValor from '../moleculas/CardValor';

const ValoresEmpresa: React.FC = () => {
  return (
    <div className="row g-4 pb-5">
      <div className="col-md-4">
        <CardValor 
          titulo="Misión" 
          icono="bi-bullseye"
          texto="Entregar energía confiable, rápida y segura a cada hogar y pyme de Huechuraba y sus alrededores, garantizando un servicio de excelencia." 
        />
      </div>
      
      <div className="col-md-4">
        <CardValor 
          titulo="Visión" 
          icono="bi-eye"
          texto="Ser la distribuidora de gas preferida de la región metropolitana, destacando por nuestra calidez humana, rapidez y transparencia de tarifas." 
        />
      </div>

      <div className="col-md-4">
        <CardValor 
          titulo="Valores" 
          icono="bi-heart"
          texto="Seguridad integral, responsabilidad con nuestra comunidad, empatía en el trato humano y puntualidad garantizada en cada entrega." 
        />
      </div>
    </div>
  );
};

export default ValoresEmpresa;