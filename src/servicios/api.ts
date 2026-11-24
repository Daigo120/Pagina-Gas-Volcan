const API_BASE_URL = 'http://localhost:8088/api';

export const fetchApi = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
 
  const token = localStorage.getItem('token');

  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  
  if (response.status === 401) {
    console.warn("Token expirado o inválido. Cerrando sesión...");
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogueado');
    window.location.href = '/login'; 
    throw new Error("No autorizado");
  }

  return response;
};