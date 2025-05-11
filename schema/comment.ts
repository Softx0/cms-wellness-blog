import { list } from '@keystone-6/core';
import { text, relationship, select, checkbox } from '@keystone-6/core/fields';
import { trackingFields, isAdminOrEditor } from './fields';

export const Comment = list({
  access: {
    operation: {
      query: ({ session }) => !!session || true, // Public read access
      create: () => true, // Anyone can create a comment (will be moderated)
      update: isAdminOrEditor, // Only admins and editors can update comments
      delete: isAdminOrEditor, // Only admins and editors can delete comments
    },
    filter: {
      query: ({ session }) => {
        if (!session) return { status: { equals: 'approved' } };
        if (['admin', 'editor'].includes(session.data.role)) return true;
        return { 
          OR: [
            { author: { id: { equals: session.data.id } } }, 
            { status: { equals: 'approved' } }
          ],
        };
      },
    },
  },
  fields: {
    content: text({
      validation: { isRequired: true },
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      type: 'enum',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      validation: { isRequired: true },
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    author: relationship({
      ref: 'User.comments',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    post: relationship({
      ref: 'Post.comments',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['title', 'status', 'publishedAt'],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    isSpam: checkbox({
      defaultValue: false,
    }),
    ...trackingFields,
  },
  ui: {
    listView: {
      initialColumns: ['content', 'author', 'post', 'status'],
      initialSort: { field: 'createdAt', direction: 'DESC' },
    },
    labelField: 'content',
  },
});