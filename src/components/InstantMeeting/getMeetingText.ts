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

  /* IMPORTANT: This comments define the nested keys used below and are used to
     extract them via i18next-parser

    t('copy.baseMeetingInformation_normal', '{{owner_id}} has invited you to a meeting.</br></br>\n\n<b>Title</b>: {{name}}</br></br>\n\n<b>Time</b>: from {{start}} to {{end}}</br></br>\n\nTo participate please use the following meeting link: <a href="{{meetingLink}}">{{meetingLink}}</a></br></br>\n\nThe meeting password is: <b>{{password}}</b></br></br>\n\n')
    t('copy.baseMeetingInformation_static', '{{owner_id}} has invited you to a room.</br></br>\n\n<b>Title</b>: {{name}}</br></br>\n\nTo participate please use the following room link: <a href="{{meetingLink}}">{{meetingLink}}</a></br></br>\n\nThe room password is: <b>{{password}}</b></br></br>\n\n')
    t('copy.baseMeetingInformation_instant', 'Your access data for the instant meeting from {{owner_id}}:</br></br>\n\nMeeting Link: <a href="{{meetingLink}}">{{meetingLink}}</a></br></br>\n\nMeeting Password: <b>{{password}}</b></br></br>\n\n')

    t('copy.phoneInfo', 'To <b>participate by telephone</b> please use the following dial-in number: <b>{{phone_number}}</b></br>\nConference ID: <b>{{conference_pin}}</b></br></br>\n\n')
    t('copy.roomkit', `To <b>participate with a Cisco Roomkit</b> please use the following Cisco Roomkit (Video) link: <b>{{sip_jibri_link}}</b></br>\nConference ID: <b>{{conference_pin}}</b>`)
  */

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
