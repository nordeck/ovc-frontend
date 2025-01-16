import { attemptRefreshToken, RefreshToken } from './refreshToken';

export async function refreshAccessToken(
  refresh_token: string,
): Promise<RefreshToken> {
  let response;
  try {
    response = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID || '',
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token,
      }),
      method: 'POST',
    });
  } catch (error) {
    throw new Error('Could not fetch refresh access token', { cause: error });
  }

  if (!response.ok) {
    const text = await response.text().catch(() => undefined);
    throw new Error(
      `Could not refresh access token, status: ${response.status}, text: ${text}`,
    );
  }

  return attemptRefreshToken(await response.json());
}
