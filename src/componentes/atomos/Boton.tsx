import { Link } from 'react-router-dom';

interface BotonProps {
  id: string | number;
  stock: number?; 
  onAgregarCarrito?: () => void;
}

function Boton({ id, stock, onAgregarCarrito }: BotonProps) {
  const sinStock = stock <= 0;

  return (
    <div className="d-flex gap-2">
      <Link to={`/producto/${id}`} className="btn btn-outline-secondary w-50">
        Ver detalle
      </Link>
      <button 
        type="button" 
        className={`btn w-50 ${sinStock ? 'btn-secondary' : 'btn-warning'}`}
        onClick={onAgregarCarrito}
        disabled={sinStock}
      >
        {sinStock ? 'Sin Stock' : 'Agregar'}
      </button>
    </div>
  );
}

export default Boton;