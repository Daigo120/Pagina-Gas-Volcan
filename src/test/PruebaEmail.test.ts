import { describe, it, expect } from 'vitest';
import { esEmailValido } from '../validaciones/Validaciones';

describe('Prueba 1: Validación de Correo Electrónico', () => {
  it('Debe retornar true para un correo válido', () => {
    expect(esEmailValido('admin@gmail.com')).toBe(true);
    expect(esEmailValido('juan.perez@empresa.cl')).toBe(true);
  });

  it('Debe retornar false para un correo inválido', () => {
    expect(esEmailValido('correo-sin-arroba.com')).toBe(false);
    expect(esEmailValido('admin@.com')).toBe(false);
    expect(esEmailValido('@gmail.com')).toBe(false);
  });
});