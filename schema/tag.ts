import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { trackingFields, isAdminOrEditor } from './fields';

export const Tag = list({
  access: {
    operation: {
      query: () => true,
      create: isAdminOrEditor,
      update: isAdminOrEditor,
      delete: isAdminOrEditor,
    },
  },
  fields: {
    name: text({ 
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    slug: text({
      isIndexed: 'unique',
      validation: { isRequired: true },
      isFilterable: true,
    }),
    posts: relationship({
      ref: 'Post.tags',
      many: true,
      ui: {
        displayMode: 'count',
      },
    }),
    ...trackingFields,
  },
  ui: {
    listView: {
      initialColumns: ['name', 'slug', 'posts'],
      initialSort: { field: 'name', direction: 'ASC' },
    },
    labelField: 'name',
  },
});