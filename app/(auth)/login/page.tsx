"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciales inválidas");
      setLoading(false);
      return;
    }

    // Obtener el token JWT del usuario autenticado
    const jwt = data.session?.access_token;

    if (!jwt) {
      setError("No se pudo obtener la sesión");
      setLoading(false);
      return;
    }

    // Guardar token en localStorage
    localStorage.setItem("ld_token", jwt);

    // Redirigir al dashboard
    router.push("/dashboard");
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
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

