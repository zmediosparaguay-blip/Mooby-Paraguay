# Arquitectura de Mooby Paraguay

## Descripción General

Mooby es una aplicación web y móvil construida con una arquitectura moderna y escalable, basada en Next.js, Firebase y Tailwind CSS.

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod

### Backend
- **Database**: Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Real-time**: Firestore listeners

### DevOps
- **Hosting**: Vercel / Firebase Hosting
- **CI/CD**: GitHub Actions

## Estructura de Carpetas

```
mooby-paraguay/
├── components/          # Componentes React reutilizables
├── pages/              # Rutas de Next.js
├── lib/                # Utilidades y funciones
├── services/           # Servicios de API y Firestore
├── types/              # Definiciones de tipos TypeScript
├── styles/             # Estilos globales
└── public/             # Archivos estáticos
```

## Flujo de Datos

1. **Autenticación**: Firebase Auth
2. **Base de Datos**: Firestore
3. **Real-time Updates**: Firestore listeners
4. **Estado Global**: Zustand stores
5. **Validación**: Zod schemas

## Seguridad

- Firebase Security Rules
- JWT tokens
- HTTPS only
- Verificación de identidad (Cédula + Selfie)
- Validación en tiempo real
