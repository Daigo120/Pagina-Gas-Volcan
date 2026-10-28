import Boton from '../atomos/Boton';

interface CardProps {
  id: string | number; 
  nombre: string;       
  desc: string;         
  precioResidencial: number; 
  img: string;          
  stock: number?;
  onAgregarCarrito?: () => void;
}

function CardProducto({ id, nombre, desc, precioResidencial, img, stock, onAgregarCarrito }: CardProps) {
  return (
    <div className="card text-center" style={{ width: '19.6rem' }}>
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

        <div className="mt-auto d-flex justify-content-center gap-2">
        
          <Boton id={id} stock={stock} onAgregarCarrito={onAgregarCarrito} />
        </div>
      </div>
    </div>
  );
}

export default CardProducto;