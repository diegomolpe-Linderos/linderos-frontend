'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Importamos la función para obtener el cliente, no el cliente inicializado
import { getSupabaseClient } from '../../../lib/supabase'; // Asegúrate que esta ruta es correcta

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Inicializar el cliente Supabase aquí (dentro de la función)
      const supabase = getSupabaseClient();
      
      // 2. Intentar el login
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Muestra el error específico de Supabase
        setError(authError.message || "Credenciales inválidas o usuario no confirmado.");
        return;
      }
      
      if (data.session) {
        router.replace('/dashboard');
      } else {
        // En caso de que no haya error ni sesión, pero algo raro pase
        setError("Error de autenticación desconocido. Revise las credenciales.");
      }

    } catch (err: any) {
      // 3. Captura cualquier error de conexión o inicialización
      console.error("Error crítico en el login:", err.message);
      setError("Error de conexión con el servidor. Intente de nuevo.");
      
    } finally {
      // Siempre libera el botón de carga
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Iniciar Sesión</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="su-correo@ejemplo.com"
              disabled={loading}
            />
          </div>

          {/* Campo Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {/* Botón Ingresar */}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 shadow-md ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}