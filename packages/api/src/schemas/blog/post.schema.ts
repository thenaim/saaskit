import { Blog, Prisma } from '@repo/database/index';
import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export type IBlogPost = Prisma.BlogGetPayload<{
  select: {
    id: true;
    title: true;
    slug: true;
    categotyId: true;
    userId: true;
    createdAt: true;
    content: true;
    user: {
      select: {
        id: true;
        name: true;
      };
    };
    categoty: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export const createBlogPostSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  content: yup
    .object({
      time: yup.number().optional(),
      blocks: yup.array().required().min(1),
      version: yup.string().optional(),
    })
    .required(),
  slug: yup.string(),
  imageUrl: yup.string(),
  isPublished: yup.boolean(),
  userId: yup.string().required(),
  categotyId: yup.string(),
  publishedAt: yup.date(),
});

export const updateBlogPostByIdSchema = createBlogPostSchema;

export const getBlogPostsSchema = yup.object({
  id: yup
    .string()
    .oneOf(Object.values(Prisma.BlogScalarFieldEnum))
    .default('title'),
  desc: yup.boolean().default(false),
});

export type IGetBlogPosts = {
  payload: yup.InferType<typeof getBlogPostsSchema>;
  response: ApiResponseType<IBlogPost[]>;
};

export type ICreateBlogPost = {
  payload: yup.InferType<typeof createBlogPostSchema>;
  response: ApiResponseType<IBlogPost>;
};

export type IGetBlogPostById = {
  payload: any;
  response: ApiResponseType<IBlogPost>;
};

export type IUpdateBlogPostById = {
  payload: yup.InferType<typeof createBlogPostSchema>;
  response: ApiResponseType<IBlogPost>;
};

export type IDeleteBlogPostById = {
  payload: any;
  response: ApiResponseType<Blog>;
};
