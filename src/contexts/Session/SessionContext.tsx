'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  return (
    <NextAuthSessionProvider refetchOnWindowFocus={false} refetchInterval={55}>
      {children}
    </NextAuthSessionProvider>
  );
};
