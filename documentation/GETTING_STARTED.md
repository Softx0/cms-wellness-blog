## GETTING STARTED

Guía técnica para levantar y desplegar el proyecto CMS Wellness Blog.

### Requisitos
- Node.js >= 18 LTS
- PostgreSQL >= 13 (recomendado 14+)
- npm, yarn o pnpm
- macOS/Linux/Windows

### Variables de entorno
Crear un archivo `.env` en la raíz del repo con al menos:

```env
# Database
DATABASE_URL="postgres://postgres:postgres@localhost:5432/wellness-blog"
# Sombra para Prisma (recomendado al migrar en CI/CD)
SHADOW_DATABASE_URL="postgres://postgres:postgres@localhost:5432/wellness-blog-shadow"

# Auth / Cookies
SESSION_SECRET="cambia-esto-en-produccion-largo-y-seguro"
JWT_SECRET="cambia-esto-en-produccion-largo-y-seguro"

# Servidores
KEYSTONE_PORT="3001"
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001/api/graphql"

# Opcional: Email / Storage
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASSWORD=""
STORAGE_BUCKET=""
STORAGE_REGION=""
STORAGE_ACCESS_KEY=""
STORAGE_SECRET_KEY=""

NODE_ENV="development"
```

Nota: Las mismas claves aparecen ejemplificadas en `README.md`. Asegúrate de cambiarlas en producción.

### Instalación
1. Instalar dependencias:
   - npm: `npm install`
   - yarn: `yarn` 
   - pnpm: `pnpm install`

2. Generar Cliente Prisma (se ejecuta en postinstall de Keystone, pero puedes forzarlo):
   - `npx prisma generate`

### Base de datos
1. Crear BD en PostgreSQL (ejemplo):
   - `createdb wellness-blog`
   - (Opcional sombra) `createdb wellness-blog-shadow`

2. Aplicar migraciones (desarrollo):
   - `npx keystone prisma migrate dev` 
   - o `npx prisma migrate dev`

3. Aplicar migraciones (producción/CI):
   - `npx keystone prisma migrate deploy`
   - o `npx prisma migrate deploy`

### Ejecución en desarrollo
Abrir dos terminales:

- Terminal A (Keystone API/Admin):
  - `npm run keystone:dev`
  - Servirá GraphQL y UI de administración en `http://localhost:${KEYSTONE_PORT}` (por defecto `3001`).

- Terminal B (Frontend Next.js):
  - `npm run dev`
  - Frontend en `http://localhost:3000`.

Primer arranque: Keystone creará el usuario inicial (admin) mediante `initFirstItem`. Accede a `http://localhost:3001/` para crear el primer usuario.

### Autenticación y sesiones
- Login del Backoffice: POST a `app/api/auth/login` (Next API Route) que autentica contra Keystone (`authenticateUserWithPassword`) y emite un JWT propio guardado en cookie `auth-token` (httpOnly, SameSite=Lax).
- Middleware (`middleware.ts`) protege rutas `/api/*`, `/dashboard/*`, `/profile/*`, `/admin/*`. Si no hay cookie válida, redirige a `/login`.
- CORS de Keystone se controla con `FRONTEND_URL` en `keystone.ts`.

### Estructura relevante
- Frontend (Next.js App Router): `app/*`
- Keystone config: `keystone.ts`
- Esquemas Keystone/Prisma: `schema/*.ts`, `schema.prisma`, `schema.graphql`
- API Client GraphQL: `lib/api.ts`
- Auth utilidades: `lib/auth.ts`, `lib/auth-client.ts`
- Protección de rutas: `middleware.ts`

### Scripts útiles
```bash
npm run dev                # Next.js dev (3000)
npm run build              # Next.js build
npm run start              # Next.js start (producción)

npm run keystone:dev       # Keystone dev (3001)
npm run keystone:build     # Keystone build
npm run keystone:start     # Keystone start (producción)
```

### Despliegue en producción (resumen)
1. Configurar variables de entorno seguras (rotar `SESSION_SECRET` y `JWT_SECRET`).
2. Desplegar PostgreSQL gestionado o contenedor con volumen persistente.
3. Ejecutar migraciones: `npx keystone prisma migrate deploy`.
4. Construir y arrancar:
   - Keystone: `npm run keystone:build` y `npm run keystone:start` (puerto `KEYSTONE_PORT`).
   - Next: `npm run build` y `npm run start` (puerto 3000 por defecto) o adaptar a la plataforma (Vercel/Bun/PM2).
5. Reverse proxy (Nginx/Caddy) con TLS:
   - Front: `https://tu-dominio` → Next (3000)
   - API/Admin: `https://api.tu-dominio` → Keystone (3001)
   - Ajustar `FRONTEND_URL` y `NEXT_PUBLIC_API_URL`.
6. Cookies seguras en prod: `NODE_ENV=production` para `secure: true`.

### Almacenamiento de archivos
Por defecto local: `public/images` y `public/files`. Para producción, monta volumen persistente o integra un bucket (S3/GCS) cambiando `storage` en `keystone.ts`.

### Solución de problemas
- 401 en `/api/*`: revisa cookie `auth-token`, `JWT_SECRET` y `middleware.ts`.
- CORS entre frontend y Keystone: confirma `FRONTEND_URL` en `keystone.ts`.
- Migraciones fallan: valida `DATABASE_URL`/`SHADOW_DATABASE_URL` y permisos.
- GraphQL caído: verifica Keystone en `http://localhost:3001/api/graphql`.


