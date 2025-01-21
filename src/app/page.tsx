import InstantMeetingButton from "@/components/InstantMeeting/InstantMeetingButton";
import {AuthProvider} from "@/contexts/Auth/AuthProvider";
import {SessionProvider} from "@/contexts/Session/SessionContext";
import {SnackbarProvider} from "@/contexts/Snackbar/SnackbarContext";
import {LocalizationProvider} from "@/utils/localization/LocalizationProvider";
import {Metadata} from "next";
import NavigationTopBar from "@/components/opendesk/NavigationTopBar/NavigationTopBar";

export const metadata: Metadata = {
    title: 'openDesk Video Conference',
    description: 'openDesk Video Conference',
};

export default function Home() {
    return (
      <LocalizationProvider>
          <SnackbarProvider>
              <SessionProvider>
                  <AuthProvider>
                      <NavigationTopBar />
                      <main
                          className="flex flex-col h-screen max-h-[80vh] items-center justify-center m-4 font-[family-name:var(--font-geist-sans)]">
                          <div className="flex flex-1 items-center justify-center m-4">
                              <InstantMeetingButton />
                          </div>
                      </main>
                  </AuthProvider>
              </SessionProvider>
          </SnackbarProvider>
      </LocalizationProvider>
  );
}
