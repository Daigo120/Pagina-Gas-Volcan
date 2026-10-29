import { describe, it, expect } from 'vitest';
import { esTextoVacio } from '../validaciones/Validaciones';

describe('Prueba 3: Validación de Texto Vacío', () => {
  it('Debe detectar cuando un campo está vacío o solo tiene espacios', () => {
    expect(esTextoVacio('')).toBe(true);
    expect(esTextoVacio('   ')).toBe(true);
  });

  it('Debe retornar false si hay texto real', () => {
    expect(esTextoVacio('Hola')).toBe(false);
    expect(esTextoVacio('  Hola  ')).toBe(false);
  });
});
