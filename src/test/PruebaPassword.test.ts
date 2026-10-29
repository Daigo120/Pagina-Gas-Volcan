

import { describe, it, expect } from 'vitest';
import { esPasswordValida } from '../validaciones/Validaciones';

describe('Prueba 2: Validación de Contraseña', () => {
  it('Debe aceptar contraseñas entre 4 y 10 caracteres', () => {
    expect(esPasswordValida('1234')).toBe(true);
    expect(esPasswordValida('password10')).toBe(true);
  });

  it('Debe rechazar contraseñas muy cortas o muy largas', () => {
    expect(esPasswordValida('123')).toBe(false);
    expect(esPasswordValida('12345678901')).toBe(false);
  });
});