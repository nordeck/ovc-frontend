'use client'

import React, {useCallback, useState} from "react";
import {Button} from "@mui/material";
import {Popup} from "@/components/InstantMeeting/Popup";

export default function InstantMeetingButton() {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    // @ts-ignore
    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLButtonElement);
    }, []);

    return (
        <>
            {anchorEl && (
                <Popup anchor={anchorEl} onClose={() => setAnchorEl(null)} />
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