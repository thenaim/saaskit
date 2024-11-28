import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export const forgotPasswordSchema = yup.object({
  email: yup.string().required().email(),
});
export type IForgotPassword = {
  payload: yup.InferType<typeof forgotPasswordSchema>;
  response: ApiResponseType;
};
