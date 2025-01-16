import { API, CatchAxiosError } from '@/utils/api/api';
import { signIn, signOut } from 'next-auth/react';

export const authLogout = async () => {
  const { error } = await CatchAxiosError(() => API.get(`auth/logout`));

  if (!error) {
    return await signOut({ callbackUrl: '/login' });
  }
};

export const authLogin = (callbackUrl: string) => {
  return signIn('keycloak', { callbackUrl });
};
