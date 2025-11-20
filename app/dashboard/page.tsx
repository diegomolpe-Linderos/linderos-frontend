'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, FileText, TrendingUp } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function Dashboard() {
  const router = useRouter();
  const [activeReport, setActiveReport] = useState('ventas');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace('/login');
      } else {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    
    localStorage.clear();
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  const reports = [
    {
      id: 'contable',
      name: 'Reporte Contable',
      icon: FileText,
      url: '#'
    },
    {
      id: 'ventas',
      name: 'Reporte Ventas',
      icon: TrendingUp,
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYmM0N2M2ZGUtOWVkNS00NDAxLThiMTQtZjU4OTViZWRhNTA2IiwidCI6ImZlMWUzNDQwLTYzNmUtNDgxNC05OTNkLWQyOWZhOTk2ZDkwMyIsImMiOjR9'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 flex flex-col" style={{ backgroundColor: '#1f2a44' }}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">Linderos Digital</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {reports.map((report) => {
              const Icon = report.icon;
              const isActive = activeReport === report.id;
              
              return (
                <li key={report.id}>
                  <button
                    onClick={() => setActiveReport(report.id)}
                    disabled={report.id === 'contable'}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-white translate-x-2'
                        : report.id === 'contable'
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-gray-300 hover:text-white hover:translate-x-1'
                    }`}
                    style={{
                      backgroundColor: isActive ? '#2a3b66' : 'transparent',
                      borderLeft: isActive ? '3px solid #8ab4ff' : '3px solid transparent'
                    }}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{report.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <LogOut size={20} />
            <span>{isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <iframe
            src={reports.find(r => r.id === activeReport)?.url}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-12 bg-white pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </main>
    </div>
  );
}