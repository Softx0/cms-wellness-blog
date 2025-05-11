import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { trackingFields, isAdminOrEditor } from './fields';

export const Category = list({
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
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    posts: relationship({
      ref: 'Post.categories',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['title', 'status', 'publishedAt'],
        linkToItem: true,
        inlineConnect: true,
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