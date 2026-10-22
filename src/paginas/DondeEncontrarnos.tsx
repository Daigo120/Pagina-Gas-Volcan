import React from 'react';

const DondeEncontrarnos: React.FC = () => {
  return (
    <div className="container py-5">
      {/* Título de la página */}
      <div className="row mb-5 text-center">
        <div className="col">
          <h2 className="display-5 fw-bold text-primary">Dónde Encontrarnos</h2>
          <p className="lead text-muted">
            Ven a visitarnos o ponte en contacto con nosotros. ¡Estamos aquí para ayudarte!
          </p>
        </div>
      </div>

      <div className="row g-4 align-items-stretch">
        {/* Columna Izquierda: Mapa de Google */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-0 rounded overflow-hidden">
              {/* Reemplaza el src con el link "Insertar mapa" (Embed) de tu negocio en Google Maps */}
              <iframe
                title="Mapa de nuestra ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.1!2d-70.650!3d-33.437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzEzLjIiUyA3MMKwMzknMDAuMCJX!5e0!3m2!1ses-419!2scl!4v1600000000000!5m2!1ses-419!2scl"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Información de Contacto */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body p-5">
              <h4 className="card-title fw-bold mb-4">Información de Contacto</h4>

              {/* Dirección */}
              <div className="d-flex mb-4">
                <div className="text-primary me-3">
                  <i className="bi bi-geo-alt-fill fs-3"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Nuestra Oficina</h6>
                  <p className="text-muted mb-0">
                    Av. Principal 1234, Piso 5<br />
                    Huechuraba, Región Metropolitana<br />
                    Chile
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="d-flex mb-4">
                <div className="text-primary me-3">
                  <i className="bi bi-telephone-fill fs-3"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Llámanos</h6>
                  <p className="text-muted mb-0">+56 9 1234 5678</p>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="d-flex mb-4">
                <div className="text-primary me-3">
                  <i className="bi bi-envelope-fill fs-3"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Correo Electrónico</h6>
                  <p className="text-muted mb-0">RRHH@GasVolcan.cl</p>
                </div>
              </div>

              {/* Horarios */}
              <div className="d-flex">
                <div className="text-primary me-3">
                  <i className="bi bi-clock-fill fs-3"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Horario de Atención</h6>
                  <p className="text-muted mb-0">
                    Lunes a Viernes: 09:00 - 18:00 hrs<br />
                    Sábados: 10:00 - 14:00 hrs
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DondeEncontrarnos;