'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn, setLoggedIn } from '@/lib/auth';
import { LogOut } from 'lucide-react';

const POWER_BI_URL =
  'https://app.powerbi.com/view?r=eyJrIjoiYmM0N2M2ZGUtOWVkNS00NDAxLThiMTQtZjU4OTViZWRhNTA2IiwidCI6ImZlMWUzNDQwLTYzNmUtNDgxNC05OTNkLWQyOWZhOTk2ZDkwMyIsImMiOjR9';

const OVERLAY_HEIGHT = 40;

export default function DashboardVentas() {
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn()) router.replace('/login');
  }, [router]);

  const handleLogout = () => {
    setLoggedIn(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex">
      <aside className="w-64 text-white relative" style={{ background: '#1f2a44' }}>
        <div className="px-5 py-5 font-semibold tracking-wide">Linderos Digital Dashboard</div>
        <nav className="mt-1 text-sm">
          <div className="px-5 py-2.5 text-white/90 select-none cursor-pointer transition-all duration-300 hover:bg-white/5 hover:translate-x-1">
            Reporte Contable
          </div>
          <div className="px-5 py-2.5 font-semibold transition-all duration-300 hover:translate-x-1" style={{ background: '#2a3b66', borderRight: '3px solid #8ab4ff' }}>
            Reporte Ventas
          </div>
        </nav>
        <button
          onClick={handleLogout}
          className="absolute bottom-0 w-64 px-5 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 bg-white border-b flex items-center px-4 lg:px-6">
          <h1 className="text-lg font-semibold">Reporte Ventas</h1>
        </header>

        <main className="p-4 lg:p-6">
          <section className="mx-auto max-w-6xl">
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">Dashboard de Ventas</h2>
              </div>

              <div className="rounded-md p-2" style={{ background: '#F6F7FB', border: '1px solid #e5e7eb' }}>
                <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                  <iframe title="Power BI Report" src={POWER_BI_URL} allowFullScreen className="absolute inset-0 w-full h-full rounded border-0" />
                  <div className="absolute left-0 right-0 bottom-0" style={{ height: OVERLAY_HEIGHT, background: '#F6F7FB' }} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
