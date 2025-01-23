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

import React, {MouseEvent, useCallback, useState} from "react";
import Popup from "@/components/InstantMeeting/Popup";
import { Button } from "@mui/material";

export default function InstantMeetingButton() {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    function onClose() {
        return () => setAnchorEl(null);
    }

    return (
        <>
            {anchorEl && (
                <Popup anchor={ anchorEl } onClose={ onClose } />
            )}
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                    width: '100%',
                    minWidth: '20%',
                }}
            >
                Meeting starten
            </Button>
        </>
    )
};