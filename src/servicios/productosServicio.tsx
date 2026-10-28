export interface Producto {
  codigo: string;
  categoria: string;
  nombre: string;
  precio: number;
  stock: number;
  descripcion?: string; 
  imagen?: string;      
}

const PRODUCTOS_KEY = 'productos_db';


const PRODUCTOS_INICIALES: Producto[] = [
  { codigo: 'CL001', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 5 kg', precio: 6500, stock: 80 },
  { codigo: 'CL002', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 11 kg', precio: 12000, stock: 200 },
  { codigo: 'CL003', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 15 kg', precio: 16000, stock: 90 },
  { codigo: 'CL004', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 45 kg', precio: 45000, stock: 30 },
  { codigo: 'RG001', categoria: 'Reguladores', nombre: 'Regulador doméstico estándar', precio: 8990, stock: 45 },
  { codigo: 'RG002', categoria: 'Reguladores', nombre: 'Regulador de alta presión', precio: 18990, stock: 12 },
  { codigo: 'MG001', categoria: 'Mangueras y Conexiones', nombre: 'Manguera gas 1.5 m', precio: 3990, stock: 80 },
  { codigo: 'MG004', categoria: 'Mangueras y Conexiones', nombre: 'Kit conexión completo', precio: 12990, stock: 25 },
];

function leerProductos(): Producto[] {
  try {
    const guardados = localStorage.getItem(PRODUCTOS_KEY);
    if (guardados) return JSON.parse(guardados);
    
    
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(PRODUCTOS_INICIALES));
    return PRODUCTOS_INICIALES;
  } catch {
    return PRODUCTOS_INICIALES;
  }
}

export const productosServicio = {
  obtenerTodos: (): Producto[] => leerProductos(),
  
  guardarTodos: (productos: Producto[]): void => {
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(productos));
  },

  agregar: (producto: Producto): void => {
    const productos = leerProductos();
    productos.push(producto);
    productosServicio.guardarTodos(productos);
  },

  actualizar: (productoActualizado: Producto): void => {
    const productos = leerProductos();
    const index = productos.findIndex(p => p.codigo === productoActualizado.codigo);
    if (index !== -1) {
      productos[index] = productoActualizado;
      productosServicio.guardarTodos(productos);
    }
  },

  eliminar: (codigo: string): void => {
    const productos = leerProductos().filter(p => p.codigo !== codigo);
    productosServicio.guardarTodos(productos);
  }
};