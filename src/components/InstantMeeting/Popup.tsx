import { useAuthLoggedUser } from '@/contexts/Auth/AuthProvider';
import { isPopupBlocked } from '@/lib/isPopupBlocked';
import { COLORS } from '@/utils/constants/theme.constants';
import CloseIcon from '@mui/icons-material/Close';
import {
  Popover,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {CopyInfoButton} from "@/components/InstantMeeting/CopyInfoButton";
import {Meeting, MeetingType, Role} from "@/types/types";
import { v4 as uuid } from 'uuid';

interface Props {
  anchor: HTMLElement | null;
  onClose: () => void;
}

export function Popup({ anchor, onClose }: Props) {

  const { email: userEmail } = useAuthLoggedUser();

  const isOpen = Boolean(anchor);
  const id = isOpen ? 'sofortmeeting-starten-popup' : undefined

  const password: string = '';

  const meeting = createMeeting(userEmail);

  const handleJoinMeeting = () => {

    const link: string = 'https://jitsi-vkbund.devops.dev.nordeck.io/' + meeting.id;

    if (link) {
      const w = window.open(link, '_blank');
      if (isPopupBlocked(w)) {
        window.location.href = link;
      }
    }
  };

  function createMeeting(userEmail: string): Meeting {
    return {
      id: uuid(),
      type: MeetingType.Instant,
      name: '',
      password: password,
      lobby_enabled: false,
      owner_id: userEmail,
      conference_pin: '',
      phone_number: 'phone_number',
      sip_jibri_link: '',
      participants: [
        {
          role: Role.Moderator,
          email: userEmail,
        },
      ],
    }
  }

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
              <CopyInfoButton meeting={meeting} small />
            </Stack>
            <Tooltip title="Abbrechen" placement="top">
              <IconButton aria-label="abbrechen knopf" onClick={onClose}>
                <CloseIcon
                    aria-label="schließen bild"
                    sx={{ color: COLORS.STAR_COMMAND_BLUE }}
                />
              </IconButton>
            </Tooltip>
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
      </Popover>
  );
}
