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

import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {COLORS} from "@/utils/constants/theme.constants";
import {t} from "i18next";
import {useSnackbar} from "@/contexts/Snackbar/SnackbarContext";
import {useEvent} from "@/components/conference/useEvent";
import {useEffect, useState} from "react";
import {Meeting, MeetingType, ResponseError} from "@/types/types";
import {getMeetings} from "@/utils/api/requests/meeting.api";

const ConferenceHistory = () => {

    const {showSnackbar} = useSnackbar();

    const [reload, setReload] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Meeting[] | undefined>();
    const [error, setError] = useState<ResponseError>();

    useEvent("onReloadHistory", () => {
        setReload(!reload);
        console.log('Received [onReloadHistory] event.')
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
                const filtered = meetings.filter(meeting => meeting.started_at !== null);
                setData(filtered);
            }
            setIsLoading(false);
        }
        setIsLoading(true);
        fetchData();
    }, [reload]);

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
        },
        {
            field: 'name',
            width: 150,
            editable: false,
            cellClassName: 'default-grid-cell',
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
                    slots={{
                        columnHeaders: () => null,
                    }}
                    sx={{
                        border: 0,
                        color: COLORS.CADET,
                        '& .MuiDataGrid-filler': {
                            border: 0,
                            display: 'none'
                        },
                        '& .MuiDataGrid-cellEmpty': {
                            border: 0
                        },
                        '& .default-grid-cell': {
                            fontWeight: '700',
                            fontSize: 13,
                            borderTop: 0,
                        },
                        '& .MuiDataGrid-overlay': {
                            fontSize: 14,
                            textAlign: 'center',
                            padding: 4,
                        }
                    }}
                />
            </Box>
        </section>
    )
}

export default ConferenceHistory

