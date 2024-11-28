import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateBlogCategory,
  ICreateBlogPost,
  IDeleteBlogCategoryById,
  IDeleteBlogPostById,
  IGetBlogCategories,
  IGetBlogCategoriesList,
  IGetBlogCategoryById,
  IGetBlogPostById,
  IGetBlogPosts,
  IUpdateBlogCategoryById,
  IUpdateBlogPostById,
  Prisma,
} from '@repo/api/index';
import slugify from 'slugify';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SessionService } from 'src/services/session/session.service';

@Injectable()
export class BlogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly session: SessionService,
  ) {}

  async getBlogPosts(
    query: IGetBlogPosts['payload'],
  ): Promise<IGetBlogPosts['response']> {
    let orderBy = {} as Prisma.BlogAggregateArgs['orderBy'];
    const order = query.desc ? 'desc' : 'asc';
    switch (query.id) {
      case 'userId':
        orderBy = {
          user: {
            name: order,
          },
        };
        break;
      case 'categotyId':
        orderBy = {
          categoty: {
            name: order,
          },
        };
        break;
      default:
        orderBy = {
          [query.id]: order,
        };
        break;
    }

    const data = await this.prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        categotyId: true,
        userId: true,
        createdAt: true,
        content: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        categoty: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy,
    });

    return {
      data,
      success: true,
    };
  }

  async createBlogPost(
    body: ICreateBlogPost['payload'],
  ): Promise<ICreateBlogPost['response']> {
    const slug = body?.slug
      ? slugify(body.slug).toLowerCase()
      : slugify(body.title).toLowerCase();

    const find = await this.prisma.blog.findFirst({
      where: {
        slug,
      },
    });
    if (find) {
      throw new ConflictException();
    }

    const data = await this.prisma.blog.create({
      data: { ...body, slug },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        categoty: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { data, success: true };
  }

  async getBlogPostById(id: string): Promise<IGetBlogPostById['response']> {
    const data = await this.prisma.blog.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        categoty: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return { data, success: true };
  }

  async updateBlogPostById(
    body: IUpdateBlogPostById['payload'],
    id: string,
  ): Promise<IUpdateBlogPostById['response']> {
    if (body?.slug) {
      body.slug = slugify(body.slug).toLowerCase();
    } else {
      body.slug = slugify(body.title).toLowerCase();
    }

    const find = await this.prisma.blog.findFirst({
      where: {
        slug: body.slug,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }

    const data = await this.prisma.blog.update({
      where: {
        id,
      },
      data: body,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        categoty: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { data, success: true };
  }

  async deleteBlogPostById(
    id: string,
  ): Promise<IDeleteBlogPostById['response']> {
    const find = await this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }
    const data = await this.prisma.blog.delete({
      where: {
        id,
      },
    });
    return { data, success: true };
  }

  async getBlogCategories(
    query: IGetBlogCategories['payload'],
  ): Promise<IGetBlogCategories['response']> {
    let orderBy = {} as Prisma.BlogCategoryAggregateArgs['orderBy'];
    const order = query.desc ? 'desc' : 'asc';
    switch (query.id) {
      case 'userId':
        orderBy = {
          user: {
            name: order,
          },
        };
        break;
      default:
        orderBy = {
          [query.id]: order,
        };
        break;
    }

    const data = await this.prisma.blogCategory.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy,
    });

    // await new Promise((res, rej) => setTimeout(() => res(undefined), 2000));

    return {
      data,
      success: true,
    };
  }

  async getBlogCategoriesList(
    query: IGetBlogCategoriesList['payload'],
  ): Promise<IGetBlogCategoriesList['response']> {
    const data = await this.prisma.blogCategory.findMany({
      // where: {
      //   name: { contains: `%${query.search}%`, mode: 'insensitive' },
      // },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      data,
      success: true,
    };
  }

  async createBlogCategory(
    userId: string,
    body: ICreateBlogCategory['payload'],
  ): Promise<ICreateBlogCategory['response']> {
    body.slug = (
      body?.slug ? slugify(body.slug) : slugify(body.name)
    ).toLowerCase();

    const find = await this.prisma.blogCategory.findFirst({
      where: {
        slug: body.slug,
      },
    });
    if (find) {
      throw new ConflictException();
    }

    const data = await this.prisma.blogCategory.create({
      data: {
        name: body.name,
        slug: body.slug,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { data, success: true };
  }

  async getBlogCategoryById(
    id: string,
  ): Promise<IGetBlogCategoryById['response']> {
    const data = await this.prisma.blogCategory.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return { data, success: true };
  }

  async updateBlogCategoryById(
    body: IUpdateBlogCategoryById['payload'],
    id: string,
  ): Promise<IUpdateBlogCategoryById['response']> {
    body.slug = body?.slug ? slugify(body.slug) : slugify(body.name);

    const find = await this.prisma.blogCategory.findFirst({
      where: {
        slug: body.slug,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }

    const data = await this.prisma.blogCategory.update({
      where: {
        id,
      },
      data: body,
    });
    return { data, success: true };
  }

  async deleteBlogCategoryById(
    id: string,
  ): Promise<IDeleteBlogCategoryById['response']> {
    const find = await this.prisma.blogCategory.findUnique({
      where: {
        id,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }
    const data = await this.prisma.blogCategory.delete({
      where: {
        id,
      },
    });
    return { data, success: true };
  }
}
