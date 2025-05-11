import { list } from '@keystone-6/core';
import { 
  text, 
  relationship, 
  select, 
  timestamp,
  integer
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { trackingFields, richTextConfig, isAdminEditorOrAuthor, isAdminOrOwner } from './fields';

export const Post = list({
  access: {
    operation: {
      query: () => true,
      create: isAdminEditorOrAuthor,
      update: isAdminOrOwner,
      delete: isAdminOrOwner,
    },
    filter: {
      query: ({ session }) => {
        if (!session) return { status: { equals: 'published' } };
        if (session.data.role === 'admin') return true;
        if (session.data.role === 'editor') return true;
        if (session.data.role === 'author') {
          return {
            OR: [
              { author: { id: { equals: session.data.id } } },
              { status: { equals: 'published' } },
            ],
          };
        }
        return { status: { equals: 'published' } };
      },
    },
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({
      isIndexed: 'unique',
      validation: { isRequired: true },
      isFilterable: true,
    }),
    status: select({
      type: 'enum',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    publishedAt: timestamp(),
    excerpt: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    content: document({
      formatting: richTextConfig.formatting,
      links: richTextConfig.links,
      dividers: richTextConfig.dividers,
      layouts: richTextConfig.layouts,
    }),
    readingTimeMinutes: integer({
      defaultValue: 5,
      validation: {
        isRequired: true,
        min: 1,
        max: 60,
      },
    }),
    featuredImage: text(),
    author: relationship({
      ref: 'User.posts',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    categories: relationship({
      ref: 'Category.posts',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
    }),
    tags: relationship({
      ref: 'Tag.posts',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
    }),
    comments: relationship({
      ref: 'Comment.post',
      many: true,
      ui: {
        displayMode: 'count',
      },
    }),
    seoMetadata: relationship({
      ref: 'SeoMetadata.post',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['title', 'description'],
        inlineEdit: { fields: ['title', 'description', 'keywords'] },
        linkToItem: true,
        inlineCreate: { fields: ['title', 'description', 'keywords'] },
        inlineConnect: true,
      },
    }),
    ...trackingFields,
  },
  hooks: {
    resolveInput: ({ resolvedData, inputData, item }) => {
      // Set publishedAt date when post status changes to published
      if (inputData.status === 'published' && (!item || item.status !== 'published')) {
        resolvedData.publishedAt = new Date().toISOString();
      }
      return resolvedData;
    },
  },
  ui: {
    listView: {
      initialColumns: ['title', 'author', 'status', 'publishedAt'],
      initialSort: { field: 'updatedAt', direction: 'DESC' },
    },
    labelField: 'title',
  },
});