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

import {TextField} from "@mui/material";
import {t} from "i18next";
import {ChangeEvent, useContext} from "react";
import {stripHtml} from "string-strip-html"
import {removeSpecialChars} from "@/lib/removeSpecialChars";
import {COLORS} from "@/utils/constants/theme.constants";
import {ConferenceAppProps, ConferenceContext} from "@/contexts/Conference/ConferenceAppContext";


function ConferenceNameField() {

    const { meetingName, setMeetingName } = useContext(ConferenceContext) as ConferenceAppProps;

    function updateName(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const result = stripHtml(evt.target.value).result;
        const cleanText = removeSpecialChars(result);
        setMeetingName(cleanText);
    }

    return (
        <TextField variant={'filled'} className={"bg-white w-4/5"}
                   sx={{
                       borderRadius: '10px 0px 0px 10px !important',
                       '& .MuiOutlinedInput-root': {
                           '& fieldset': {
                               borderColor: COLORS.WHITE,
                           },
                       },
                   }}
                   slotProps={{
                       input: {
                           disableUnderline: true,
                       },
                   }}
                   value={meetingName}
                   label={t('conference.name_label', 'conference.name_label')}
                   onChange={ (e) => updateName(e)}
        />
    )
}

export default ConferenceNameField
