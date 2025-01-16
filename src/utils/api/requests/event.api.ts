/*
 * Copyright 2024 Nordeck IT + Consulting GmbH
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

import { SendEventOpts } from '@/lib/SendEventOpts';
import { API, CatchAxiosError, Response } from '@/utils/api/api';

/**
 * API to send events
 */
export async function sendEvent<T>(
  data: Omit<SendEventOpts<T>, 'sender'>,
): Promise<Response<void>> {
  return await CatchAxiosError(() => API.post<void>(`/event`, data));
}
