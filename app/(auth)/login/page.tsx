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
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-[#2f4f1f] via-[#6e8a29] to-[#88a732]">
      <div className="flex flex-col items-center gap-8 w-full max-w-md px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">QUALITY TRAVEL</h1>
          <p className="text-blue-200 text-sm">Sistema de Reportes</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6 p-8 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Iniciar sesión</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? "Iniciando sesión..." : "Entrar"}
          </button>
        </form>

        <p className="text-blue-100 text-xs text-center">
          © 2025 Linderos Digital. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}