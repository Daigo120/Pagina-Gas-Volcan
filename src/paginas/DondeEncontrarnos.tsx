// src/paginas/DondeEncontrarnos.tsx
import React from 'react';
import MapCard from "../componentes/organismos/MapCard";
import CardItemContacto from "../componentes/organismos/CardItemContacto";

const DondeEncontrarnos: React.FC = () => {
  return (
    <div className="container py-5">
      
      {/* Sección Header */}
      <div className="row mb-5 text-center">
        <div className="col">
          <h2 className="display-5 fw-bold text-volcan">Dónde encontrarnos</h2>
          <p className="lead text-muted">
            Ven a visitarnos o ponte en contacto con nosotros. ¡Estamos aquí para ayudarte!
          </p>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="row g-4 align-items-stretch">
        <div className="col-lg-7">
          <MapCard />
        </div>
        <div className="col-lg-5">
          <CardItemContacto />
        </div>
      </div>
      
    </div>
  );
};

export default DondeEncontrarnos;