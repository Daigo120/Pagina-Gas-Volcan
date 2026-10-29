import { describe, it, expect } from 'vitest';

describe('Prueba 5: Cálculo del IVA (19%)', () => {
  const calcularNetoEIVA = (total: number) => {
    const neto = Math.round(total / 1.19);
    const iva = total - neto;
    return { neto, iva };
  };

  it('Debe calcular correctamente el Neto y el IVA para un total dado', () => {
    const totalPagar = 11900; 
    const resultado = calcularNetoEIVA(totalPagar);

    expect(resultado.neto).toBe(10000);
    expect(resultado.iva).toBe(1900);
  });

  it('La suma del Neto y el IVA debe ser siempre igual al Total', () => {
    const totalPagar = 24990;
    const { neto, iva } = calcularNetoEIVA(totalPagar);

   
    expect(neto + iva).toBe(totalPagar);
  });
});