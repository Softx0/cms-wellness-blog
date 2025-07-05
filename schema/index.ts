import type { ListConfig } from "@keystone-6/core/types";
import { User } from "./user";
import { Post } from "./post";
import { Category } from "./category";
import { Tag } from "./tag";
import { Comment } from "./comment";
import { ApiKey } from "./apiKey";
import { SeoMetadata } from "./seoMetadata";

export const lists: Record<string, ListConfig<any, any>> = {
  User,
  Post,
  Category,
  Tag,
  Comment,
  ApiKey,
  SeoMetadata,
};
