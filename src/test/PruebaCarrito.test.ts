import { describe, it, expect } from 'vitest';

describe('Prueba 6: Cálculo Total del Carrito de Compras', () => {
  
  const calcularTotalCarrito = (items: { precio: number; cantidad: number }[]) => {
    return items.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
  };

  it('Debe retornar 0 si el carrito está vacío', () => {
    const carritoVacio: any[] = [];
    expect(calcularTotalCarrito(carritoVacio)).toBe(0);
  });

  it('Debe calcular el total correctamente con un solo producto', () => {
    const carrito = [
      { nombre: 'Cilindro GLP 5 kg', precio: 6500, cantidad: 2 }
    ];
   
    expect(calcularTotalCarrito(carrito)).toBe(13000);
  });

  it('Debe sumar correctamente múltiples productos con diferentes cantidades', () => {
    const carrito = [
      { nombre: 'Cilindro GLP 11 kg', precio: 12000, cantidad: 1 }, 
      { nombre: 'Regulador', precio: 8990, cantidad: 2 },           
      { nombre: 'Manguera', precio: 3990, cantidad: 3 }             
    ];

    expect(calcularTotalCarrito(carrito)).toBe(41950);
  });

});