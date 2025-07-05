"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core8 = require("@keystone-6/core");
var import_session = require("@keystone-6/core/session");
var import_auth = require("@keystone-6/auth");

// schema/user.ts
var import_core = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");

// schema/fields.ts
var import_fields = require("@keystone-6/core/fields");
var trackingFields = {
  createdAt: (0, import_fields.timestamp)({
    defaultValue: { kind: "now" },
    validation: { isRequired: true },
    ui: { createView: { fieldMode: "hidden" } }
  }),
  updatedAt: (0, import_fields.timestamp)({
    defaultValue: { kind: "now" },
    db: { updatedAt: true },
    ui: { createView: { fieldMode: "hidden" } }
  })
};
var richTextConfig = {
  formatting: {
    inlineMarks: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      code: true
    },
    listTypes: {
      ordered: true,
      unordered: true
    },
    alignment: {
      center: true,
      end: true
    },
    headingLevels: [1, 2, 3, 4, 5, 6],
    blockTypes: {
      blockquote: true,
      code: true
    },
    softBreaks: true
  },
  links: true,
  dividers: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
    [2, 1],
    [1, 2]
  ]
};
var isAdmin = ({ session: session2 }) => {
  return session2?.data?.role === "admin";
};
var isAdminOrEditor = ({ session: session2 }) => {
  return ["admin", "editor"].includes(session2?.data?.role);
};
var isAdminEditorOrAuthor = ({ session: session2 }) => {
  return ["admin", "editor", "author"].includes(session2?.data?.role);
};
var isAdminOrOwner = ({ session: session2, item }) => {
  if (!session2)
    return false;
  if (session2.data.role === "admin")
    return true;
  return session2.data.id === item.authorId;
};

// schema/user.ts
var User = (0, import_core.list)({
  access: {
    operation: {
      query: () => true,
      create: isAdmin,
      update: isAdminOrOwner,
      delete: isAdmin
    },
    filter: {
      query: ({ session: session2 }) => {
        if (!session2)
          return { status: { equals: "active" } };
        if (session2.data.role === "admin")
          return true;
        return { OR: [{ id: { equals: session2.data.id } }, { status: { equals: "active" } }] };
      }
    }
  },
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    email: (0, import_fields2.text)({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true
    }),
    password: (0, import_fields2.password)({ validation: { isRequired: true } }),
    role: (0, import_fields2.select)({
      type: "enum",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" }
      ],
      defaultValue: "author",
      validation: { isRequired: true },
      ui: {
        displayMode: "segmented-control"
      }
    }),
    status: (0, import_fields2.select)({
      type: "enum",
      options: [
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
        { label: "Deleted", value: "deleted" }
      ],
      defaultValue: "active",
      validation: { isRequired: true },
      ui: {
        displayMode: "segmented-control"
      }
    }),
    bio: (0, import_fields2.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    posts: (0, import_fields2.relationship)({
      ref: "Post.author",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "status", "publishedAt"],
        linkToItem: true,
        inlineCreate: { fields: ["title", "status"] },
        inlineEdit: { fields: ["title", "status"] },
        inlineConnect: true
      }
    }),
    comments: (0, import_fields2.relationship)({
      ref: "Comment.author",
      many: true
    }),
    apiKeys: (0, import_fields2.relationship)({
      ref: "ApiKey.user",
      many: true
    }),
    ...trackingFields
  },
  ui: {
    listView: {
      initialColumns: ["name", "email", "role", "status"],
      initialSort: { field: "name", direction: "ASC" }
    },
    labelField: "name"
  }
});

// schema/post.ts
var import_core2 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var Post = (0, import_core2.list)({
  access: {
    operation: {
      query: () => true,
      create: isAdminEditorOrAuthor,
      update: isAdminOrOwner,
      delete: isAdminOrOwner
    },
    filter: {
      query: ({ session: session2 }) => {
        if (!session2)
          return { status: { equals: "published" } };
        if (session2.data.role === "admin")
          return true;
        if (session2.data.role === "editor")
          return true;
        if (session2.data.role === "author") {
          return {
            OR: [
              { author: { id: { equals: session2.data.id } } },
              { status: { equals: "published" } }
            ]
          };
        }
        return { status: { equals: "published" } };
      }
    }
  },
  fields: {
    title: (0, import_fields4.text)({ validation: { isRequired: true } }),
    slug: (0, import_fields4.text)({
      isIndexed: "unique",
      validation: { isRequired: true },
      isFilterable: true
    }),
    status: (0, import_fields4.select)({
      type: "enum",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" }
      ],
      defaultValue: "draft",
      ui: {
        displayMode: "segmented-control"
      }
    }),
    publishedAt: (0, import_fields4.timestamp)(),
    excerpt: (0, import_fields4.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    content: (0, import_fields_document.document)({
      formatting: richTextConfig.formatting,
      links: richTextConfig.links,
      dividers: richTextConfig.dividers,
      layouts: richTextConfig.layouts
    }),
    readingTimeMinutes: (0, import_fields4.integer)({
      defaultValue: 5,
      validation: {
        isRequired: true,
        min: 1,
        max: 60
      }
    }),
    featuredImage: (0, import_fields4.text)(),
    author: (0, import_fields4.relationship)({
      ref: "User.posts",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      }
    }),
    categories: (0, import_fields4.relationship)({
      ref: "Category.posts",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    tags: (0, import_fields4.relationship)({
      ref: "Tag.posts",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    comments: (0, import_fields4.relationship)({
      ref: "Comment.post",
      many: true,
      ui: {
        displayMode: "count"
      }
    }),
    seoMetadata: (0, import_fields4.relationship)({
      ref: "SeoMetadata.post",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "description"],
        inlineEdit: { fields: ["title", "description", "keywords"] },
        linkToItem: true,
        inlineCreate: { fields: ["title", "description", "keywords"] },
        inlineConnect: true
      }
    }),
    ...trackingFields
  },
  hooks: {
    resolveInput: ({ resolvedData, inputData, item }) => {
      if (inputData.status === "published" && (!item || item.status !== "published")) {
        resolvedData.publishedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      return resolvedData;
    }
  },
  ui: {
    listView: {
      initialColumns: ["title", "author", "status", "publishedAt"],
      initialSort: { field: "updatedAt", direction: "DESC" }
    },
    labelField: "title"
  }
});

// schema/category.ts
var import_core3 = require("@keystone-6/core");
var import_fields6 = require("@keystone-6/core/fields");
var Category = (0, import_core3.list)({
  access: {
    operation: {
      query: () => true,
      create: isAdminOrEditor,
      update: isAdminOrEditor,
      delete: isAdminOrEditor
    }
  },
  fields: {
    name: (0, import_fields6.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    slug: (0, import_fields6.text)({
      isIndexed: "unique",
      validation: { isRequired: true },
      isFilterable: true
    }),
    description: (0, import_fields6.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    posts: (0, import_fields6.relationship)({
      ref: "Post.categories",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "status", "publishedAt"],
        linkToItem: true,
        inlineConnect: true
      }
    }),
    ...trackingFields
  },
  ui: {
    listView: {
      initialColumns: ["name", "slug", "posts"],
      initialSort: { field: "name", direction: "ASC" }
    },
    labelField: "name"
  }
});

// schema/tag.ts
var import_core4 = require("@keystone-6/core");
var import_fields8 = require("@keystone-6/core/fields");
var Tag = (0, import_core4.list)({
  access: {
    operation: {
      query: () => true,
      create: isAdminOrEditor,
      update: isAdminOrEditor,
      delete: isAdminOrEditor
    }
  },
  fields: {
    name: (0, import_fields8.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    slug: (0, import_fields8.text)({
      isIndexed: "unique",
      validation: { isRequired: true },
      isFilterable: true
    }),
    posts: (0, import_fields8.relationship)({
      ref: "Post.tags",
      many: true,
      ui: {
        displayMode: "count"
      }
    }),
    ...trackingFields
  },
  ui: {
    listView: {
      initialColumns: ["name", "slug", "posts"],
      initialSort: { field: "name", direction: "ASC" }
    },
    labelField: "name"
  }
});

// schema/comment.ts
var import_core5 = require("@keystone-6/core");
var import_fields10 = require("@keystone-6/core/fields");
var Comment = (0, import_core5.list)({
  access: {
    operation: {
      query: ({ session: session2 }) => !!session2 || true,
      // Public read access
      create: () => true,
      // Anyone can create a comment (will be moderated)
      update: isAdminOrEditor,
      // Only admins and editors can update comments
      delete: isAdminOrEditor
      // Only admins and editors can delete comments
    },
    filter: {
      query: ({ session: session2 }) => {
        if (!session2)
          return { status: { equals: "approved" } };
        if (["admin", "editor"].includes(session2.data.role))
          return true;
        return {
          OR: [
            { author: { id: { equals: session2.data.id } } },
            { status: { equals: "approved" } }
          ]
        };
      }
    }
  },
  fields: {
    content: (0, import_fields10.text)({
      validation: { isRequired: true },
      ui: {
        displayMode: "textarea"
      }
    }),
    status: (0, import_fields10.select)({
      type: "enum",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" }
      ],
      defaultValue: "pending",
      validation: { isRequired: true },
      ui: {
        displayMode: "segmented-control"
      }
    }),
    author: (0, import_fields10.relationship)({
      ref: "User.comments",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        linkToItem: true,
        inlineConnect: true
      }
    }),
    post: (0, import_fields10.relationship)({
      ref: "Post.comments",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "status", "publishedAt"],
        linkToItem: true,
        inlineConnect: true
      }
    }),
    isSpam: (0, import_fields10.checkbox)({
      defaultValue: false
    }),
    ...trackingFields
  },
  ui: {
    listView: {
      initialColumns: ["content", "author", "post", "status"],
      initialSort: { field: "createdAt", direction: "DESC" }
    },
    labelField: "content"
  }
});

// schema/apiKey.ts
var import_core6 = require("@keystone-6/core");
var import_fields12 = require("@keystone-6/core/fields");
var import_crypto = __toESM(require("crypto"));
var ApiKey = (0, import_core6.list)({
  access: {
    operation: {
      query: isAdminOrOwner,
      create: isAdminOrOwner,
      update: isAdminOrOwner,
      delete: isAdminOrOwner
    }
  },
  fields: {
    name: (0, import_fields12.text)({
      validation: { isRequired: true }
    }),
    key: (0, import_fields12.text)({
      isIndexed: "unique",
      validation: { isRequired: true },
      ui: {
        itemView: { fieldMode: "read" }
      }
    }),
    status: (0, import_fields12.select)({
      type: "enum",
      options: [
        { label: "Active", value: "active" },
        { label: "Revoked", value: "revoked" }
      ],
      defaultValue: "active",
      validation: { isRequired: true },
      ui: {
        displayMode: "segmented-control"
      }
    }),
    expiresAt: (0, import_fields12.timestamp)(),
    lastUsedAt: (0, import_fields12.timestamp)(),
    user: (0, import_fields12.relationship)({
      ref: "User.apiKeys",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        linkToItem: true,
        inlineConnect: true
      }
    }),
    ...trackingFields
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      if (!resolvedData.key) {
        resolvedData.key = `wb_${import_crypto.default.randomBytes(24).toString("hex")}`;
      }
      return resolvedData;
    }
  },
  ui: {
    listView: {
      initialColumns: ["name", "key", "status", "user"],
      initialSort: { field: "createdAt", direction: "DESC" }
    },
    labelField: "name"
  }
});

// schema/seoMetadata.ts
var import_core7 = require("@keystone-6/core");
var import_fields14 = require("@keystone-6/core/fields");
var SeoMetadata = (0, import_core7.list)({
  access: {
    operation: {
      query: () => true,
      create: isAdminOrEditor,
      update: isAdminOrEditor,
      delete: isAdminOrEditor
    }
  },
  graphql: {
    plural: "SeoMetadatas"
  },
  fields: {
    title: (0, import_fields14.text)({
      validation: { isRequired: true }
    }),
    description: (0, import_fields14.text)({
      validation: { isRequired: true },
      ui: {
        displayMode: "textarea"
      }
    }),
    keywords: (0, import_fields14.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    ogImage: (0, import_fields14.text)(),
    canonicalUrl: (0, import_fields14.text)(),
    structuredData: (0, import_fields14.json)(),
    post: (0, import_fields14.relationship)({
      ref: "Post.seoMetadata",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "status"],
        linkToItem: true,
        inlineConnect: true
      }
    }),
    ...trackingFields
  },
  ui: {
    listView: {
      initialColumns: ["title", "description", "post"],
      initialSort: { field: "title", direction: "ASC" }
    },
    labelField: "title"
  }
});

// schema/index.ts
var lists = {
  User,
  Post,
  Category,
  Tag,
  Comment,
  ApiKey,
  SeoMetadata
};

// keystone.ts
var sessionSecret = process.env.SESSION_SECRET || "this-should-be-a-long-secure-secret";
var databaseURL = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/wellness-blog";
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "id name role",
  initFirstItem: {
    fields: ["name", "email", "password", "role"],
    itemData: { role: "admin" },
    skipKeystoneWelcome: true
  }
});
var session = (0, import_session.statelessSessions)({
  secret: sessionSecret,
  maxAge: 60 * 60 * 24 * 30
  // 30 days
});
var keystone_default = withAuth(
  (0, import_core8.config)({
    db: {
      provider: "postgresql",
      url: databaseURL,
      enableLogging: process.env.NODE_ENV !== "production",
      useMigrations: true,
      idField: { kind: "autoincrement" }
    },
    lists,
    session,
    server: {
      port: parseInt(process.env.KEYSTONE_PORT || "3001"),
      cors: {
        origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
        credentials: true
      }
    },
    graphql: {
      path: "/api/graphql",
      playground: process.env.NODE_ENV !== "production"
    },
    storage: {
      // Configure your file storage here
      images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      },
      files: {
        kind: "local",
        type: "file",
        generateUrl: (path) => `/files${path}`,
        serverRoute: {
          path: "/files"
        },
        storagePath: "public/files"
      }
    },
    ui: {
      isAccessAllowed: (context) => {
        return !!context.session?.data;
      }
    }
  })
);
//# sourceMappingURL=config.js.map
