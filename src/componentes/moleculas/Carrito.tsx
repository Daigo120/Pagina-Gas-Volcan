import React from 'react';


interface ItemCarrito {
  id: string | number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CarritoProps {
  items: ItemCarrito[];
  onQuitarItem: (id: string | number) => void;
  onFinalizar: () => void; 
}

function Carrito({ items, onQuitarItem, onFinalizar }: CarritoProps) {
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="card shadow-sm border-0 mt-5 mx-auto" style={{ maxWidth: '400px' }}>
      <div className="card-header bg-dark text-white fw-bold py-3">
        Mi Carrito de Compras
      </div>
      <div className="card-body">
        {items.length === 0 ? (
          <div className="p-3 text-center text-muted border rounded mb-3">
            El carrito está vacío
          </div>
        ) : (
          <div className="border rounded p-3 mb-3 bg-white">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="d-flex justify-content-between align-items-center py-2 border-bottom"
              >
                <div>
                  <h6 className="fw-bold mb-0 text-dark">{item.nombre}</h6>
                  <small className="text-muted">
                    ${item.precio.toLocaleString('es-CL')}
                  </small>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm px-3"
                  onClick={() => onQuitarItem(item.id)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fs-5">Total:</span>
          <span className="fs-3 fw-bold text-success">
            ${total.toLocaleString('es-CL')}
          </span>
        </div>

        <button 
          type="button" 
          className="btn btn-success w-100 py-2 fw-bold"
          disabled={items.length === 0}
          onClick={onFinalizar} 
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}

export default Carrito;