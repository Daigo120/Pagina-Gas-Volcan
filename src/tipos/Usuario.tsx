export type TipoUsuario = 'residencial' | 'comercial' | 'admin';

export interface Usuario {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
  tipoUsuario: TipoUsuario;
  direccion: string;
}