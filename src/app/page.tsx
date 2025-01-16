import InstantMeetingButton from "@/components/InstantMeeting/InstantMeetingButton";
import {AuthProvider} from "@/contexts/Auth/AuthProvider";
import {SessionProvider} from "@/contexts/Session/SessionContext";
import {SnackbarProvider} from "@/contexts/Snackbar/SnackbarContext";
import {LocalizationProvider} from "@/utils/localization/LocalizationProvider";
import {Inter} from "next/font/google";
import {Metadata} from "next";

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
    title: 'openDesk Video Conference',
    description: 'openDesk Video Conference',
};

export default function Home() {
    return (
      <>
          <LocalizationProvider>
              <SnackbarProvider>
                  <SessionProvider>
                      <AuthProvider>
                          <div
                              className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                              <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                                  <div className="flex gap-4 items-center flex-col sm:flex-row">
                                      <InstantMeetingButton />
                                  </div>
                              </main>
                          </div>
                      </AuthProvider>
                  </SessionProvider>
              </SnackbarProvider>
          </LocalizationProvider>
      </>
  );
}
