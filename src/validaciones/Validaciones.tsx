export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export function esEmailValido(correo: string): boolean {
  return REGEX_EMAIL.test(correo.trim().toLowerCase());
}

export function esPasswordValida(password: string): boolean {
  const p = password.trim();
  return p.length >= 4 && p.length <= 10;
}

export function esTextoVacio(valor: string): boolean {
  return !valor.trim();
}