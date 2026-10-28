import React from 'react';
import ItemContacto from "../moleculas/ItemContacto";

const CardItemContacto = () => (
  <div className="card shadow-sm border-0 h-100 bg-light">
    <div className="card-body p-5">
      <h4 className="card-title fw-bold mb-4">Información de Contacto</h4>
      
      <ItemContacto iconClass="bi-geo-alt-fill" title="Nuestra Oficina">
        <p className="mb-0">
          Sta. Elena de Huechuraba 1660, piso 4, sala 423<br />
          Huechuraba, Región Metropolitana<br />
          Chile
        </p>
      </ItemContacto>

      <ItemContacto iconClass="bi-telephone-fill" title="Llámanos">
        <p className="mb-0">+56 9 1234 5678</p>
      </ItemContacto>

      <ItemContacto iconClass="bi-envelope-fill" title="Correo Electrónico">
        <p className="mb-0">RRHH@GasVolcan.cl</p>
      </ItemContacto>

      <ItemContacto iconClass="bi-clock-fill" title="Horario de Atención">
        <p className="mb-0">
          Lunes a Viernes: 09:00 - 18:00 hrs<br />
          Sábados: 10:00 - 14:00 hrs
        </p>
      </ItemContacto>
    </div>
  </div>
);

export default CardItemContacto;