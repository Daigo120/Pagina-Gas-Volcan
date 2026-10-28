import React from 'react';

interface CardValorProps {
  titulo: string;
  texto: string;
  icono: string;
}

const CardValor: React.FC<CardValorProps> = ({ titulo, texto, icono }) => {
  return (
    <div className="card h-100 shadow-sm border-0 text-center p-4">
      <div className="card-body">
        <div className="text-volcan mb-3">
          <i className={`bi ${icono} display-5`}></i>
        </div>
        <h4 className="fw-bold mb-3">{titulo}</h4>
        <p className="text-muted mb-0">{texto}</p>
      </div>
    </div>
  );
};

export default CardValor;