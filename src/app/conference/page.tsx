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

import InstantMeetingButton from "@/components/InstantMeeting/InstantMeetingButton";
import { Metadata } from "next";
import NavigationTopBar from "@/components/opendesk/NavigationTopBar/NavigationTopBar";
import VideoTestButton from "@/components/InstantMeeting/VideoTestButton";
import {Stack} from "@mui/material";
import {isVarTrue} from "@/lib/isVarTrue";

export const metadata: Metadata = {
    title: 'openDesk Video Conference',
    description: 'openDesk Video Conference',
};

export default function Conference() {

    const envVideoTestEnabled = process.env.NEXT_PUBLIC_VIDEO_TEST_ENABLED;
    const isVideoTestEnabled = isVarTrue(envVideoTestEnabled);

    return (
        <>
            <NavigationTopBar />
            <main className="flex flex-col h-screen max-h-[80vh] items-center justify-center m-4">
                <Stack className="space-y-6 w-full items-center justify-center">
                    <Stack className="w-1/4">
                        <InstantMeetingButton />
                    </Stack>
                    { isVideoTestEnabled &&
                        <Stack>
                            <VideoTestButton />
                        </Stack>
                    }
                </Stack>
            </main>
        </>
    );
}
