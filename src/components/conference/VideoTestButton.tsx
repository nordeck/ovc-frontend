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
import { useTranslation } from "react-i18next";
import {useAuth} from "@/contexts/Auth/AuthProvider";

export default function VideoTestButton() {

    const { t } = useTranslation();

    const {
        clientEnv: {
            NEXT_PUBLIC_VIDEO_TEST_LINK,
        },
    } = useAuth();

    const handleClick = async () => {
        const testAppUrl = new URL(NEXT_PUBLIC_VIDEO_TEST_LINK);
        testAppUrl.searchParams.append('callback', encodeURI(window.location.href));
        window.location.href = testAppUrl.href;
    }

    return (
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{ backgroundColor: 'dimgrey', }}
            >
                <span className={'text-sm'}>
                    {t('videoTest.buttonLabel', 'videoTest.buttonLabel')}
                </span>
            </Button>
    )
};