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

import {makeMeetingText} from "@/components/conference/makeMeetingText";
import {useTranslation} from "react-i18next";
import {useSnackbar} from "@/contexts/Snackbar/SnackbarContext";
import {useAuth} from "@/contexts/Auth/AuthProvider";
import {Button} from "@mui/material";
import {useContext} from "react";
import {ConferenceContext, MeetingContext} from "@/components/conference/ConferenceActions";
import createInstantMeeting from "@/components/conference/createInstantMeeting";

function CopyConferenceInfoButton() {

    const { t } = useTranslation();

    const { showSnackbar } = useSnackbar();

    const { loggedUser, meeting, setMeeting, meetingName } = useContext(ConferenceContext) as MeetingContext;


    const {
        clientEnv: {
            NEXT_PUBLIC_JITSI_LINK,
        },
    } = useAuth();

    const handleCopy = async () => {

        if (!meeting) {
            const { meeting, error } = await createInstantMeeting(loggedUser, meetingName, false);
            setMeeting(meeting);

            if (error) {
                showSnackbar({
                    message: error.message,
                    type: 'error',
                });
                return;
            }
        }

        const { plain, html } = meeting ? makeMeetingText(t, meeting, NEXT_PUBLIC_JITSI_LINK) : { plain: '', html: '' };

        const textBlob = new Blob([plain], { type: 'text/plain', });

        const htmlBlob = new Blob([html], { type: 'text/html', });

        const clipboardItem = new ClipboardItem({
            [textBlob.type]: textBlob,
            [htmlBlob.type]: htmlBlob,
        });

        await navigator.clipboard.write([clipboardItem]);

        showSnackbar({
            message: t('copy.clipboardSuccess', 'copy.clipboardSuccess'),
            autoHideDuration: 3000,
            type: 'success',
        });
    };

    return (
        <Button
                variant="contained"
                sx={{
                    backgroundColor: 'dimgrey',
                    '&:hover': {
                        backgroundColor: '#4d4d4d',
                    }
                }}
                onClick={handleCopy}
                >
            <span className={'text-sm'}>
                {t('copy.buttonTooltip', 'copy.buttonTooltip')}
            </span>
        </Button>
    )
}

export default CopyConferenceInfoButton
