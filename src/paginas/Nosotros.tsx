import React from 'react';
import HeroNosotros from '../componentes/organismos/HeroNosotros';
import ValoresEmpresa from '../componentes/organismos/ValoresEmpresa';

const Nosotros: React.FC = () => {
  return (
    <div className="container py-5">
      <HeroNosotros />
      <ValoresEmpresa />
    </div>
  );
};

export default Nosotros;