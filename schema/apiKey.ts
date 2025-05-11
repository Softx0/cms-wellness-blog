import { list } from '@keystone-6/core';
import { text, relationship, timestamp, select } from '@keystone-6/core/fields';
import { trackingFields, isAdmin, isAdminOrOwner } from './fields';
import crypto from 'crypto';

export const ApiKey = list({
  access: {
    operation: {
      query: isAdminOrOwner,
      create: isAdminOrOwner,
      update: isAdminOrOwner,
      delete: isAdminOrOwner,
    },
  },
  fields: {
    name: text({ 
      validation: { isRequired: true },
    }),
    key: text({
      isIndexed: 'unique',
      validation: { isRequired: true },
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
    status: select({
      type: 'enum',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Revoked', value: 'revoked' },
      ],
      defaultValue: 'active',
      validation: { isRequired: true },
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    expiresAt: timestamp(),
    lastUsedAt: timestamp(),
    user: relationship({
      ref: 'User.apiKeys',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    ...trackingFields,
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // Generate a secure API key if one is not provided
      if (!resolvedData.key) {
        resolvedData.key = `wb_${crypto.randomBytes(24).toString('hex')}`;
      }
      return resolvedData;
    },
  },
  ui: {
    listView: {
      initialColumns: ['name', 'key', 'status', 'user'],
      initialSort: { field: 'createdAt', direction: 'DESC' },
    },
    labelField: 'name',
  },
});