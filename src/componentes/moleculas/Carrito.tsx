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
    <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '400px' }}>
      <div className="card-header bg-dark text-white fw-bold py-3 d-flex justify-content-between align-items-center">
        <span>Mi Carrito de Compras</span>
        {/* Mostramos cuántos productos hay en total */}
        <span className="badge bg-warning text-dark">
          {items.reduce((acc, item) => acc + item.cantidad, 0)} items
        </span>
      </div>
      
      <div className="card-body">
        {items.length === 0 ? (
          <div className="p-3 text-center text-muted border rounded mb-3">
            El carrito está vacío
          </div>
        ) : (
          <div className="border rounded p-3 mb-3 bg-white" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {items.map((item) => (
              <div 
                key={item.id} 
                className="d-flex justify-content-between align-items-center py-2 border-bottom"
              >
                <div>
                  <h6 className="fw-bold mb-0 text-dark">{item.nombre}</h6>
                  
                  {/* AQUÍ SE MUESTRA LA CANTIDAD Y EL PRECIO UNITARIO */}
                  <small className="text-muted">
                    {item.cantidad} x ${item.precio.toLocaleString('es-CL')}
                  </small>
                  
                  {/* AQUÍ SE MUESTRA EL SUBTOTAL POR PRODUCTO */}
                  <div className="fw-bold text-success small mt-1">
                    Subtotal: ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </div>
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

        <div className="d-flex justify-content-between align-items-center mb-3 border-top pt-3">
          <span className="fs-5 fw-bold">Total:</span>
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