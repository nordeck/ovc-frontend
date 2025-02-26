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
import {isPopupBlocked} from "@/lib/isPopupBlocked";
import {useAuth} from "@/contexts/Auth/AuthProvider";
import {ConferenceContext, MeetingContext} from "@/components/conference/ConferenceActions";
import {useSnackbar} from "@/contexts/Snackbar/SnackbarContext";
import createInstantMeeting from "@/components/conference/createInstantMeeting";
import {useContext} from "react";


export default function StartConferenceButton() {

    const { t } = useTranslation();

    const { showSnackbar } = useSnackbar();

    const { loggedUser, meeting, setMeeting, meetingName, setMeetingName } = useContext(ConferenceContext) as MeetingContext;

    const {
        clientEnv: {
            NEXT_PUBLIC_JITSI_LINK,
        },
    } = useAuth();

    const handleJoinMeeting = async () => {
        if (meeting === undefined || meeting === null) {
            const { meeting, error } = await createInstantMeeting(loggedUser, meetingName, true)
            setMeeting(meeting);
            if (error) {
                showSnackbar({
                    message: error.message,
                    type: 'error',
                });
            }
        }
        await openJitsiConference();
        setMeeting(undefined);
        setMeetingName('');
    };

    async function openJitsiConference() {
        const conferenceName = meetingName ? encodeURI(meetingName) : ' ';
        const url = new URL(NEXT_PUBLIC_JITSI_LINK + '/' + meeting?.id + `#config.localSubject="${conferenceName}"`);
        if (url) {
            const w = window.open(url, '_blank');
            if (isPopupBlocked(w)) {
                window.location.href = url.href;
            }
        }
    }

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