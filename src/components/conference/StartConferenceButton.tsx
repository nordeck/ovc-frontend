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

'use client'

import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {openJitsiConference} from "@/lib/openJitsiConference";
import {useSnackbar} from "@/contexts/Snackbar/SnackbarContext";
import createInstantMeeting from "@/lib/createInstantMeeting";
import {useContext} from "react";
import {updateMeeting} from "@/utils/api/requests/meeting.api";
import {ConferenceAppProps, ConferenceContext} from "@/contexts/Conference/ConferenceAppContext";
import {useEvent} from "@/components/conference/useEvent";


export default function StartConferenceButton() {

    const { t } = useTranslation();

    const { showSnackbar } = useSnackbar();

    const { loggedUser, jitsiLink, meeting, setMeeting, meetingName, setMeetingName } = useContext(ConferenceContext) as ConferenceAppProps;

    const { dispatch } = useEvent('onReloadHistory');

    const handleJoinMeeting = async () => {
        if (!meeting) {
            const { meeting, error } = await createInstantMeeting(loggedUser, meetingName, true)
            setMeeting(meeting);
            if (error) {
                showSnackbar({
                    message: error.message,
                    type: 'error',
                });
            }
        }
        else {
            // set existing meeting as started and save it
            const startedAt = new Date().toISOString()
            meeting.started_at = startedAt;
            await updateMeeting(
            {
                        type: meeting.type,
                        name: meetingName,
                        password: meeting.password,
                        lobby_enabled: meeting.lobby_enabled,
                        started_at: startedAt,
                    },
                    meeting.id);
        }
        dispatch('');
        await openJitsiConference(meeting?.id as string, meetingName, jitsiLink);
        setMeeting(undefined);
        setMeetingName('');
    };

    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: '0px 10px 10px 0px !important',
            }}
            onClick={handleJoinMeeting}
            className={'w-2/5'}
        >
            {t('conference.start_label', 'conference.start_label')}
        </Button>
    )
};