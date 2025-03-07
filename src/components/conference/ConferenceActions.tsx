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

import {Stack, Typography} from "@mui/material";
import ConferenceNameField from "@/components/conference/ConferenceNameField";
import StartConferenceButton from "@/components/conference/StartConferenceButton";
import CopyConferenceInfoButton from "@/components/conference/CopyConferenceInfoButton";
import VideoTestButton from "@/components/conference/VideoTestButton";
import {t} from "i18next";
import "../../../i18n"
import {useContext} from "react";
import {ConferenceAppProps, ConferenceContext} from "@/contexts/Conference/ConferenceAppContext";


function ConferenceActions() {

    const { isVideoTestEnabled } = useContext(ConferenceContext)  as ConferenceAppProps;

    return (
        <>
            <section className="flex flex-col h-screen max-h-[48vh] items-center justify-center main-section">
                <Typography className={'text-white'}
                            sx={{
                                fontSize: 40,
                                fontWeight: '700',
                                marginTop: 2,
                                marginBottom: 4,
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
                        <ConferenceNameField/>
                        <StartConferenceButton/>
                    </Stack>
                    <Stack className="w-2/5 items-center justify-center" direction={'row'} spacing={2}>
                        <CopyConferenceInfoButton/>
                        {isVideoTestEnabled &&
                            <VideoTestButton/>
                        }
                    </Stack>
                </Stack>
            </section>
        </>
    );
}

export default ConferenceActions
