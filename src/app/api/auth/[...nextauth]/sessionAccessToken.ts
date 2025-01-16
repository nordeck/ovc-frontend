import Joi from 'joi';

/**
 * Access token part stored in a session token.
 */
export type SessionAccessToken = {
  realm_access?: {
    roles?: string[];
  };
};

export const sessionAccessTokenSchema = Joi.object<SessionAccessToken, true>({
  realm_access: Joi.object({
    roles: Joi.array().items(Joi.string()),
  }).strict(),
}).required();

export function attemptSessionAccessToken(
  accessToken: unknown,
): SessionAccessToken {
  return Joi.attempt(accessToken, sessionAccessTokenSchema, {
    stripUnknown: true,
  });
}
