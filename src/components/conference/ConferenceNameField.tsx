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
import {ChangeEvent, useContext, useState} from "react";
import {ConferenceContext, MeetingContext} from "@/components/conference/ConferenceActions";
import {stripHtml} from "string-strip-html"
import {removeSpecialChars} from "@/lib/removeSpecialChars";


function ConferenceNameField() {

    const { meeting, setNameHasChanged } = useContext(ConferenceContext) as MeetingContext;
    const [value, setValue] = useState('');

    function updateName(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const result = stripHtml(evt.target.value).result;
        const cleanText = removeSpecialChars(result);
        setValue(cleanText);
        if (meeting !== undefined) meeting.name = cleanText;
        setNameHasChanged(true);
    }

    return (
        <TextField className={"bg-white w-4/5"}
                   value={value}
                   label={t('conference.name_label', 'conference.name_label')}
                   onChange={ (e) => updateName(e)}
        />
    )
}

export default ConferenceNameField
