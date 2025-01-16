import Joi from 'joi';
import {
  SessionAccessToken,
  sessionAccessTokenSchema,
} from './sessionAccessToken';

/**
 * User's session token.
 */
export type SessionToken = {
  name: string;
  email: string;
  decoded: SessionAccessToken;
  access_token: string;
  id_token: string;
  expires_at: number;
  refresh_token: string;
  refresh_token_expired?: boolean;
};

const sessionTokenSchema = Joi.object<SessionToken, true>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  decoded: sessionAccessTokenSchema.required(),
  access_token: Joi.string().required(),
  id_token: Joi.string().required(),
  expires_at: Joi.number().strict().required(),
  refresh_token: Joi.string().required(),
  refresh_token_expired: Joi.boolean(),
}).required();

export function attemptSessionToken(token: unknown): SessionToken {
  return Joi.attempt(token, sessionTokenSchema, { stripUnknown: true });
}
