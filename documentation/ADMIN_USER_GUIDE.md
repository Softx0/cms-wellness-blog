## Guía de Usuario (Admin Backoffice)

Manual breve para gestionar el blog (posts, categorías, etiquetas y comentarios) desde el backoffice.

### Acceso
1. Ir a `http://localhost:3001/` (Keystone Admin) para crear el primer usuario si no existe.
2. Acceder al login de la app: `/login`.
3. Iniciar sesión con email y contraseña. Tras éxito, se guarda una cookie segura y se redirige.

### Panel de comentarios (UI interna)
- Ruta: `/admin/comments`.
- Funciones:
  - Ver comentarios pendientes de moderación.
  - Aprobar o rechazar comentarios.
  - Eliminar comentarios.
- Estados: `pending`, `approved`, `rejected`.

### Administración completa (Keystone Admin UI)
Disponible en `http://localhost:3001/`.

- Entradas principales:
  - `User`: Gestionar usuarios, roles (`admin`, `editor`, `author`) y estado.
  - `Post`: Crear/editar posts (título, slug, contenido, excerpt, imagen destacada, SEO, categorías y etiquetas). Estado de publicación: `draft`, `published`, `archived`.
  - `Category`/`Tag`: Gestionar taxonomías.
  - `Comment`: Revisar/editar/eliminar comentarios.
  - `ApiKey`: Claves para integraciones.
  - `SeoMetadata`: Metadatos SEO por post.

### Crear un post
1. Ir a `Post > Create`.
2. Completar `title`, `slug` único, `excerpt` y `content`.
3. Asociar `author` y taxonomías (`categories`, `tags`).
4. Opcional: `featuredImage`, `seoMetadata`.
5. Cambiar `status` a `published` y definir `publishedAt` si aplica.
6. Guardar.

### Mantención de contenido
- Editar posts para actualizar contenido o SEO.
- Archivar (`archived`) para retirar de listado sin borrar.
- Eliminar comentarios ofensivos; marcar spam si se implementa lógica adicional.

### Buenas prácticas
- Mantener slugs legibles y únicos.
- Completar SEO (title/description/keywords) para cada post.
- Revisar comentarios pendientes con regularidad.
- Usar roles: autores crean borradores, editores revisan, admin publica.

### Resolución de problemas
- No puedo entrar a `/admin`: asegúrate de estar logueado y tener rol `admin`.
- No cargan comentarios: verifica conexión a Keystone (`NEXT_PUBLIC_API_URL`).
- Error 401 en acciones: la sesión pudo expirar. Vuelve a iniciar sesión.


