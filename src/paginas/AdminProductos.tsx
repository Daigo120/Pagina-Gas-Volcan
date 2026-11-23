import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
}

function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState<number | null>(null);
  
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number | string>("");
  const [stock, setStock] = useState<number | string>("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const cargarProductos = async () => {
    try {
      const token = localStorage.getItem('token'); // <-- TOKEN
      const res = await fetch('http://localhost:8088/api/productos', {
        headers: { 'Authorization': `Bearer ${token}` } // <-- TOKEN (opcional si es público)
      });
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const abrirModalNuevo = () => {
    setEditando(false);
    setIdEditando(null);
    setNombre("");
    setPrecio("");
    setStock("");
    setDescripcion("");
    setImagenUrl("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (prod: Producto) => {
    setEditando(true);
    setIdEditando(prod.id);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setStock(prod.stock);
    setDescripcion(prod.descripcion || "");
    setImagenUrl(prod.imagenUrl || "");
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const guardarProducto = async (e: FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) { alert("Debe ingresar el nombre del producto."); return; }
    if (precio === "" || Number(precio) <= 0) { alert("Debe ingresar un precio válido."); return; }
    if (stock === "" || Number(stock) < 0) { alert("Debe ingresar un stock válido."); return; }

    const productoData = {
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: Number(stock),
      descripcion: descripcion.trim(),
      imagenUrl: imagenUrl.trim(),
    };

    try {
      const token = localStorage.getItem('token'); // <-- TOKEN
      const url = editando 
        ? `http://localhost:8088/api/productos/${idEditando}` 
        : 'http://localhost:8088/api/productos';
      
      const metodo = editando ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: metodo,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <-- TOKEN
        },
        body: JSON.stringify(productoData)
      });

      if (res.ok) {
        alert(editando ? "Producto actualizado" : "Producto creado");
        cargarProductos();
        cerrarModal();
      } else {
        alert("Error al guardar el producto.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
    }
  };

  const eliminarProducto = async (id: number) => {
    if (window.confirm(`¿Seguro que deseas eliminar el producto ID ${id}?`)) {
      try {
        const token = localStorage.getItem('token'); // <-- TOKEN
        const res = await fetch(`http://localhost:8088/api/productos/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` } // <-- TOKEN
        });
        if (res.ok) {
          cargarProductos();
        } else {
          alert("No se pudo eliminar el producto.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ... (El return de AdminProductos se mantiene igual) ...
  return (
    <div className="container-fluid p-0 position-relative">
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center border-bottom border-warning border-4">
        <h3 className="m-0" style={{ color: "#ffc107" }}>Mantenedor de Productos</h3>
        <Link to="/admin" className="btn btn-outline-light btn-sm">Volver al Panel</Link>
      </header>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">Catálogo Actual</h2>
          <button className="btn btn-success fw-bold" onClick={abrirModalNuevo}>
            + Nuevo Producto
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td className="fw-bold">{prod.nombre}</td>
                  <td>${prod.precio.toLocaleString('es-CL')}</td>
                  <td className="text-center fw-bold">{prod.stock}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => abrirModalEditar(prod)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(prod.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalAbierto && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">{editando ? "Editar Producto" : "Nuevo Producto"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
                </div>
                <form onSubmit={guardarProducto} noValidate>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nombre del Producto <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Precio <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} min="0" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Stock <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} min="0" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Descripción (Opcional)</label>
                      <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={2}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Ruta de la Imagen (Opcional)</label>
                      <input type="text" className="form-control" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} placeholder="Ej: img/cilindro_5kg.png" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">Guardar Producto</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminProductos;