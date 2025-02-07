/*
 * Copyright 2025 Nordeck IT + Consulting GmbH
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