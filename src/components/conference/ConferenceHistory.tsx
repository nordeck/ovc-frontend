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

import {DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowId} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {COLORS} from "@/utils/constants/theme.constants";
import {t} from "i18next";
import {useSnackbar} from "@/contexts/Snackbar/SnackbarContext";
import {useEvent} from "@/components/conference/useEvent";
import {useContext, useEffect, useState} from "react";
import {Meeting, MeetingType, ResponseError} from "@/types/types";
import {deleteMeeting, getMeetings, updateMeeting} from "@/utils/api/requests/meeting.api";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {ConferenceAppProps, ConferenceContext} from "@/contexts/Conference/ConferenceAppContext";
import {copyConferenceInfo} from "@/lib/copyConferenceInfo";
import {openJitsiConference} from "@/lib/openJitsiConference";

const ConferenceHistory = () => {

    const {showSnackbar} = useSnackbar();
    const [reload, setReload] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Meeting[] | undefined>();
    const [error, setError] = useState<ResponseError>();

    const { jitsiLink } = useContext(ConferenceContext) as ConferenceAppProps;

    const handleDelete = (id: GridRowId) => async () => {
        await deleteMeeting(id.toString());
        setReload(!reload);
    };

    const handleRowClick: GridEventListener<'rowClick'> = async (params) => {
        const meeting = params.row;
        const startedAt = new Date().toISOString();
        meeting.started_at = startedAt;
        await updateMeeting(
            {
                type: meeting.type,
                name: meeting.name,
                password: meeting.password,
                lobby_enabled: meeting.lobby_enabled,
                started_at: startedAt,
            },
            meeting.id);
        setReload(!reload);
        await openJitsiConference(meeting.id, meeting.name, jitsiLink);
    };

    const handleCopyInfo = (id: GridRowId) => async () => {

        const conference = data?.filter((meeting) => meeting.id === id).at(0);

        if (conference) {
            await copyConferenceInfo(conference, jitsiLink, showSnackbar);
        }
    };

    useEvent("onReloadHistory", () => {
        setReload(!reload);
    });

    /* load user meetings from api */
    useEffect(() => {
        async function fetchData() {
            const {data, error} = await getMeetings({
                type: MeetingType.Instant,
            });
            const meetings = data?.content;
            if (error) {
                setError(error);
                setIsLoading(false);
                return;
            }
            if (meetings) {
                const filtered: Meeting[] = meetings.filter(meeting => meeting.started_at !== null);
                filtered.sort((a, b) => (a.started_at as string) > (b.started_at as string) ? -1 : 1)
                setData(filtered);
            }
            setIsLoading(false);
        }
        setIsLoading(true);
        fetchData();
    }, [reload])

    if (error) {
        showSnackbar({
            message: error.message,
            type: 'error',
        });
    }

    const columns: GridColDef[] = [
        {
            field: 'started_at',
            width: 300,
            editable: false,
            cellClassName: 'default-grid-cell',
            valueFormatter: value => new Date(value).toLocaleString(),
        },
        {
            field: 'name',
            width: 150,
            editable: false,
            cellClassName: 'default-grid-cell',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            editable: false,
            cellClassName: 'default-grid-cell',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        key={id}
                        icon={<ContentCopyIcon />}
                        label="Delete"
                        onClick={handleCopyInfo(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDelete(id)}
                        color="inherit"
                    />,
                ];
            }
        }
    ];

    return (
        <section className="flex flex-col items-center justify-center">
            <Box
                className={'mt-4'}
                sx={{
                    height: 270,
                    width: '40%',
                    borderTop: 3,
                    borderBottom: 3,
                    borderLeft: 0,
                    borderRight: 0,
                    borderColor: COLORS.LILA,
                    fontWeight: 'bold',
                }}
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    localeText={{noRowsLabel: t('conference.empty_list_text', 'conference.empty_list_text')}}
                    rowHeight={42}
                    columnHeaderHeight={0}
                    hideFooter={true}
                    loading={isLoading}
                    getRowId={(row) => row.id}
                    slots={{
                        columnHeaders: () => null,
                    }}
                    sx={{
                        border: 0,
                        color: COLORS.CADET,
                        '& .default-grid-cell': {
                            fontWeight: '700',
                            fontSize: 13,
                            borderTop: 0,
                        },
                    }}
                    onRowClick={handleRowClick}
                />
            </Box>
        </section>
    )
}

export default ConferenceHistory

