import { config } from "@keystone-6/core";
import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";
import { lists } from "./schema";

const sessionSecret =
  process.env.SESSION_SECRET || "this-should-be-a-long-secure-secret";
const databaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/wellness-blog";

// Authentication configuration
const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "id name role",
  initFirstItem: {
    fields: ["name", "email", "password", "role"],
    itemData: { role: "admin" },
    skipKeystoneWelcome: true,
  },
});

// Define session configuration
const session = statelessSessions({
  secret: sessionSecret,
  maxAge: 60 * 60 * 24 * 30, // 30 days
});

// Keystone configuration
export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: databaseURL,
      enableLogging: process.env.NODE_ENV !== "production",
      useMigrations: true,
      idField: { kind: "autoincrement" },
    },
    lists,
    session,
    server: {
      port: parseInt(process.env.KEYSTONE_PORT || "3001"),
      cors: {
        origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
        credentials: true,
      },
    },
    graphql: {
      path: "/api/graphql",
      playground: process.env.NODE_ENV !== "production",
    },
    storage: {
      // Configure your file storage here
      images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
      files: {
        kind: "local",
        type: "file",
        generateUrl: (path) => `/files${path}`,
        serverRoute: {
          path: "/files",
        },
        storagePath: "public/files",
      },
    },
    ui: {
      isAccessAllowed: (context) => {
        return !!context.session?.data;
      },
    },
  })
);
