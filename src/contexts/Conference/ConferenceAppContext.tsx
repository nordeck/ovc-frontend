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

import React, {createContext, ReactNode, useState} from 'react'
import {Meeting} from "@/types/types";
import {useAuth, useAuthLoggedUser} from "@/contexts/Auth/AuthProvider";
import {isVarTrue} from "@/lib/isVarTrue";


export type ConferenceAppProps = {
    loggedUser: string,
    isVideoTestEnabled: boolean,
    jitsiLink: string,
    meeting: Meeting | undefined,
    setMeeting: (meeting: Meeting | undefined) => void,
    meetingName: string,
    setMeetingName: (meetingName: string) => void,
}

interface Props {
    children: ReactNode;
}

export const ConferenceContext= createContext<ConferenceAppProps | null>(null);

export const ConferenceAppContext = ({ children }: Props) => {

    const {
        clientEnv: {
            NEXT_PUBLIC_VIDEO_TEST_ENABLED,
            NEXT_PUBLIC_JITSI_LINK,
        },
    } = useAuth();

    const isVideoTestEnabled = isVarTrue(NEXT_PUBLIC_VIDEO_TEST_ENABLED);
    const { email: loggedUser} = useAuthLoggedUser();
    const [ meetingName, setMeetingName ] = useState('');
    const [ meeting, setMeeting ] = useState<Meeting | undefined>();


    return (
        <ConferenceContext.Provider value={{
            loggedUser: loggedUser,
            isVideoTestEnabled: isVideoTestEnabled,
            jitsiLink: NEXT_PUBLIC_JITSI_LINK,
            meeting,
            setMeeting,
            meetingName,
            setMeetingName,
        }}>
            {children}
        </ConferenceContext.Provider>
    );
}