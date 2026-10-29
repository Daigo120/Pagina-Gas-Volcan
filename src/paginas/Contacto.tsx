import { useState } from 'react';
import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto() {
 
  const [activeAccordion, setActiveAccordion] = useState('');

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    
    <div className="container mt-5 mb-5">
      
      
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center fw-bold">Formulario de Contacto</h2>
            <FormularioContacto />
          </div>
        </div>
      </div>

      
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h2 className="mb-4 text-center text-md-start fw-bold">Preguntas Frecuentes</h2>
          
          <div className="accordion shadow-sm" id="accordionFAQ">
            
           
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingOne">
                <button 
                  className={`accordion-button ${activeAccordion === 'one' ? '' : 'collapsed'}`} 
                  type="button" 
                  onClick={() => toggleAccordion('one')}
                >
                  Servicio al Cliente
                </button>
              </h3>
              <div className={`accordion-collapse collapse ${activeAccordion === 'one' ? 'show' : ''}`}>
                <div className="accordion-body">
                  <p>Para resolver todas tus dudas respecto a temas comerciales, contratos, boletas, medidores, estanques y otras consultas respecto de nuestros servicios.</p>
                  <p>Contáctanos a través de nuestro <strong>formulario de contacto</strong> o llamando al <strong>600 777 44 33</strong> de 08:00 a 19:00 hrs. de Lunes a Viernes.</p>
                </div>
              </div>
            </div>

           
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingTwo">
                <button 
                  className={`accordion-button ${activeAccordion === 'two' ? '' : 'collapsed'}`} 
                  type="button" 
                  onClick={() => toggleAccordion('two')}
                >
                  ¿Cómo puedo actualizar mis datos personales?
                </button>
              </h3>
              <div className={`accordion-collapse collapse ${activeAccordion === 'two' ? 'show' : ''}`}>
                <div className="accordion-body">
                  <p>Para actualizar los datos, direcciones o teléfonos registrados:</p>
                  <ul>
                    <li>Contáctanos a través de nuestro <strong>Formulario de Contacto</strong> o llámanos al Servicio al Cliente <strong>600 777 44 33</strong> (lunes a viernes de 8:00 a 19:00 hrs.).</li>
                    <li>También puedes visitar nuestra sucursal virtual en <a href="https://www.GasVolcan.cl" target="_blank" rel="noreferrer">www.GasVolcan.cl</a>, ingresar con tu correo y contraseña para actualizar tus datos en línea las 24 hrs.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h3 className="accordion-header" id="headingThree">
                <button 
                  className={`accordion-button ${activeAccordion === 'three' ? '' : 'collapsed'}`} 
                  type="button" 
                  onClick={() => toggleAccordion('three')}
                >
                  ¿Cómo hacer un pedido de cilindros?
                </button>
              </h3>
              <div className={`accordion-collapse collapse ${activeAccordion === 'three' ? 'show' : ''}`}>
                <div className="accordion-body">
                  <ul>
                    <li>Haz tu pedido desde nuestra página web <a href="https://www.GasVolcan.cl" target="_blank" rel="noreferrer">www.GasVolcan.cl</a></li>
                    <li>O llama a nuestro call center <strong>600 777 44 33</strong> para ser atendido.</li>
                  </ul>
                </div>
              </div>
            </div>

        
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingFour">
                <button 
                  className={`accordion-button ${activeAccordion === 'four' ? '' : 'collapsed'}`} 
                  type="button" 
                  onClick={() => toggleAccordion('four')}
                >
                  ¿Es seguro tener un Estanque de gas en mi casa?
                </button>
              </h3>
              <div className={`accordion-collapse collapse ${activeAccordion === 'four' ? 'show' : ''}`}>
                <div className="accordion-body">
                  <p>Sí, la instalación de un estanque es segura y se efectúa de acuerdo a la normativa vigente y cumpliendo todas las certificaciones que la SEC exige para esto.</p>
                  <p>Por normativa, los estanques se deben certificar cada 10 años. Una vez cumplido este período, obligatoriamente se realizará el cambio del estanque certificado para el uso de los próximos diez años.</p>
                </div>
              </div>
            </div>

           
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingFive">
                <button 
                  className={`accordion-button ${activeAccordion === 'five' ? '' : 'collapsed'}`} 
                  type="button" 
                  onClick={() => toggleAccordion('five')}
                >
                  ¿Qué formatos de Cilindros de gas vende GasVolcan?
                </button>
              </h3>
              <div className={`accordion-collapse collapse ${activeAccordion === 'five' ? 'show' : ''}`}>
                <div className="accordion-body">
                  <p>GasVolcan comercializa gas licuado normal y gas licuado catalítico en formatos de <strong>5, 11, 15 y 45 kg</strong> para uso residencial o comercial.</p>
                  <p>Para empresas se comercializa además un formato especial de grúas horquilla y la compra de cargas de gas con vales canjeables. Si eres empresa, puedes escribir a <strong>ventasvales@gasvolcan.cl</strong> o llamar al <strong>600 777 44 33</strong>.</p>
                </div>
              </div>
            </div>

          
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingSix">
                <button 
                  className={`accordion-button ${activeAccordion === 'six' ? '' : 'collapsed'}`} 
                  type="button" 
                  onClick={() => toggleAccordion('six')}
                >
                  ¿En qué consiste el gas a Granel o Estanques?
                </button>
              </h3>
              <div className={`accordion-collapse collapse ${activeAccordion === 'six' ? 'show' : ''}`}>
                <div className="accordion-body">
                  <p>El gas Granel consiste en la entrega de gas por litros a clientes que poseen estanques GasVolcan. Sus beneficios incluyen:</p>
                  <ul>
                    <li>Fácil instalación y suministro garantizado.</li>
                    <li>Atención directa sin intermediarios.</li>
                    <li>Control exacto de cuánto gas compras y consumes.</li>
                    <li>Instalación certificada por la SEC (Superintendencia de Electricidad y Combustibles) y convenientes formas de pago.</li>
                  </ul>
                  <p>Nuestros especialistas te asesorarán en terreno recomendándote el tipo de estanque, dimensiones y ubicación ideal.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;