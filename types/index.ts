export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
  } | null;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string;
  excerpt?: string;
  content?: {
    document: Array<{
      type: string;
      level?: number;
      children: Array<{
        text: string;
      }>;
    }>;
  };
  readingTimeMinutes: number;
  featuredImage?: string;
  author?: Author | null;
  categories?: Category[];
  tags?: Tag[];
  comments?: Comment[];
}

export interface PostsResponse {
  posts: Post[];
  postsCount?: number;
}

export interface CategoriesResponse {
  categories: Category[];
}
