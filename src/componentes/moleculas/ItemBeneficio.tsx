import React from 'react';

interface ItemBeneficioProps {
  icono: string;
  titulo: string;
  descripcion: string;
}

const ItemBeneficio: React.FC<ItemBeneficioProps> = ({ icono, titulo, descripcion }) => {
  return (
    <div className="text-center p-4">
      <div className="text-volcan mb-3">
        <i className={`bi ${icono} display-4`}></i>
      </div>
      <h5 className="fw-bold">{titulo}</h5>
      <p className="text-muted">{descripcion}</p>
    </div>
  );
};

export default ItemBeneficio;