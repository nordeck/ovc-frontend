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

import { useSnackbar } from '@/contexts/Snackbar/SnackbarContext';
import { COLORS } from '@/utils/constants/theme.constants';
import { getMeetingText } from "@/components/InstantMeeting/getMeetingText";
import { useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import { Meeting } from "@/types/types";

import {
  Button,
  IconButton, SxProps,
  Tooltip,
  Typography,
} from '@mui/material';


interface Props {
  meeting: Meeting,
  small?: boolean,
  variant?: 'text' | 'outlined'
  color?: string,
  sx?: SxProps,
}

export default function CopyInfoButton({
  meeting,
  sx,
  small = true,
  variant = 'text',
  color = COLORS.STAR_COMMAND_BLUE,
}: Props) {

  const { t } = useTranslation();

  const { showSnackbar } = useSnackbar();

  const handleCopy = useCallback(async () => {
    const { plain, html } = getMeetingText(t, meeting);

    const textBlob = new Blob([plain], {
      type: 'text/plain',
    });

    const htmlBlob = new Blob([html], {
      type: 'text/html',
    });

    const clipboardItem = new ClipboardItem({
      [textBlob.type]: textBlob,
      [htmlBlob.type]: htmlBlob,
    });

    await navigator.clipboard.write([clipboardItem]);

    showSnackbar({
      message: 'In die Zwischenablage kopiert',
      autoHideDuration: 3000,
      type: 'info',
    });
  }, [t, meeting, showSnackbar]);

  return small ? (
    <Tooltip
      title={"t('copy.meetingInfoCopy', 'Copy meeting information')"}
      placement="top"
    >
      < IconButton
        id={meeting.id}
        sx={{ alignSelf: 'center', ...sx }}
        onClick={handleCopy}
      >
        <Image color={'info'} width={1} height={1} alt="CopyInfoButton"
          style={{
            height: '1rem',
            width: '1rem',
          }}
          src={
            color === COLORS.STAR_COMMAND_BLUE
              ? '/icons/copy-light-blue.svg'
              : '/icons/copy-dark-blue.svg'
          }
        />
      </IconButton >

    </Tooltip>
  ) : (
    <Button
      aria-label={"t('copy.meetingInfoCopy', 'Copy meeting information')"}
      id={meeting.id}
      size="large"
      sx={{ color }}
      onClick={handleCopy}
      variant={variant}
    >
      <Image height={1} width={1} alt="CopyInfoButton"
        style={{
          marginRight: 8,
          height: '1rem',
          width: '1rem',
        }}
        src={
          color === COLORS.STAR_COMMAND_BLUE
            ? '/icons/copy-light-blue.svg'
            : '/icons/copy-dark-blue.svg'
        }
      />
      <Typography
        flexShrink={1}
        variant="subtitle2"
        sx={{
          color,
          lineHeight: '1rem',
          fontSize: '1rem',
          fontWeight: 700,
          textTransform: 'none',
        }}
      >
        {"t('copy.meetingInfoCopy', 'Copy meeting information')"}
      </Typography>
    </Button>
  );
}
