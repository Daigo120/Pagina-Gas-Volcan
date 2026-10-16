import Boton from '../atomos/Boton';

interface CardProps {
  id: string | number; // Permite tanto números como códigos de texto (ej. "CL001")
  nombre: string;       // Cambiado de titulo a nombre
  desc: string;         // Cambiado de descripcion a desc
  precioResidencial: number; // Cambiado de precio a precioResidencial
  img: string;          // Cambiado de Imagen a img
}

function CardProducto({ id, nombre, desc, precioResidencial, img }: CardProps) {
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
          <Boton id={id} />
        </div>
      </div>
    </div>
  );
}

export default CardProducto;