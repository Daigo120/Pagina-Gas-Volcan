

export type TipoUsuario = 'residencial' | 'comercial';
export type RolUsuario = 'ADMIN' | 'CLIENTE';

export interface Usuario {
  id: number; 
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password?: string; 
  tipoUsuario: TipoUsuario;
  direccion: string;
  rol: RolUsuario; 
}