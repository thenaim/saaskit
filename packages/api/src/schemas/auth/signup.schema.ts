import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export const signUpSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .test('passwords-match', 'The passwords did not match', function (value) {
      return this.parent.password === value;
    }),
});
export type ISignUp = {
  payload: yup.InferType<typeof signUpSchema>;
  response: ApiResponseType;
};
