import Joi from 'joi';

/**
 * Refreshed access token.
 */
export type RefreshToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  id_token?: string;
};

const refreshTokenSchema = Joi.object<RefreshToken, true>({
  access_token: Joi.string().required(),
  refresh_token: Joi.string().required(),
  expires_in: Joi.number().strict().required(),
  id_token: Joi.string(),
}).required();

export function attemptRefreshToken(token: unknown): RefreshToken {
  return Joi.attempt(token, refreshTokenSchema, { stripUnknown: true });
}
