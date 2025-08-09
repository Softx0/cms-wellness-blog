import { list } from '@keystone-6/core';
import { text, password, select, relationship } from '@keystone-6/core/fields';
import { trackingFields, isAdmin, isAdminOrOwner } from './fields';

export const User = list({
  access: {
    operation: {
      query: () => true,
      // Permitir auto-registro público; controles adicionales se aplican por campo y hooks
      create: () => true,
      update: isAdminOrOwner,
      delete: isAdmin,
    },
    filter: {
      query: ({ session }) => {
        if (!session) return { status: { equals: 'active' } };
        if (session.data.role === 'admin') return true;
        return { OR: [{ id: { equals: session.data.id } }, { status: { equals: 'active' } }] };
      },
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    role: select({
      type: 'enum',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
      ],
      defaultValue: 'author',
      validation: { isRequired: true },
      ui: {
        displayMode: 'segmented-control',
      },
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
      },
    }),
    status: select({
      type: 'enum',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Deleted', value: 'deleted' },
      ],
      defaultValue: 'active',
      validation: { isRequired: true },
      ui: {
        displayMode: 'segmented-control',
      },
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
      },
    }),
    bio: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    posts: relationship({
      ref: 'Post.author',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['title', 'status', 'publishedAt'],
        linkToItem: true,
        inlineCreate: { fields: ['title', 'status'] },
        inlineEdit: { fields: ['title', 'status'] },
        inlineConnect: true,
      },
    }),
    comments: relationship({
      ref: 'Comment.author',
      many: true,
    }),
    apiKeys: relationship({
      ref: 'ApiKey.user',
      many: true,
    }),
    ...trackingFields,
  },
  hooks: {
    resolveInput: async ({ operation, resolvedData, context, item }) => {
      // En creación por self-service, forzar role/status seguros si no es admin
      const isAdminSession = context.session?.data?.role === 'admin';
      if (operation === 'create' && !isAdminSession) {
        resolvedData.role = 'author';
        resolvedData.status = 'active';
      }
      // En actualización por usuario no admin, impedir modificaciones de role/status
      if (operation === 'update' && !isAdminSession) {
        if ('role' in resolvedData) delete resolvedData.role;
        if ('status' in resolvedData) delete resolvedData.status;
      }
      return resolvedData;
    },
  },
  ui: {
    listView: {
      initialColumns: ['name', 'email', 'role', 'status'],
      initialSort: { field: 'name', direction: 'ASC' },
    },
    labelField: 'name',
  },
});