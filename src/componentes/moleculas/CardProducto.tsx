import Boton from '../atomos/Boton';

interface CardProps {
  id: string | number; 
  nombre: string;       
  desc: string;         
  precioResidencial: number; 
  img: string;          
  onAgregarCarrito?: () => void; // Recibe la función desde la vista principal
}

function CardProducto({ id, nombre, desc, precioResidencial, img, onAgregarCarrito }: CardProps) {
  return (
    <div className="card" style={{ width: '21rem' }}>
      <img
        src={img}
        className="card-img-top"
        alt={nombre}
        style={{ height: '200px', objectFit: 'contain' }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">{desc}</p>
        <p className="card-text fw-bold">${precioResidencial}</p>

        <div className="mt-auto">
          <Boton id={id} onAgregarCarrito={onAgregarCarrito} />
        </div>
      </div>
    </div>
  );
}

export default CardProducto;