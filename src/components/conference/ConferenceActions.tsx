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

import {createContext, useEffect, useState} from 'react'
import {useGetOrCreateInstantMeeting} from "@/components/conference/useGetOrCreateInstantMeeting";
import {useSnackbar} from "@/contexts/Snackbar/SnackbarContext";
import {useAuth} from "@/contexts/Auth/AuthProvider";
import {isVarTrue} from "@/lib/isVarTrue";
import {Card, Stack} from "@mui/material";
import ConferenceNameField from "@/components/conference/ConferenceNameField";
import StartConferenceButton from "@/components/conference/StartConferenceButton";
import CopyConferenceInfoButton from "@/components/conference/CopyConferenceInfoButton";
import VideoTestButton from "@/components/conference/VideoTestButton";
import "../../../i18n"

export const ConferenceContext = createContext({});

function ConferenceActions() {

    const {
        clientEnv: {
            NEXT_PUBLIC_VIDEO_TEST_ENABLED,
        },
    } = useAuth();


    const isVideoTestEnabled = isVarTrue(NEXT_PUBLIC_VIDEO_TEST_ENABLED);

    const { meeting, isLoading, error, getOrCreateMeeting } = useGetOrCreateInstantMeeting();

    const [ nameHasChanged, setNameHasChanged ] = useState(false);

    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (meeting === undefined) {
            getOrCreateMeeting();
        }
        if (!isLoading && error) {
            showSnackbar({
                message: error.message,
                type: 'error',
            });
        }
    }, [isLoading, error, showSnackbar]);


    return (
        <>
            <ConferenceContext.Provider value={{ meeting, nameHasChanged, setNameHasChanged }}>
                <Card variant="outlined" className={'w-2/3 p-4'}>
                    <Stack className="space-y-6 w-full items-center justify-center">
                        <Stack className="w-1/3">
                            <ConferenceNameField />
                        </Stack>
                        <Stack className="w-1/3">
                            <StartConferenceButton />
                        </Stack>
                        <Stack className="w-1/4">
                            <CopyConferenceInfoButton meeting={meeting} />
                        </Stack>
                        { isVideoTestEnabled &&
                            <Stack className="w-1/4">
                                <VideoTestButton />
                            </Stack>
                        }
                    </Stack>
                </Card>
            </ConferenceContext.Provider>
        </>
    )
}

export default ConferenceActions
