'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn, setLoggedIn } from '@/lib/auth';
import { createClient } from '@/lib/supabase';
import { X } from 'lucide-react';
import { APP_NAME, COLORS, POWER_BI_URL } from '@/lib/config';

const OVERLAY_HEIGHT = 40;

export default function DashboardVentas() {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = React.useState(false);

  React.useEffect(() => {
    if (!isLoggedIn()) router.replace('/login');
  }, [router]);

  React.useEffect(() => {
    document.body.style.overflow = openSidebar ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openSidebar]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex">
      <aside
        className="hidden lg:block w-64 text-white relative"
        style={{
          background: `linear-gradient(135deg, ${COLORS.bgStart} 0%, ${COLORS.bgMid} 50%, ${COLORS.bgEnd} 100%)`,
        }}
      >
        <div className="px-5 py-5 font-semibold tracking-wide">{APP_NAME}</div>
        <nav className="mt-1 text-sm">
          <div className="px-5 py-2.5 text-white/90 select-none">Reportes</div>
          <div
            className="px-5 py-2.5 font-semibold transform transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
            style={{ background: '#2a3b66', borderRight: `3px solid ${COLORS.bgEnd}` }}
          >
            Reporte Ventas
          </div>
        </nav>

        <button
          type="button"
          onClick={async () => {
            try { await createClient().auth.signOut(); } catch {}
            try {
              setLoggedIn(false);
              localStorage.removeItem('loggedIn');
              localStorage.removeItem('loggedEmail');
            } catch {}
            window.location.href = '/login';
          }}
          className="absolute bottom-0 w-64 px-5 py-3 text-left text-sm text-white/90 hover:bg-white/10 transition-colors"
          style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}
        >
          Logout
        </button>
      </aside>

      {openSidebar && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenSidebar(false)} />
          <div
            className="absolute left-0 top-0 bottom-0 w-64 text-white flex flex-col"
            style={{
              background: `linear-gradient(135deg, ${COLORS.bgStart} 0%, ${COLORS.bgMid} 50%, ${COLORS.bgEnd} 100%)`,
            }}
          >
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="font-semibold">{APP_NAME}</span>
              <button className="inline-flex p-2 rounded-md hover:bg-white/10" onClick={() => setOpenSidebar(false)}>
                <X size={18} />
              </button>
            </div>
            <nav className="mt-1 text-sm flex-1 overflow-auto">
              <div className="px-5 py-2.5 text-white/90 select-none">Reportes</div>
              <div
                className="px-5 py-2.5 font-semibold transform transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                style={{ background: '#2a3b66', borderRight: `3px solid ${COLORS.bgEnd}` }}
              >
                Reporte Ventas
              </div>
            </nav>

            <button
              type="button"
              onClick={async () => {
                try { await createClient().auth.signOut(); } catch {}
                try {
                  setLoggedIn(false);
                  localStorage.removeItem('loggedIn');
                  localStorage.removeItem('loggedEmail');
                } catch {}
                window.location.href = '/login';
              }}
              className="px-5 py-3 text-left text-sm text-white/90 hover:bg-white/10 transition-colors"
              style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 bg-white border-b flex items-center px-4 lg:px-6 justify-between">
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpenSidebar(true)}
            aria-label="Abrir menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <h1 className="text-base lg:text-lg font-semibold">Reporte Ventas</h1>
          <span className="w-6" />
        </header>

        <main className="p-4 lg:p-6">
          <section className="mx-auto max-w-6xl">
            <div className="bg-white rounded-lg border p-3 lg:p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm lg:text-base font-semibold">Dashboard de Ventas</h2>
                <span className="text-xs text-gray-500 hidden sm:inline">Formato 16:9</span>
              </div>

              <div className="rounded-md p-1 lg:p-2" style={{ background: '#F6F7FB', border: '1px solid #e5e7eb' }}>
                <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    title="Power BI Report"
                    src={POWER_BI_URL}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded border-0"
                  />
                  <div className="absolute left-0 right-0 bottom-0" style={{ height: 40, background: '#F6F7FB' }} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}