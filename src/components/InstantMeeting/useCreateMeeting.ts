import {Meeting, MeetingType, Role} from "@/types/types";
import {v4 as uuid} from "uuid";

export function useCreateMeeting(userEmail: string): Meeting {

    const id = uuid();
    
    const meeting: Meeting = {
        id: id ,
        type: MeetingType.Instant,
        name: 'Conference-' + id,
        password: '',
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
    return meeting;
}