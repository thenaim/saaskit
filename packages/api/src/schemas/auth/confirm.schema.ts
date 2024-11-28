import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export const signUpConfirmSchema = yup.object({
  token: yup.string().required(),
});
export type ISignUpConfirm = {
  payload: yup.InferType<typeof signUpConfirmSchema>;
  response: ApiResponseType;
};
