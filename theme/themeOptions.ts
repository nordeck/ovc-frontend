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

import { COLORS, STANDART_HEIGHT } from '@/utils/constants/theme.constants';
import { type ThemeOptions } from '@mui/material';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export const themeOptions: ThemeOptions = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 375,
            md: 585,
            lg: 744,
            xl: 1440,
        },
    },
    typography: {
        fontSize: 12,
        fontFamily: openSans.style.fontFamily,
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontWeight: 700,
                    background: COLORS.EERIE_BLACK,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                outlined: {
                    color: COLORS.LILA,
                    borderColor: COLORS.LILA,
                    ':hover': {
                        backgroundColor: COLORS.LILA_DARK,
                        borderColor: COLORS.LILA_DARK,
                    },
                },
                contained: {
                    backgroundColor: COLORS.LILA,
                    ':hover': {
                        backgroundColor: COLORS.LILA_DARK,
                    },
                },
            },
            defaultProps: {
                style: {
                    paddingLeft: 16,
                    paddingRight: 16,
                    borderWidth: 2,
                    borderRadius: 10,
                    fontSize: '1rem',
                    lineHeight: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    height: STANDART_HEIGHT,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                subtitle2: {
                    fontSize: 16,
                    fontWeight: 600,
                    color: COLORS.CADET,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiSvgIcon-root': {
                        color: COLORS.EERIE_BLACK,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: COLORS.ALUMINIUM,
                        },
                    },
                    '& .MuiInputBase-input': {
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: COLORS.EERIE_BLACK,
                    },
                },
            },
            defaultProps: {
                style: {
                    borderRadius: 10,
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                style: {
                    height: STANDART_HEIGHT,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                standardInfo: {
                    backgroundColor: COLORS.STAR_COMMAND_BLUE,
                },
                standardError: {
                    backgroundColor: COLORS.PERSIAN_RED,
                },
                standardSuccess: {
                    backgroundColor: COLORS.OFFICE_GREEN,
                },
                standardWarning: {
                    backgroundColor: COLORS.MANGO_TANGO,
                },
                root: {
                    borderRadius: 8,
                    color: COLORS.WHITE,
                    fontWeight: 700,
                    fontSize: 14,
                    '& .MuiAlert-icon': {
                        color: COLORS.WHITE,
                        fontSize: 20,
                        padding: '8px 0',
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    width: '100%',
                    borderRadius: 16,
                    position: 'static',
                    transition: 'box-shadow ease-in-out .25s',
                    '&.Mui-expanded': {
                        borderRadius: 16,
                    },
                    '&:hover': {
                        boxShadow: '0px 4px 4px 1px #0000004D',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    fontSize: 20,
                    fontWeight: 700,
                    padding: '2px 20px',
                    borderRadius: '16px 16px 0 0',
                    '&:active': {
                        borderRadius: 16,
                        backgroundColor: COLORS.DEEP_OCEAN,
                    },
                    '&.Mui-expanded': {
                        margin: 0,
                        backgroundColor: COLORS.STAR_COMMAND_BLUE,
                        borderRadius: '16px 16px 0 0',
                        color: COLORS.WHITE,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${COLORS.PERSIAN_RED}`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 3,
                    },
                },
            },
            defaultProps: {
                style: {
                    borderRadius: 10,
                },
            },
        },
    },
    palette: {
        background: {
            default: COLORS.WHITE,
        },
        primary: {
            dark: COLORS.INDIGO_DUE,
            main: COLORS.STAR_COMMAND_BLUE,
            light: COLORS.ANTI_FLASH_WHITE,
        },
        info: {
            main: COLORS.BEAU_BLUE,
        },
        secondary: {
            main: COLORS.ANTI_FLASH_WHITE,
        },
        text: {
            primary: COLORS.SMOKY_BLACK,
        },
    },
};