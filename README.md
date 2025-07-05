cms-wellness-blog

EJemplo del README.md

# Database

DATABASE_URL="postgres://localhost:5432/wellness-blog"
#"postgres://postgres:postgres@localhost:5432/wellness-blog"

# Authentication

SESSION_SECRET="development-secret-key-change-in-production"
JWT_SECRET="development-jwt-secret-key-change-in-production"

# Server Configuration

KEYSTONE_PORT="3001"
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001/api/graphql"

# Email (si se implementa el sistema de emails)

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-specific-password"

# Storage (opcional, para producción)

STORAGE_BUCKET=""
STORAGE_REGION=""
STORAGE_ACCESS_KEY=""
STORAGE_SECRET_KEY=""

# Environment

NODE_ENV="development"
