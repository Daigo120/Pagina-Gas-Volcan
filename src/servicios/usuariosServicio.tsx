import type { Usuario } from '../tipos/Usuario';

const USUARIOS_KEY = 'usuarios_db';
const SESION_KEY = 'usuarioLogueado';

function leerUsuarios(): Usuario[] {
  try {
    return JSON.parse(localStorage.getItem(USUARIOS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function inyectarAdminDePrueba() {
  const usuariosGuardados = leerUsuarios();
  const adminExiste = usuariosGuardados.some(u => u.correo === 'admin@gmail.com');
  
  if (!adminExiste) {
    const adminPrueba: Usuario = {
      run: '11111111-1',
      nombre: 'Admin',
      apellidos: 'Principal',
      correo: 'admin@gmail.com',
      password: '1234',
      tipoUsuario: 'admin',
      direccion: 'Oficina Central'
    };
    usuariosGuardados.push(adminPrueba);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuariosGuardados));
    console.log('✅ Admin creado');
  }
}

export const usuariosServicio = {
  obtenerTodos: (): Usuario[] => leerUsuarios(),
  existeCorreo: (correo: string): boolean => {
    const correoLimpio = correo.trim().toLowerCase();
    return leerUsuarios().some(u => u.correo.trim().toLowerCase() === correoLimpio);
  },
  buscarPorCredenciales: (correo: string, password: string): Usuario | null => {
    const correoLimpio = correo.trim().toLowerCase();
    const passwordLimpia = password.trim();
    return leerUsuarios().find(u => u.correo.trim().toLowerCase() === correoLimpio && u.password === passwordLimpia) ?? null;
  },
  registrar: (usuario: Usuario): void => {
    const usuarios = leerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  },
  obtenerSesion: (): Usuario | null => {
    try {
      return JSON.parse(localStorage.getItem(SESION_KEY) || 'null');
    } catch { return null; }
  },
  guardarSesion: (usuario: Usuario): void => localStorage.setItem(SESION_KEY, JSON.stringify(usuario)),
  cerrarSesion: (): void => localStorage.removeItem(SESION_KEY),
};