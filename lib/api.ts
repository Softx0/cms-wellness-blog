import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors',
});

// Helper function for authenticated requests
export const authenticatedRequest = async (query: string, variables = {}, token?: string) => {
  if (token) {
    graphqlClient.setHeader('Authorization', `Bearer ${token}`);
  } else {
    graphqlClient.setHeader('Authorization', '');
  }
  
  return await graphqlClient.request(query, variables);
};

// Function to get posts
export const getPosts = async ({ limit = 10, skip = 0, where = {} }) => {
  const query = `
    query getPosts($limit: Int!, $skip: Int!, $where: PostWhereInput) {
      posts(
        take: $limit,
        skip: $skip,
        where: $where,
        orderBy: { publishedAt: desc }
      ) {
        id
        title
        slug
        excerpt
        publishedAt
        readingTimeMinutes
        featuredImage
        author {
          id
          name
        }
        categories {
          id
          name
          slug
        }
        tags {
          id
          name
          slug
        }
      }
      postsCount(where: $where)
    }
  `;

  return await graphqlClient.request(query, { limit, skip, where });
};

// Function to get a single post by slug
export const getPostBySlug = async (slug: string) => {
  const query = `
    query getPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        slug
        status
        publishedAt
        excerpt
        content {
          document
        }
        readingTimeMinutes
        featuredImage
        author {
          id
          name
          bio
        }
        categories {
          id
          name
          slug
        }
        tags {
          id
          name
          slug
        }
        comments(where: { status: { equals: "approved" } }) {
          id
          content
          createdAt
          author {
            id
            name
          }
        }
        seoMetadata {
          title
          description
          keywords
          ogImage
          canonicalUrl
          structuredData
        }
      }
    }
  `;

  return await graphqlClient.request(query, { slug });
};

// Function to get categories
export const getCategories = async () => {
  const query = `
    query getCategories {
      categories {
        id
        name
        slug
        description
      }
    }
  `;

  return await graphqlClient.request(query);
};

// Function to get tags
export const getTags = async () => {
  const query = `
    query getTags {
      tags {
        id
        name
        slug
      }
    }
  `;

  return await graphqlClient.request(query);
};

// Function to add a comment
export const addComment = async (data: {
  content: string;
  postId: string;
  authorId?: string;
}, token?: string) => {
  const mutation = `
    mutation addComment($data: CommentCreateInput!) {
      createComment(data: $data) {
        id
      }
    }
  `;

  const variables = {
    data: {
      content: data.content,
      post: { connect: { id: data.postId } },
      ...(data.authorId && { author: { connect: { id: data.authorId } } }),
      status: "pending"
    }
  };

  return await authenticatedRequest(mutation, variables, token);
};