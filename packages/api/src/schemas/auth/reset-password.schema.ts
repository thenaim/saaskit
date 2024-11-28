import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export const resetPasswordSchema = yup.object({
  token: yup.string().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .test('passwords-match', 'The passwords did not match', function (value) {
      return this.parent.password === value;
    }),
});
export type IResetPassword = {
  payload: yup.InferType<typeof resetPasswordSchema>;
  response: ApiResponseType;
};
