import { describe, it, expect } from 'vitest';

describe('Prueba 3: Longitud Básica del RUN', () => {
  
  function tieneLongitudValida(run: string): boolean {
    const runLimpio = run.replace(/[.-]/g, '');
    return runLimpio.length >= 8 && runLimpio.length <= 9;
  }

  it('Debe aceptar RUNs con 8 o 9 caracteres (sin contar puntos ni guion)', () => {
    const test1 = tieneLongitudValida('12345678-9');
    expect(test1).toBe(true);
    
    const test2 = tieneLongitudValida('1234567K');
    expect(test2).toBe(true);
  });

  it('Debe rechazar RUNs demasiado cortos o largos', () => {
    const test3 = tieneLongitudValida('12345-6');
    expect(test3).toBe(false);
    
    const test4 = tieneLongitudValida('1234567890-1');
    expect(test4).toBe(false);
  });
  
});