import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { productosServicio, type Producto } from "../servicios/productosServicio";

// ==========================================
// 1. TABLA (Recibe Props)
// ==========================================
interface TablaProductosProps {
  productos: Producto[];
  onEditar: (producto: Producto) => void;
  onEliminar: (codigo: string) => void;
}

function TablaProductos({ productos, onEditar, onEliminar }: TablaProductosProps) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Categoría</th>
            <th>Producto</th>
            <th>Precio Residencial</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.codigo}>
              <td>{prod.codigo}</td>
              <td>{prod.categoria}</td>
              <td className="fw-bold">{prod.nombre}</td>
              <td>${prod.precio.toLocaleString('es-CL')}</td>
              <td className="text-center fw-bold">{prod.stock}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => onEditar(prod)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onEliminar(prod.codigo)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 2. COMPONENTE PRINCIPAL (Página)
// ==========================================
function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  
  // Estados del Modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(false);
  
  // Estados de los inputs
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number | string>("");
  const [stock, setStock] = useState<number | string>("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    setProductos(productosServicio.obtenerTodos());
  }, []);

  const abrirModalNuevo = () => {
    setEditando(false);
    setCodigo("");
    setCategoria("");
    setNombre("");
    setPrecio("");
    setStock("");
    setDescripcion("");
    setImagen("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (prod: Producto) => {
    setEditando(true);
    setCodigo(prod.codigo);
    setCategoria(prod.categoria);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setStock(prod.stock);
    setDescripcion(prod.descripcion || "");
    setImagen(prod.imagen || "");
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const guardarProducto = (e: FormEvent) => {
    e.preventDefault();


    if (!codigo.trim()) {
      alert("Debe ingresar el código del producto.");
      return;
    }
    if (!categoria.trim()) {
      alert("Debe ingresar la categoría del producto.");
      return;
    }
    if (!nombre.trim()) {
      alert("Debe ingresar el nombre del producto.");
      return;
    }
    if (precio === "" || Number(precio) <= 0) {
      alert("Debe ingresar un precio válido.");
      return;
    }
    if (stock === "" || Number(stock) < 0) {
      alert("Debe ingresar un stock válido.");
      return;
    }


    const productoData: Producto = {
      codigo: codigo.trim().toUpperCase(),
      categoria: categoria.trim(),
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: Number(stock),
      descripcion: descripcion.trim(),
      imagen: imagen.trim(),
    };

    if (editando) {
      productosServicio.actualizar(productoData);
    } else {
      if (productos.some(p => p.codigo === productoData.codigo)) {
        alert("El código de producto ya existe. Use uno diferente.");
        return;
      }
      productosServicio.agregar(productoData);
    }

    setProductos(productosServicio.obtenerTodos());
    cerrarModal();
  };

  const eliminarProducto = (codigoProd: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar el producto ${codigoProd}?`)) {
      productosServicio.eliminar(codigoProd);
      setProductos(productosServicio.obtenerTodos());
    }
  };

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

        <TablaProductos 
          productos={productos}
          onEditar={abrirModalEditar}
          onEliminar={eliminarProducto}
        />
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
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Código <span className="text-danger">*</span></label>

                        <input type="text" className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Categoría <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                      </div>
                    </div>

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
                      <textarea 
                        className="form-control" 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows={2}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Ruta de la Imagen (Opcional)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={imagen} 
                        onChange={(e) => setImagen(e.target.value)} 
                        placeholder="Ej: img/cilindro_5kg.png"
                      />
                    </div>

                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar Producto
                    </button>
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