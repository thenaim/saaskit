import { User } from '@repo/database/index';
import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export const signInSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
export type ISignIn = {
  payload: yup.InferType<typeof signInSchema>;
  response: ApiResponseType<User>;
};
