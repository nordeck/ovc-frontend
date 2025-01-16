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

import { useAuthLoggedUser } from '@/contexts/Auth/AuthProvider';
import { createMeeting, getMeetings } from '@/utils/api/requests/meeting.api';
import { useEffect, useState } from 'react';
import {
  Meeting,
  MeetingType,
  ResponseError,
  Role,
} from '@/types/types';

export function useGetOrCreateInstantMeeting(): {
  isLoading: boolean;
  data?: Meeting;
  error?: ResponseError;
} {
  const { email } = useAuthLoggedUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Meeting | undefined>();
  const [error, setError] = useState<ResponseError>();

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getMeetings({
        type: MeetingType.Instant,
      });
      const meeting = data?.content?.[0];

      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }

      if (meeting) {
        setData(meeting);
      } else {
        const { data: newMeeting, error: createError } = await createMeeting({
          type: MeetingType.Instant,
          name: '',
          password: '',
          lobby_enabled: false,
          participants: [
            {
              role: Role.Moderator,
              email,
            },
          ],
        });

        if (createError) {
          setError(createError);
        }

        if (newMeeting) {
          setData(newMeeting);
        }
      }

      setIsLoading(false);
    }

    setIsLoading(true);
    fetchData();
  }, [email]);

  return {
    isLoading,
    data,
    error,
  };
}
