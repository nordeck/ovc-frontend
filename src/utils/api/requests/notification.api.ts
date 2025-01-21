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

import { API, CatchAxiosError, Response } from '@/utils/api/api';
import {makeUrlSearch, Notification} from '@/types/types';

type NotificationsPage = {
  content: Notification[];
};

export async function getNotifications(params: {
  start?: string;
  end?: string;
  offset?: number;
  limit?: number;
}): Promise<Response<NotificationsPage>> {
  return await CatchAxiosError(() =>
    API.get<NotificationsPage>(`/notifications` + makeUrlSearch(params)),
  );
}

export async function viewNotification(
  notificationId: string,
): Promise<Response<void>> {
  return await CatchAxiosError(() =>
    API.patch<void>(`/notifications/${notificationId}/view`),
  );
}

export async function deleteNotification(
  notificationId: string,
): Promise<Response<void>> {
  return await CatchAxiosError(() =>
    API.delete<void>(`/notifications/${notificationId}`),
  );
}

export async function viewAllNotifications(): Promise<Response<void>> {
  return await CatchAxiosError(() =>
    API.patch<void>(`/notifications/view-all`),
  );
}

export async function deleteAllNotifications(): Promise<Response<void>> {
  return await CatchAxiosError(() => API.delete<void>(`/notifications/all`));
}
