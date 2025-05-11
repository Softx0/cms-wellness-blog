import { list } from '@keystone-6/core';
import { text, password, select, relationship } from '@keystone-6/core/fields';
import { trackingFields, isAdmin, isAdminOrOwner } from './fields';

export const User = list({
  access: {
    operation: {
      query: () => true,
      create: isAdmin,
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
  ui: {
    listView: {
      initialColumns: ['name', 'email', 'role', 'status'],
      initialSort: { field: 'name', direction: 'ASC' },
    },
    labelField: 'name',
  },
});