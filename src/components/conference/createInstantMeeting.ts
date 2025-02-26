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

import {Meeting, MeetingType, ResponseError, Role} from "@/types/types";
import {createMeeting} from "@/utils/api/requests/meeting.api";


export default async function createInstantMeeting(loggedUser: string, name: string, started: boolean):
    Promise<{
        meeting: Meeting | undefined;
        error: ResponseError | undefined
    }> {

    const { data: meeting, error } = await createMeeting({
        type: MeetingType.Instant,
        name: name,
        password: '',
        lobby_enabled: false,
        started: started,
        started_at: started ? new Date().toISOString() : undefined,
        participants: [
            {
                role: Role.Moderator,
                email: loggedUser,
            },
        ],
    });

    console.log('Created meeting: ' + JSON.stringify(meeting));

    return {
        meeting,
        error,
    };
}