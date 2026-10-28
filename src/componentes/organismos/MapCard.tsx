import React from 'react';

const MapaCard = () => (
  <div className="card shadow-sm border-0 h-100">
    <div className="card-body p-0 rounded overflow-hidden">
      <iframe
        title="Mapa de nuestra ubicación"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.292247802043!2d-70.68076012346461!3d-33.363435493062745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c7025c925e0f%3A0x7f2f6a657c08d14a!2sDuoc%20UC%3A%20Sede%20Plaza%20Norte!5e0!3m2!1ses-419!2scl!4v1793215237924!5m2!1ses-419!2scl"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '400px' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
);

export default MapaCard;