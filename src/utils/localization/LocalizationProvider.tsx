'use client';

import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { deDE } from '@mui/x-date-pickers/locales';
import { PropsWithChildren } from 'react';

export function LocalizationProvider({ children }: PropsWithChildren<{}>) {
  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterLuxon}
      localeText={
        deDE.components.MuiLocalizationProvider.defaultProps.localeText
      }
      adapterLocale="de"
    >
      {children}
    </MuiLocalizationProvider>
  );
}
