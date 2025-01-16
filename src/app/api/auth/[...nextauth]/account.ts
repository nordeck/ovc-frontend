import Joi from 'joi';

/**
 * Next auth account passed to jwt callback when user signs in.
 */
export type Account = {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_at: number;
};

const accountSchema = Joi.object<Account, true>({
  access_token: Joi.string().required(),
  id_token: Joi.string().required(),
  refresh_token: Joi.string().required(),
  expires_at: Joi.number().strict().required(),
}).required();

export function attemptAccount(account: unknown): Account {
  return Joi.attempt(account, accountSchema, { stripUnknown: true });
}
