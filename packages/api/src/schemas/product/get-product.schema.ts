import { Product } from '@repo/database/index';

import { ApiResponseType } from '../../interfaces';

export type IGetProduct = {
  payload: any;
  response: ApiResponseType<Product>;
};
