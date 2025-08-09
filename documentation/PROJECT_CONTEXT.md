## Contexto del Proyecto

### Descripción
CMS Wellness Blog es un sistema de blog orientado a contenido de bienestar. Incluye:
- Frontend en Next.js (App Router) para listar, leer y navegar posts.
- Backoffice con Keystone 6 (Admin UI) para gestionar usuarios, posts, categorías, etiquetas, comentarios y metadatos SEO.
- API GraphQL centralizada (Keystone) consumida desde el frontend mediante `graphql-request`.

### Arquitectura y componentes
- Frontend: Next.js 14 (React 18), TailwindCSS, Radix UI, shadcn/ui.
- Backend: Keystone 6 (GraphQL + Admin UI) sobre Node.js.
- ORM: Prisma.
- Base de datos: PostgreSQL.
- Autenticación: Keystone `authenticateUserWithPassword` + JWT propio inyectado en cookie `auth-token` y verificado en `middleware.ts`.
- Almacenamiento: Local por defecto (`public/images`, `public/files`), extensible a S3/GCS.

### Modelado de dominio (resumen)
- `User`: roles `admin|editor|author`, estados, bio.
- `Post`: título, slug único, estado `draft|published|archived`, contenido rich (Keystone Document), autor, categorías, etiquetas, comentarios, SEO.
- `Category` / `Tag`: taxonomías con `slug` único.
- `Comment`: contenido, estado `pending|approved|rejected`, flags spam.
- `ApiKey`: claves para integraciones.
- `SeoMetadata`: metadatos por post.

### Flujo principal
1. Cliente solicita `posts`/`post` a Keystone vía GraphQL.
2. Admin se autentica desde Next API `/api/auth/login`, se fija cookie `auth-token`.
3. Middleware protege `/api/*` y `/admin/*`. El Front usa `lib/api.ts` para operaciones de comentarios y lectura de datos.

### Estándares de desarrollo
- TypeScript estricto (`tsconfig.json` con `strict: true`).
- ESLint `next/core-web-vitals` y build ignorando errores de lint en producción (`next.config.js`).
- Estructura clara por áreas: `app`, `components`, `lib`, `schema`, `types`.
- Nombres descriptivos y funciones puras para utilidades (`lib/*`).
- Control de acceso en middleware y Keystone UI (`ui.isAccessAllowed`).

### Patrones y decisiones
- App Router de Next para composición de páginas y segmentación por ruta.
- `graphql-request` como cliente minimalista para GQL.
- Cookie httpOnly para JWT y `SameSite=Lax`; `secure` en producción.
- Keystone como BFF/Headless CMS: reduce complejidad de CRUD y Admin UI.

### Stack y dependencias clave
- Next.js, React 18, TailwindCSS, Radix UI, shadcn/ui.
- Keystone 6 (`@keystone-6/core`, `@keystone-6/auth`, `@keystone-6/fields-document`).
- Prisma y `@prisma/client`.
- `graphql`, `graphql-request`.
- `jose` para JWT.

### Seguridad y configuración
- Rotar `SESSION_SECRET` y `JWT_SECRET` en producción; no usar defaults.
- Restringir `images.domains` en Next a orígenes confiables.
- CORS de Keystone limitado a `FRONTEND_URL`.
- Revisar `validateApiKey` si se habilitan API Keys verdaderas.

### Extensiones futuras
- Sistema de roles granular (políticas por lista/campo en Keystone).
- Comentarios con autenticación de usuario final y notificaciones por email.
- Almacenamiento en nube (S3/GCS) y CDN de imágenes.
- Búsqueda y paginación avanzadas.

### Referencias del código
- Config Keystone: `keystone.ts` (DB, CORS, storage, UI access).
- Esquemas Keystone: `schema/*.ts`; Prisma: `schema.prisma`.
- GraphQL Client y queries: `lib/api.ts`.
- Autenticación y middleware: `lib/auth.ts`, `lib/auth-client.ts`, `middleware.ts`.


