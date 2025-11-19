"use client";

import { useState } from "react";
// Importar createClient si lo tenías aquí, aunque es mejor en lib/supabase.ts
// Como lo tenías aquí, lo dejamos para que funcione:
import { createClient } from "@supabase/supabase-js"; 
import { useRouter } from "next/navigation";

// Inicialización del cliente Supabase (usa la versión que tenías)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        // Llama a la API de Supabase para iniciar sesión
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
            // Error específico de Supabase (ej: credenciales inválidas)
            setError("Credenciales inválidas o usuario no confirmado.");
            // Nota: No se llama a setLoading(false) aquí, se hace en el bloque 'finally'
            return;
        }

        // Obtener el token JWT
        const jwt = data.session?.access_token;

        if (!jwt) {
            setError("No se pudo obtener la sesión.");
            return;
        }

        // Guardar token y redirigir
        localStorage.setItem("ld_token", jwt);
        router.push("/dashboard");
        // Nota: Cuando hay push, la página se desmonta, por lo que el finally puede omitirse,
        // pero lo dejamos para capturar el error de red antes de este punto.

    } catch (e) {
        // Captura cualquier error de red o timeout
        console.error("Fallo de conexión en el login:", e);
        setError("Error de conexión con el servidor. Intente de nuevo.");
    } finally {
        // ESTO ES CLAVE: Se ejecuta siempre y libera el botón.
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
          value={email} // Agregar value para control completo
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
          value={password} // Agregar value para control completo
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" // Añadir estilo para deshabilitado
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}