import React from 'react';
import HeroInicio from '../componentes/organismos/HeroInicio';
import BeneficiosInicio from '../componentes/organismos/BeneficiosInicio';

const Inicio: React.FC = () => {
  return (
    <div className="container py-4">
      <HeroInicio />
      <BeneficiosInicio />
    </div>
  );
};

export default Inicio;