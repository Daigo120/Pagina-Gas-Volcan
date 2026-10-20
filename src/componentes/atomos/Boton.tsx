import { Link } from 'react-router-dom';

interface BotonProps {
  id: string | number; // Cambiado a string | number según tus props originales
  onAgregarCarrito?: () => void; // Función opcional para el botón de carrito
}

function Boton({ id, onAgregarCarrito }: BotonProps) {
  return (
    <div className="d-flex gap-2">
      <Link to={`/producto/${id}`} className="btn btn-outline-secondary w-50">
        Ver detalle
      </Link>
      <button 
        type="button" 
        className="btn btn-warning w-50" 
        onClick={onAgregarCarrito}
      >
        Agregar
      </button>
    </div>
  );
}

export default Boton;