import {isPopupBlocked} from "@/lib/isPopupBlocked";

export async function openJitsiConference(meetingId: string, meetingName: string, jitsiLink: string) {
    const conferenceName = meetingName ? encodeURIComponent(meetingName) : ' ';
    const url = new URL(jitsiLink + '/' + meetingId + `#config.localSubject="${conferenceName}"`);
    if (url) {
        const w = window.open(url, '_blank');
        if (isPopupBlocked(w)) {
            window.location.href = url.href;
        }
    }
};