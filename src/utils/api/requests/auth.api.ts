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
