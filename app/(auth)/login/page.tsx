"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { setLoggedIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🔵 handleLogin ejecutado");
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      console.log("🔵 Cliente Supabase creado:", supabase);
      
      console.log("🔵 Intentando login con:", email);

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      console.log("🔵 Respuesta de Supabase:", { data, authError });

      if (authError) {
        console.error("❌ Error de autenticación:", authError);
        setError(authError.message);
        return;
      }

      if (data?.session) {
        console.log("✅ Login exitoso:", data.user?.email);
        console.log("✅ Sesión:", data.session);
        setLoggedIn(true, data.user?.email);
        console.log("✅ localStorage actualizado");
        console.log("✅ Redirigiendo a dashboard...");
        window.location.href = "/dashboard";
      } else {
        console.error("❌ No hay sesión en la respuesta");
        setError("No se pudo establecer la sesión");
      }
    } catch (err) {
      console.error("❌ Error inesperado:", err);
      setError("Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
      console.log("🔵 Loading finalizado");
    }
  };

  console.log("🔵 Componente LoginPage renderizado");

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-8 rounded-lg border bg-white shadow-lg w-96"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">Iniciar sesión</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Iniciando sesión..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}