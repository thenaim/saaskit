import { BlogCategory, Prisma } from '@repo/database/index';
import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export const getBlogCategoriesSchema = yup.object({
  id: yup
    .string()
    .oneOf(Object.values(Prisma.BlogCategoryScalarFieldEnum))
    .default('name'),
  desc: yup.boolean().default(false),
});

export const getBlogCategoriesListSchema = yup.object({
  search: yup.string(),
});

export const createBlogCategorySchema = yup.object({
  name: yup.string().required(),
  slug: yup.string().optional(),
});

export const updateBlogCategoryByIdSchema = createBlogCategorySchema;

export type IGetBlogCategories = {
  payload: yup.InferType<typeof getBlogCategoriesSchema>;
  response: ApiResponseType<BlogCategory[]>;
};

export type IGetBlogCategoriesList = {
  payload: yup.InferType<typeof getBlogCategoriesListSchema>;
  response: ApiResponseType<
    Prisma.BlogCategoryGetPayload<{
      select: {
        id: true;
        name: true;
      };
    }>[]
  >;
};

export type ICreateBlogCategory = {
  payload: yup.InferType<typeof createBlogCategorySchema>;
  response: ApiResponseType<BlogCategory>;
};

export type IGetBlogCategoryById = {
  payload: string;
  response: ApiResponseType<BlogCategory>;
};

export type IUpdateBlogCategoryById = {
  payload: yup.InferType<typeof createBlogCategorySchema>;
  response: ApiResponseType<BlogCategory>;
};

export type IDeleteBlogCategoryById = {
  payload: string;
  response: ApiResponseType<BlogCategory>;
};
