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

'use client'

import React, { MouseEvent } from "react";
import {Button, Tooltip} from "@mui/material";
import { useTranslation } from "react-i18next";
import "../../../i18n"
import {useAuth} from "@/contexts/Auth/AuthProvider";
import {isVarTrue} from "@/lib/isVarTrue";


export default function VideoTestButton() {

    const { t } = useTranslation();

    const {
        clientEnv: {
            NEXT_PUBLIC_VIDEO_TEST_ENABLED,
            NEXT_PUBLIC_VIDEO_TEST_LINK,
        },
    } = useAuth();

    const isVideoTestEnabled = isVarTrue(NEXT_PUBLIC_VIDEO_TEST_ENABLED);

    const handleClick = async () => {
        window.location.href = NEXT_PUBLIC_VIDEO_TEST_LINK + 'callback=' + encodeURI(window.location.href);
    }

    // can only show the button, if the env. prop has been set
    // otherwise, show nothing
    if (!isVideoTestEnabled) {
        return (
            <></>
        )
    }
    else {
        return (
            <>
                <Tooltip title={t('videoTest.buttonTooltip', 'videoTest.buttonTooltip')}>
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        sx={{
                            width: '100%',
                            minWidth: '20%',
                            backgroundColor: 'slategrey',
                        }}
                    >
                        {t('videoTest.buttonLabel', 'videoTest.buttonLabel')}
                    </Button>
                </Tooltip>
            </>
        )
    }
};