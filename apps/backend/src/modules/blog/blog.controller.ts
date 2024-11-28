import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  createBlogPostSchema,
  getBlogPostsSchema,
  ICreateBlogPost,
  IGetBlogPosts,
  IUpdateBlogPostById,
  updateBlogPostByIdSchema,
} from '@repo/api/index';
import {
  createBlogCategorySchema,
  getBlogCategoriesListSchema,
  getBlogCategoriesSchema,
  ICreateBlogCategory,
  IGetBlogCategoriesList,
  IGetBlogCategories,
  IUpdateBlogCategoryById,
  updateBlogCategoryByIdSchema,
} from '@repo/api/index';
import { Request } from 'express';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { BlogService } from './blog.service';

@Controller({
  path: 'blog',
  version: '1',
})
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/posts')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getBlogPosts(
    @Query(new YupValidationPipe(getBlogPostsSchema))
    query: IGetBlogPosts['payload'],
  ) {
    try {
      return await this.blogService.getBlogPosts(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/posts/create')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async createBlogPost(
    @Body(new YupValidationPipe(createBlogPostSchema))
    body: ICreateBlogPost['payload'],
  ) {
    try {
      return await this.blogService.createBlogPost(body);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Get('/posts/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getBlogPostById(@Param('id') id: string) {
    try {
      return await this.blogService.getBlogPostById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/posts/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updateBlogPostById(
    @Body(new YupValidationPipe(updateBlogPostByIdSchema))
    body: IUpdateBlogPostById['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.blogService.updateBlogPostById(body, id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Delete('/posts/:id/delete')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async deleteBlogPostById(@Param('id') id: string) {
    try {
      return await this.blogService.deleteBlogPostById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Get('/categories')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getBlogCategories(
    @Query(new YupValidationPipe(getBlogCategoriesSchema))
    query: IGetBlogCategories['payload'],
  ) {
    try {
      return await this.blogService.getBlogCategories(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/categories/list')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getBlogCategoriesList(
    @Query(new YupValidationPipe(getBlogCategoriesListSchema))
    query: IGetBlogCategoriesList['payload'],
  ) {
    try {
      return await this.blogService.getBlogCategoriesList(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/categories/create')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async createBlogCategory(
    @Req() req: Request,
    @Body(new YupValidationPipe(createBlogCategorySchema))
    body: ICreateBlogCategory['payload'],
  ) {
    try {
      return await this.blogService.createBlogCategory(
        req.session!.userId,
        body,
      );
    } catch (error) {
      console.log('error', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Get('/categories/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getBlogCategoryById(@Param('id') id: string) {
    try {
      return await this.blogService.getBlogCategoryById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/categories/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updateBlogCategoryById(
    @Body(new YupValidationPipe(updateBlogCategoryByIdSchema))
    body: IUpdateBlogCategoryById['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.blogService.updateBlogCategoryById(body, id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Delete('/categories/:id/delete')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async deleteBlogCategoryById(@Param('id') id: string) {
    try {
      return await this.blogService.deleteBlogCategoryById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }
}
