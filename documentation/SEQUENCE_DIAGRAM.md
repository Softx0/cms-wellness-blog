## Diagrama de Secuencia

Secuencias principales de la aplicación vistas desde cliente y backoffice admin.

### 1) Cliente: Ver listado y detalle de posts

```mermaid
sequenceDiagram
  autonumber
  actor U as Usuario (Cliente)
  participant FE as Next.js (Frontend)
  participant API as Keystone GraphQL
  participant DB as PostgreSQL

  U->>FE: Abre /blog
  FE->>API: query posts(limit, skip, where)
  API->>DB: SELECT posts + relaciones
  DB-->>API: Rows
  API-->>FE: Lista de posts
  FE-->>U: Render con cards

  U->>FE: Abre /blog/[slug]
  FE->>API: query post(slug)
  API->>DB: SELECT post by slug + relaciones
  DB-->>API: Row
  API-->>FE: Post + comments + meta
  FE-->>U: Render contenido y comentarios
```

### 2) Admin: Login y moderación de comentarios

```mermaid
sequenceDiagram
  autonumber
  actor A as Admin
  participant FE as Next.js (Frontend)
  participant NR as Next API (/api/auth/login)
  participant API as Keystone GraphQL
  participant JWT as JWT/Cookies

  A->>FE: Abre /login y envía credenciales
  FE->>NR: POST email/password
  NR->>API: mutation authenticateUserWithPassword
  API-->>NR: sessionToken + item(User) o error
  alt éxito
    NR->>JWT: Firmar token (SignJWT)
    JWT-->>NR: token
    NR-->>FE: JSON { user, token } + Set-Cookie auth-token
    FE-->>A: Redirigir a /admin
  else error
    NR-->>FE: 401
    FE-->>A: Mostrar mensaje de error
  end

  A->>FE: Abre /admin/comments
  FE->>API: query comments(status = pending)
  API-->>FE: Lista de comentarios pendientes
  A->>FE: Aprobar/Rechazar/Eliminar
  FE->>API: mutation updateComment/deleteComment
  API-->>FE: OK
  FE-->>A: Actualiza UI
```

### 3) Middleware protección

```mermaid
sequenceDiagram
  participant U as Usuario/Admin
  participant FE as Next.js (Middleware)
  participant JWT as Verificación JWT

  U->>FE: Request a /api/* o /admin/*
  FE->>JWT: ¿Cookie auth-token válida?
  alt válida
    JWT-->>FE: payload
    FE-->>U: Continúa
  else inválida
    FE-->>U: 401 o Redirect /login
  end
```


