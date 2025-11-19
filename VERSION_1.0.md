# Linderos Digital Frontend - Versión 1.0

**Fecha de creación:** 14 de Noviembre, 2024  
**Estado:** Versión inicial completada y funcional

## 📋 Descripción del Proyecto

Aplicación frontend desarrollada con Next.js 14 que incluye un sistema de autenticación y un dashboard para visualizar reportes de Power BI.

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 14.2.5 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 3.4.1
- **Animaciones:** Framer Motion 11.11.17
- **Iconos:** Lucide React 0.460.0
- **Node:** v18+ requerido

## 📁 Estructura del Proyecto

```
linderos-frontend/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx          # Página de login con diseño oscuro
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard con reporte Power BI
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página de inicio (redirige a login)
├── lib/
│   └── auth.ts                   # Utilidades de autenticación
├── package.json                  # Dependencias del proyecto
├── tailwind.config.ts            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
└── next.config.mjs               # Configuración de Next.js
```

## ✨ Características Implementadas

### 1. Página de Login (`/login`)
- ✅ Diseño oscuro moderno con gradientes
- ✅ Validación de email en tiempo real
- ✅ Campo de contraseña con botón mostrar/ocultar
- ✅ Validación de contraseña (mínimo 6 caracteres)
- ✅ Checkbox "Recordarme" que guarda el email en localStorage
- ✅ Animaciones suaves con Framer Motion
- ✅ Credenciales por defecto para testing:
  - Email: `admin@linderosdigital.cl`
  - Password: `123456`

### 2. Dashboard (`/dashboard`)
- ✅ Sidebar con navegación
  - Reporte Contable (placeholder)
  - Reporte Ventas (activo)
- ✅ Efectos hover dinámicos en items del menú (desplazamiento suave)
- ✅ Botón de "Cerrar Sesión" funcional con ícono
- ✅ Reporte Power BI embebido en formato 16:9
- ✅ Overlay para ocultar barra inferior del iframe
- ✅ Diseño responsivo

### 3. Sistema de Autenticación
- ✅ Autenticación basada en localStorage
- ✅ Protección de rutas (redirige a login si no está autenticado)
- ✅ Función de logout que limpia la sesión

## 🎨 Paleta de Colores

### Login (Tema Oscuro)
- Fondo principal: `#1d2233`
- Cards: `#2a3048` con transparencia
- Acentos: Azul (`#2b4eff`) y Cyan (`#00adb5`)

### Dashboard (Tema Claro)
- Sidebar: `#1f2a44`
- Item activo: `#2a3b66`
- Borde activo: `#8ab4ff`
- Fondo principal: `#f3f4f6`

## 🔧 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo en puerto 3000
npm run build    # Construye la aplicación para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
```

## 📦 Dependencias Principales

```json
{
  "next": "14.2.5",
  "react": "^18",
  "react-dom": "^18",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^11.11.17",
  "lucide-react": "^0.460.0",
  "typescript": "^5"
}
```

## 🌐 URL del Reporte Power BI

El dashboard embebe el siguiente reporte de Power BI:
```
https://app.powerbi.com/view?r=eyJrIjoiYmM0N2M2ZGUtOWVkNS00NDAxLThiMTQtZjU4OTViZWRhNTA2IiwidCI6ImZlMWUzNDQwLTYzNmUtNDgxNC05OTNkLWQyOWZhOTk2ZDkwMyIsImMiOjR9
```

## 🚦 Cómo Ejecutar

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir navegador en: `http://localhost:3000`

4. Usar credenciales por defecto para login

## 📝 Notas Técnicas

- **Autenticación:** Implementación simplificada con localStorage (no usar en producción sin backend real)
- **Overlay del iframe:** Se usa un div con altura de 40px para ocultar la barra inferior del Power BI
- **Formato del reporte:** Mantiene aspect ratio 16:9 (56.25% padding-top)
- **ESLint:** Configurado con versión 8.57.1 para compatibilidad con Next.js 14.2.5

## 🐛 Issues Conocidos

- 1 vulnerabilidad crítica reportada por npm audit (revisar en futuras versiones)
- Algunas dependencias deprecadas (inflight, rimraf, glob) - no afectan funcionalidad

## 🔜 Mejoras Futuras Sugeridas

- [ ] Implementar autenticación real con backend
- [ ] Agregar más reportes al dashboard
- [ ] Implementar sistema de roles y permisos
- [ ] Agregar tests unitarios y de integración
- [ ] Mejorar manejo de errores
- [ ] Agregar página de recuperación de contraseña
- [ ] Implementar tema claro/oscuro toggle
- [ ] Optimizar para SEO

## 👥 Créditos

Desarrollado para **Linderos Digital**  
Versión: 1.0  
Año: 2024

---

**¡Primera versión completada exitosamente! 🎉**
