import { Prisma } from '@repo/database/index';

import { ApiResponseType } from '../../interfaces';

export interface IGetUsersList {
  payload: any;
  response: ApiResponseType<
    Prisma.UserGetPayload<{
      select: {
        id: true;
        name: true;
      };
    }>[]
  >;
}
