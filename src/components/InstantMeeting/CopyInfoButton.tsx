import { useSnackbar } from '@/contexts/Snackbar/SnackbarContext';
import { Meeting } from '@/types/types';
import { COLORS } from '@/utils/constants/theme.constants';
import {getMeetingText} from "@/components/InstantMeeting/getMeetingText";
import { useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  type SxProps,
} from '@mui/material';

interface Props {
  meeting: Meeting;
  sx?: SxProps;
  color?: string;
  small?: boolean;
  variant?: 'text' | 'outlined';
}

export function CopyInfoButton({
  meeting,
  sx,
  small,
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
      title={t('copy.meetingInfoCopy', 'Copy meeting information')}
      placement="top"
    >
      <IconButton
        id={meeting.id}
        sx={{ alignSelf: 'center', ...sx }}
        onClick={handleCopy}
      >
        <Image
          color={'info'}
          width={1}
          height={1}
          style={{
            height: '1rem',
            width: '1rem',
          }}
          alt="CopyInfoButton"
          src={
            color === COLORS.STAR_COMMAND_BLUE
              ? '/icons/copy-light-blue.svg'
              : '/icons/copy-dark-blue.svg'
          }
        />
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      aria-label={t('copy.meetingInfoCopy', 'Copy meeting information')}
      id={meeting.id}
      size="large"
      sx={{ color }}
      onClick={handleCopy}
      variant={variant}
    >
      <Image
        height={1}
        width={1}
        style={{
          marginRight: 8,
          height: '1rem',
          width: '1rem',
        }}
        alt="CopyInfoButton"
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
        {t('copy.meetingInfoCopy', 'Copy meeting information')}
      </Typography>
    </Button>
  );
}
