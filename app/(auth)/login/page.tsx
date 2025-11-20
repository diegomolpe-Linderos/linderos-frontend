"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Aquí va la función completa de login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar recarga de la página

    setError(""); // Limpiar cualquier error previo
    console.log("Intentando login con:", email, password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("SUPABASE RESPONSE:", { data, error });

    if (error) {
      setError(error.message); // Si hay un error, mostrar mensaje
      return;
    }

    router.push("/dashboard"); // Redirigir al dashboard si login exitoso
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


