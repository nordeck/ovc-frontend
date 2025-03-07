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

import {makeMeetingText} from "@/lib/makeMeetingText";
import {t} from "i18next";
import {Meeting} from "@/types/types";
import {SnackbarProps} from "@/contexts/Snackbar/SnackbarContext";

export async function copyConferenceInfo(meeting: Meeting, jitsiLink: string, showSnackbar: (params: Partial<SnackbarProps>) => void ) {

    const { plain, html } = meeting ? makeMeetingText(t, meeting, jitsiLink) : { plain: '', html: '' };

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
}