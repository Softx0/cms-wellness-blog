import { list } from "@keystone-6/core";
import { text, relationship, json } from "@keystone-6/core/fields";
import { trackingFields, isAdminOrEditor } from "./fields";

export const SeoMetadata = list({
  access: {
    operation: {
      query: () => true,
      create: isAdminOrEditor,
      update: isAdminOrEditor,
      delete: isAdminOrEditor,
    },
  },
  graphql: {
    plural: "SeoMetadatas",
  },
  fields: {
    title: text({
      validation: { isRequired: true },
    }),
    description: text({
      validation: { isRequired: true },
      ui: {
        displayMode: "textarea",
      },
    }),
    keywords: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    ogImage: text(),
    canonicalUrl: text(),
    structuredData: json(),
    post: relationship({
      ref: "Post.seoMetadata",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    ...trackingFields,
  },
  ui: {
    listView: {
      initialColumns: ["title", "description", "post"],
      initialSort: { field: "title", direction: "ASC" },
    },
    labelField: "title",
  },
});
