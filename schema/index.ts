import { Lists } from '.keystone/types';
import { User } from './user';
import { Post } from './post';
import { Category } from './category';
import { Tag } from './tag';
import { Comment } from './comment';
import { ApiKey } from './apiKey';
import { SeoMetadata } from './seoMetadata';

export const lists: Lists = {
  User,
  Post,
  Category,
  Tag,
  Comment,
  ApiKey,
  SeoMetadata,
};