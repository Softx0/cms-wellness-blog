## Diagrama de Arquitectura (alto nivel)

Componentes: Next.js (App Router), Keystone 6 (GraphQL + Admin UI), Prisma, PostgreSQL, JWT, Middleware, Almacenamiento local.

```mermaid
flowchart LR
  subgraph Client[Cliente/Browser]
    UI[Next.js App Router<br/>Páginas: /, /blog, /category, /login, /admin/*]
  end

  subgraph Frontend[Frontend]
    LIBAPI[lib/api.ts<br/>GraphQLClient]
    MIDL[middleware.ts]
    AUTH[lib/auth.ts<br/>JWT sign/verify]
  end

  subgraph Keystone[Keystone 6]
    GQL[GraphQL API /api/graphql]
    ADMIN[Admin UI]
    STORAGE[storage local: public/images, public/files]
  end

  subgraph Data[Datos]
    PRISMA[Prisma Client]
    DB[(PostgreSQL)]
  end

  UI -- fetch queries/mutations --> LIBAPI
  LIBAPI -- HTTP CORS --> GQL
  MIDL -- protege rutas /api y /admin --> UI
  AUTH -- cookies httpOnly auth-token --> UI

  GQL -- ORM --> PRISMA
  PRISMA -- SQL --> DB

  ADMIN --- GQL
  ADMIN --- STORAGE
```

### Notas técnicas
- Keystone expone GraphQL y Admin UI en `KEYSTONE_PORT` con CORS a `FRONTEND_URL`.
- Next.js consume GraphQL vía `graphql-request` con `NEXT_PUBLIC_API_URL`.
- Middleware valida cookie `auth-token` (JWT) para `/api/*` y rutas protegidas.
- Esquema de datos en `schema.prisma` y listas en `schema/*.ts`.
- Almacenamiento local puede migrarse a S3/GCS modificando `storage` en `keystone.ts`.


