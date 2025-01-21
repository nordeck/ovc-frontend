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

import { Meeting } from '@/types/types';
import { TFunction } from 'i18next';
import { DateTime } from 'luxon';

const FORMAT = 'dd.MM.yyyy HH:mm:ss';

export type MeetingText = {
  plain: string;
  html: string;
};

export function getMeetingText(t: TFunction, meeting: Meeting): MeetingText {
  const {
    id,
    type,
    name,
    owner_id,
    password,
    end_time,
    start_time,
    parent_id,
    conference_pin,
    phone_number,
    sip_jibri_link,
  } = meeting;

  const message = t(
    'copy.meetingInformation',
    `$t(copy.baseMeetingInformation_instant, {"context": "{{baseMeetingInformationContext}}"})$t(copy.phoneInfo)$t(copy.roomkit)`,
    {
      baseMeetingInformationContext: type.toLowerCase(),
      owner_id,
      password,
      name,
      start: start_time
        ? DateTime.fromISO(start_time).toFormat(FORMAT)
        : undefined,
      end: end_time ? DateTime.fromISO(end_time).toFormat(FORMAT) : undefined,
      meetingLink: `${window.location.origin}/meetings/meeting/join/${parent_id || id}`,
      phone_number,
      conference_pin,
      sip_jibri_link,
    },
  );

  return {
    plain: message.replace(/<[^>]+>/g, ''),
    html: message,
  };
}
