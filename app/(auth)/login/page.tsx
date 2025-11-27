"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { setLoggedIn } from "@/lib/auth";
import { APP_NAME, IS_DEMO, COLORS } from "@/lib/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      if (data?.session) {
        setLoggedIn(true, data.user?.email);
        window.location.href = "/dashboard";
      } else {
        setError("No se pudo establecer la sesión");
      }
    } catch {
      setError("Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen text-white"
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgStart} 0%, ${COLORS.bgMid} 50%, ${COLORS.bgEnd} 100%)`,
      }}
    >
      {IS_DEMO && (
        <div className="fixed top-2 right-2 z-50 rounded bg-yellow-400 text-black text-xs font-semibold px-2 py-1 shadow">
          Demo
        </div>
      )}

      <div className="flex flex-col items-center gap-8 w-full max-w-md px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{APP_NAME}</h1>
          <p className="text-blue-200 text-sm">Sistema de Reportes</p>
        </div>

        {/* Banner de credenciales para modo demo */}
        {IS_DEMO && (
          <div className="w-full mb-1 rounded-lg border border-yellow-400/30 bg-yellow-50/5 px-4 py-3 text-[13px] text-yellow-200">
            Modo Demo — Acceso:{" "}
            <span className="font-semibold">demo@linderosdigital.cl</span> /{" "}
            <span className="font-semibold">demo1234</span>
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6 p-8 rounded-2xl backdrop-blur-sm shadow-2xl w-full"
          style={{ background: `${COLORS.card}F2` }}
        >
          <h2 className="text-2xl font-semibold text-center">Iniciar sesión</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              className="border border-gray-500/40 bg-transparent text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              className="border border-gray-500/40 bg-transparent text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="bg-red-50/10 border border-red-400/40 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            style={{ backgroundColor: COLORS.accent }}
          >
            {loading ? "Iniciando sesión..." : "Entrar"}
          </button>
        </form>

        <p className="text-blue-100 text-xs text-center">
          © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}