import { list } from '@keystone-6/core';
import { 
  text, 
  relationship, 
  password, 
  timestamp, 
  select, 
  checkbox, 
  integer,
  json,
  virtual
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';

// Re-usable field configurations
export const trackingFields = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    validation: { isRequired: true },
    ui: { createView: { fieldMode: 'hidden' } }
  }),
  updatedAt: timestamp({
    defaultValue: { kind: 'now' },
    db: { updatedAt: true },
    ui: { createView: { fieldMode: 'hidden' } }
  }),
};

// Document field configuration for rich text content
export const richTextConfig = {
  formatting: {
    inlineMarks: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      code: true,
    },
    listTypes: {
      ordered: true,
      unordered: true,
    },
    alignment: {
      center: true,
      end: true,
    },
    headingLevels: [1, 2, 3, 4, 5, 6],
    blockTypes: {
      blockquote: true,
      code: true,
    },
    softBreaks: true,
  },
  links: true,
  dividers: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
    [2, 1],
    [1, 2],
  ],
};

// Access control functions
export const isAdmin = ({ session }) => {
  return session?.data?.role === 'admin';
};

export const isAdminOrEditor = ({ session }) => {
  return ['admin', 'editor'].includes(session?.data?.role);
};

export const isAdminEditorOrAuthor = ({ session }) => {
  return ['admin', 'editor', 'author'].includes(session?.data?.role);
};

export const isOwner = ({ session, item }) => {
  if (!session) return false;
  return session.data.id === item.authorId;
};

export const isAdminOrOwner = ({ session, item }) => {
  if (!session) return false;
  if (session.data.role === 'admin') return true;
  return session.data.id === item.authorId;
};