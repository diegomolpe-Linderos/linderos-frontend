import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Linderos Digital";
  return (
    <html lang="es">
      <head>
        <title>{appName}</title>
        <meta name="description" content="Dashboard Power BI" />
      </head>
      <body>{children}</body>
    </html>
  );
}
