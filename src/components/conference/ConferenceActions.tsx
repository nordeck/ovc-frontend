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

import {createContext, useState} from 'react'
import {useAuth, useAuthLoggedUser} from "@/contexts/Auth/AuthProvider";
import {isVarTrue} from "@/lib/isVarTrue";
import {Stack, Typography} from "@mui/material";
import ConferenceNameField from "@/components/conference/ConferenceNameField";
import StartConferenceButton from "@/components/conference/StartConferenceButton";
import CopyConferenceInfoButton from "@/components/conference/CopyConferenceInfoButton";
import VideoTestButton from "@/components/conference/VideoTestButton";
import {Meeting} from "@/types/types";
import {t} from "i18next";
import "../../../i18n"

export type MeetingContext = {
    loggedUser: string,
    meeting: Meeting | undefined,
    setMeeting: (meeting: Meeting | undefined) => void,
    meetingName: string,
    setMeetingName: (meetingName: string) => void,
}

export const ConferenceContext= createContext<MeetingContext | null>(null);

function ConferenceActions() {

    const {
        clientEnv: {
            NEXT_PUBLIC_VIDEO_TEST_ENABLED,
        },
    } = useAuth();

    const isVideoTestEnabled = isVarTrue(NEXT_PUBLIC_VIDEO_TEST_ENABLED);
    const { email: loggedUser} = useAuthLoggedUser();

    const [ meetingName, setMeetingName ] = useState('');
    const [ meeting, setMeeting ] = useState<Meeting | undefined>();

    return (
        <>
            <ConferenceContext.Provider value={{
                loggedUser,
                meeting,
                setMeeting,
                meetingName,
                setMeetingName
            }}>

                <Typography className={'text-white'}
                    sx={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginTop: 2,
                        marginBottom: 6,
                    }}
                >
                    {t('main.title', 'main.title')}
                </Typography>

                <Typography className={'text-white'}
                            sx={{
                                fontSize: 17,
                                fontWeight: '700',
                            }}
                >
                    {t('main.nameRequest', 'main.nameRequest')}
                </Typography>

                <Stack className="space-y-6 w-full items-center justify-center m-4">
                    <Stack className="w-2/5 items-center justify-center" direction={'row'} spacing={0}>
                        <ConferenceNameField />
                        <StartConferenceButton />
                    </Stack>
                    <Stack className="w-2/5 items-center justify-center" direction={'row'} spacing={2}>
                        <CopyConferenceInfoButton />
                        { isVideoTestEnabled &&
                                <VideoTestButton />
                        }
                    </Stack>
                </Stack>
            </ConferenceContext.Provider>
        </>
    )
}

export default ConferenceActions
