import Joi from 'joi';

/**
 * Next auth token passed to jwt callback when user signs in.
 */
export type SignInToken = {
  name: string;
  email: string;
};

const signInTokenSchema = Joi.object<SignInToken, true>({
  name: Joi.string().required(),
  email: Joi.string().required(),
}).required();

export function attemptSignInToken(token: unknown): SignInToken {
  return Joi.attempt(token, signInTokenSchema, { stripUnknown: true });
}
