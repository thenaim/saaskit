import { User } from '@repo/database/index';

import { ApiResponseType } from '../../interfaces';

export type IGetMe = {
  payload: undefined;
  response: ApiResponseType<Omit<User, 'password'>>;
};
