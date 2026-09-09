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

'use client'

import {CircularProgress, Drawer, IconButton, Link, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Navigation} from "@/components/opendesk/NavigationTopBar/types";
import NavigationMenuItem from "@/components/opendesk/NavigationTopBar/NavigationMenuItem";
import MenuCloseIcon from "@/components/opendesk/NavigationTopBar/MenuCloseIcon";
import {inter} from "@/components/opendesk/NavigationTopBar/fonts";

interface NavigationMenuDrawerProps {
    open: boolean;
    onClose: () => void;
    navigation: Navigation;
    isLoading: boolean;
    error: boolean;
    logoSrc: string;
    logoHeight: string;
    portalLink: string;
    primaryColor: string;
}

export default function NavigationMenuDrawer({open, onClose, navigation, isLoading, error, logoSrc, logoHeight, portalLink, primaryColor}: NavigationMenuDrawerProps) {

    const {t} = useTranslation();

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            aria-label={t('navigation.menuLabel', 'navigation.menuLabel')}
            slotProps={{
                paper: {
                    className: `w-80 rounded-r-2xl ${inter.className}`,
                    sx: {padding: '16px 12px'},
                },
            }}
        >
            <div className="flex items-center justify-between mb-5">
                <Link href={portalLink} target="_blank" aria-label={t('navigation.logoLinkLabel', 'navigation.logoLinkLabel')}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- logo can be overridden to an arbitrary remote URL via env config */}
                    <img src={logoSrc} alt={t('navigation.logoAlt', 'navigation.logoAlt')} style={{height: logoHeight}} className="w-auto"/>
                </Link>
                <IconButton
                    aria-label={t('navigation.closeLabel', 'navigation.closeLabel')}
                    onClick={onClose}
                    disableRipple
                    sx={{
                        width: '32px',
                        height: '32px',
                        padding: 0,
                        borderRadius: '8px',
                        '&:hover, &:focus': {
                            backgroundColor: 'rgba(54, 104, 129, 0.04)',
                        },
                        '&:active': {
                            backgroundColor: 'rgba(5, 38, 87, 0.06)',
                        },
                    }}
                >
                    <MenuCloseIcon/>
                </IconButton>
            </div>

            {error ? (
                <div className="flex items-center justify-center text-center text-slate-500 text-sm font-semibold py-10 px-2">
                    {t('navigation.menuError', 'navigation.menuError')}
                </div>
            ) : isLoading ? (
                <div className="flex items-center justify-center py-10">
                    <CircularProgress size={32} sx={{color: primaryColor}}/>
                </div>
            ) : (
                navigation.categories?.map((category) => (
                    <div key={category.identifier}>
                        <Typography
                            component="h2"
                            className="mt-4 mb-2"
                            sx={{
                                fontSize: '12px',
                                fontWeight: 700,
                                lineHeight: 1.25,
                                letterSpacing: '-0.0209em',
                                color: '#656D77',
                            }}
                        >
                            {category.display_name}
                        </Typography>
                        {category.entries.map((entry) => (
                            <NavigationMenuItem {...entry} key={entry.identifier}/>
                        ))}
                    </div>
                ))
            )}
        </Drawer>
    );
}
