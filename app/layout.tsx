import './globals.css';

export const metadata = {
  title: "Linderos Digital",
  description: "Dashboard con Power BI embebido"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
import { redirect } from "next/navigation";
import { getUser } from "@/lib/getUser";

export default async function DashboardLayout({ children }) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
