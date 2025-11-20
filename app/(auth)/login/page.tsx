"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  console.log("ENV CHECK FROM LOGIN PAGE:");
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const router = useRouter();
  const supabase = getSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", data, error);

    if (error) {
      setError(error.message);
      return;
    }

    // Si todo salió bien -> redirigimos
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 rounded-lg border w-80"
      >
        <h1 className="text-xl font-semibold">Iniciar sesión</h1>

        <input
          type="email"
          className="border p-2 rounded"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 rounded"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 text-white rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
