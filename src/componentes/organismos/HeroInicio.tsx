import React from 'react';
import { Link } from 'react-router-dom';

const HeroInicio: React.FC = () => {
  return (
    <div className="row align-items-center py-5 mb-5">
      {/* Columna de Texto */}
      <div className="col-lg-6 mb-4 mb-lg-0 text-start">
        <h1 className="display-4 fw-bold mb-4">
          Distribuidora de <span className="text-volcan">Gas El Volcán</span>
        </h1>
        <p className="lead text-muted mb-4">
          Entregamos energía limpia y rápida para tu hogar o empresa. 
          Distribución autorizada y garantizada. El gas que necesitas, cuando lo necesitas.
        </p>
        <Link to="/productos" className="btn btn-volcan btn-lg ">
          Ver Catálogo de Productos
        </Link>
      </div>

      <div className="col-lg-6">
        <img 
          src="public\img\index.png" 
          alt="Vendedor de Gas el Volcán" 
          className="img-fluid rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroInicio;