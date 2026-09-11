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

import { ApiError, ResponseError, SessionType } from '@/types/types';
import Axios, { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { authLogin } from './requests/auth.api';
import { notifyBackendAuthError } from './authErrorBus';

export const API = Axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Forces only 1 login attempt at any given time
let pendingLogin: Promise<unknown> | null = null;
function triggerLogin(callbackUrl: string): Promise<unknown> {
  if (!pendingLogin) {
    pendingLogin = authLogin(callbackUrl).finally(() => {
      pendingLogin = null;
    });
  }
  return pendingLogin;
}

// Once we've decided the backend is rejecting a session NextAuth considers
// valid, stop re-checking on every subsequent 401.
let backendAuthErrorNotified = false;

async function handleUnauthorized(callbackUrl: string): Promise<void> {
  if (backendAuthErrorNotified) {
    return;
  }

  const session = await getSession();
  const sessionLooksValid =
    !!session && !(session as SessionType).refresh_token_expired;

  if (sessionLooksValid) {
    // NextAuth believes our token is still valid, yet the backend rejected
    // it. Re-authenticating would produce the same token and 401 again.
    // This points to a backend/Keycloak configuration mismatch.
    backendAuthErrorNotified = true;
    notifyBackendAuthError();
  } else {
    await triggerLogin(callbackUrl);
  }
}

export type Response<T> =
  | {
      data?: T;
      error?: ResponseError;
    }
  | {
      data: T;
      error: undefined;
    }
  | {
      data: undefined;
      error: ResponseError;
    };

export async function CatchAxiosError<T>(
  func: () => Promise<AxiosResponse<T>>,
): Promise<Response<T>> {
  try {
    const response = await func();
    return { data: response.data };
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.request?.responseURL?.includes('logout')
      ) {
        await handleUnauthorized(window.location.pathname);
      }
      const apiError = error.response?.data as ApiError;
      return { error: { message: error.message, apiError } };
    } else if (error instanceof Error) {
      return { error: { message: error.message } };
    } else {
      return { error: { message: String(error) } };
    }
  }
}
