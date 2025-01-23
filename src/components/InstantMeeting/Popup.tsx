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

import { useAuthLoggedUser } from '@/contexts/Auth/AuthProvider';
import { isPopupBlocked } from '@/lib/isPopupBlocked';
import { COLORS } from '@/utils/constants/theme.constants';
import CloseIcon from '@mui/icons-material/Close';
import { CopyInfoButton } from "@/components/InstantMeeting/CopyInfoButton";
import { useCreateMeeting } from "@/components/InstantMeeting/useCreateMeeting";
import { Button, IconButton, Popover, Stack, Tooltip, Typography } from "@mui/material";


interface Props {
  anchor: HTMLElement | null,
  onClose: () => void
}

export default function Popup({ anchor, onClose }: Props) {

  const isOpen = Boolean(anchor);

  const id = isOpen ? 'sofortmeeting-starten-popup' : undefined;

  const user = useAuthLoggedUser();

  const meeting = useCreateMeeting(user.email);

  const handleJoinMeeting = () => {

    const link: string = 'https://jitsi-vkbund.devops.dev.nordeck.io/' + meeting?.id;

    if (link) {
      const w = window.open(link, '_blank');
      if (isPopupBlocked(w)) {
        window.location.href = link;
      }
    }
  };

  return (
    <Popover
      id={id}
      open={isOpen}
      onClose={onClose}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      sx={{ mt: 1 }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 5,
          },
        },
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Stack borderRadius={24} maxWidth={350} gap={2} m={2}>
        <Stack>
          <Typography fontSize={'0,85rem'} fontWeight={500}>
            Das Sofortmeeting kann nur von Ihnen gestartet werden. Am
            Sofortmeeting kann jeder mit Hilfe der Meetinginformationen
            teilnehmen.
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">

          <Stack direction="row">
            <CopyInfoButton meeting={meeting} />
          </Stack>

          {/*
          <Tooltip title="Abbrechen" placement="top">
            <IconButton aria-label="abbrechen knopf" onClick={onClose}>
              <CloseIcon
                aria-label="schließen bild"
                sx={{ color: COLORS.STAR_COMMAND_BLUE }}
              />
            </IconButton>
          </Tooltip>
          */}

        </Stack>
        <Stack gap={2} direction="row">
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={handleJoinMeeting}
          >
            Meeting starten
          </Button>
        </Stack>
      </Stack>
    </Popover >
  );
}
