import React from 'react';

const HeroNosotros: React.FC = () => {
  return (
    <div className="row align-items-center mb-5 pb-4 border-bottom">
      <div className="col-lg-6 mb-4 mb-lg-0 pe-lg-5 text-start">
        <h2 className="display-5 fw-bold mb-4">
          Sobre Distribuidora de <span className="text-volcan">Gas El Volcán</span>
        </h2>
        
       
        <p className="text-muted mb-4">
          Todo comenzó con un solo camión, jornadas interminables y el compromiso inquebrantable de llevar calor a las familias de Huechuraba durante los inviernos más crudos. 
        </p>
        
  
        <p className="text-muted mb-4">
          Nacimos del esfuerzo de un pequeño grupo de trabajadores que entendieron que no solo entregábamos cilindros de gas, sino bienestar, seguridad y tranquilidad a nuestros vecinos. Enfrentamos crisis, días de lluvia intensa y caminos difíciles, pero la confianza de la comunidad nos mantuvo de pie.
        </p>
        

        <p className="text-muted fw-bold">
          Hoy hemos crecido, pero nuestro espíritu sigue siendo el mismo del primer día: para nosotros no eres un número de cliente, eres nuestro vecino.
        </p>
      </div>

      <div className="col-lg-6">
        <img 
          src="public\img\nosotros.jpg" 
          alt="Equipo de Distribuidora de Gas El Volcán" 
          className="img-fluid rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroNosotros;