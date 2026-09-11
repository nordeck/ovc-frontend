/*
 * Copyright 2025 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import { useGetEnvironment } from '@/contexts/Auth/useGetEnvironment';
import { authLogin, authLogout } from '@/utils/api/requests/auth.api';
import { BACKEND_AUTH_ERROR_EVENT } from '@/utils/api/authErrorBus';
import { CircularProgress, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {SessionType, UserType} from "@/types/types";
import {COLORS} from "@/utils/constants/theme.constants";

function isPagePublic(page: string): boolean {
  return ['/login', '/meetings/meeting/join/'].some((path) =>
    page.startsWith(path),
  );
}

export type AuthState = {
  login: (callbackUrl: string) => void;
  logout: () => void;
  user?: UserType;
  clientEnv: Record<string, string>;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren<object>) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const { data: session, status } = useSession();
  const { isLoading: isEnvironmentLoading, data: environment } =
    useGetEnvironment();

  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | undefined>();
  const [backendAuthError, setBackendAuthError] = useState<boolean>(false);
  const isLoggingInRef = useRef(false);

  useEffect(() => {
    function onBackendAuthError() {
      setBackendAuthError(true);
    }
    window.addEventListener(BACKEND_AUTH_ERROR_EVENT, onBackendAuthError);
    return () =>
      window.removeEventListener(BACKEND_AUTH_ERROR_EVENT, onBackendAuthError);
  }, []);

  const login = useCallback(async (callbackUrl: string) => {
    await authLogin(callbackUrl);
  }, []);

  const logout = useCallback(async () => {
    await authLogout();
  }, []);

  const authContext = useMemo<AuthState>(
    () => ({
      login,
      logout,
      user,
      clientEnv: environment,
    }),
    [login, logout, user, environment],
  );

  useEffect(() => {
    function sync() {
      if (
        (status !== 'loading' &&
          session &&
          (session as SessionType).refresh_token_expired &&
          !pathname.startsWith('/login')) ||
        (status === 'unauthenticated' && !isPagePublic(pathname))
      ) {
        // Guard added for the React's strict mode breaking the login by useEffect 2nd invocation
        if (!isLoggingInRef.current) {
          isLoggingInRef.current = true;
          login(window.location.pathname);
        }
        return;
      }

      if (status === 'unauthenticated' && isPagePublic(pathname)) {
        isLoggingInRef.current = false;
        setIsUserLoading(false);
      }

      if (status === 'authenticated' && session) {
        isLoggingInRef.current = false;
        const sessionUser = session?.user as UserType;
        setUser((prev) => (isEqual(prev, sessionUser) ? prev : sessionUser));
        setIsUserLoading(false);
      }
    }
    sync();
  }, [login, pathname, session, status]);

  const isShowChildren =
    (user || (isPagePublic(pathname) && !isUserLoading)) &&
    !isEnvironmentLoading;

  const primaryColor = environment.NEXT_PUBLIC_PRIMARY_COLOR || COLORS.LILA;

  return (
    <AuthContext.Provider value={authContext}>
      {backendAuthError ? (
        <div
          style={{
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            maxWidth: 480,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {t('auth.backendErrorTitle')}
          </Typography>
          <Typography>{t('auth.backendErrorMessage')}</Typography>
        </div>
      ) : isShowChildren ? (
        children
      ) : (
        <div
          style={{
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress size={100} sx={{color: primaryColor}} />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth can only be used inside of <AuthProvider>`);
  }

  return context;
}

export function useAuthLoggedUser(): UserType {
  const { user } = useAuth();

  if (!user) {
    throw new Error(`User is not logged in`);
  }

  return user;
}
