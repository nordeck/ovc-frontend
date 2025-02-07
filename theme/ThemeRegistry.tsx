'use client';

import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import { themeOptions } from './themeOptions';

const theme = createTheme(themeOptions);

export function ThemeRegistry({ children }: PropsWithChildren) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}