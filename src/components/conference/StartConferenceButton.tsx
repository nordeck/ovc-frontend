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

import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import {isPopupBlocked} from "@/lib/isPopupBlocked";
import {useAuth} from "@/contexts/Auth/AuthProvider";
import {Meeting} from "@/types/types";
import "../../../i18n"

interface Props {
    meeting?:Meeting,
}

export default function StartConferenceButton({ meeting }: Props) {

    const { t } = useTranslation();

    const {
        clientEnv: {
            NEXT_PUBLIC_JITSI_LINK,
        },
    } = useAuth();

    const handleJoinMeeting = () => {
        const url = new URL(NEXT_PUBLIC_JITSI_LINK + '/' + meeting?.id);
        if (url) {
            const w = window.open(url, '_blank');
            if (isPopupBlocked(w)) {
                window.location.href = url.href;
            }
        }
    };

    return (
        <Button
            variant="contained"
            onClick={handleJoinMeeting}
            disabled={meeting === undefined}
            sx={{
                width: '100%',
                minWidth: '20%',
                height:'60px',
                fontSize:'medium'
            }}
        >
            {t('conference.start_label', 'conference.start_label')}
        </Button>
    )
};