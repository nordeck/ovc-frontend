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

import {IconButton, Typography, alpha, darken} from "@mui/material";
import NextLink from "next/link";
import menuLogo from '../../../../public/icons/opendesk-logo-header-with-icon.svg';
import appLogo from '../../../../public/icons/opendesk-videoconference.svg';
import NavigationMenuDrawer from "@/components/opendesk/NavigationTopBar/NavigationMenuDrawer";
import TriggerIcon from "@/components/opendesk/NavigationTopBar/TriggerIcon";
import React, { useState } from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/contexts/Auth/AuthProvider";
import {Navigation} from "@/components/opendesk/NavigationTopBar/types";
import useGetNavigation from "@/components/opendesk/NavigationTopBar/useGetNavigation";
import jsonFile from './navigation.json';
import {isVarTrue} from "@/lib/isVarTrue";
import {COLORS} from "@/utils/constants/theme.constants";
import {inter} from "@/components/opendesk/NavigationTopBar/fonts";

export default function NavigationTopBar() {

    const {t} = useTranslation();

    const {
        clientEnv: {
            NEXT_PUBLIC_ICS_DOMAIN,
            NEXT_PUBLIC_NAVIGATION_FORCE_LOCAL_JSON,
            NEXT_PUBLIC_PORTAL_DOMAIN,
            NEXT_PUBLIC_NAVIGATION_TITLE,
            NEXT_PUBLIC_NAVIGATION_LOGO_URL,
            NEXT_PUBLIC_NAVIGATION_LOGO_LINK_URL,
            NEXT_PUBLIC_NAVIGATION_MENU_LOGO_URL,
            NEXT_PUBLIC_NAVIGATION_MENU_LOGO_LINK_URL,
            NEXT_PUBLIC_NAVIGATION_MENU_LOGO_HEIGHT,
            NEXT_PUBLIC_PRIMARY_COLOR,
            NEXT_PUBLIC_NAVIGATION_BACKGROUND_COLOR,
        },
    } = useAuth();

    const primaryColor = NEXT_PUBLIC_PRIMARY_COLOR || COLORS.LILA;
    const navBackgroundColor = NEXT_PUBLIC_NAVIGATION_BACKGROUND_COLOR || COLORS.WHITE;

    const { data: loadedJson, error: navigationError, isLoading: navigationLoading } = useGetNavigation(NEXT_PUBLIC_ICS_DOMAIN);
    const navigationLocalJson = isVarTrue(NEXT_PUBLIC_NAVIGATION_FORCE_LOCAL_JSON);
    const navigation: Navigation = navigationLocalJson ? jsonFile : loadedJson;
    const isLoading = !navigationLocalJson && navigationLoading;
    const hasError = !navigationLocalJson && !!navigationError;
    const navigationIsEmpty = !isLoading && !hasError && (navigation.categories?.length ?? 0) === 0;

    const logoUrl = NEXT_PUBLIC_NAVIGATION_LOGO_URL || appLogo.src;
    const logoLinkUrl = NEXT_PUBLIC_NAVIGATION_LOGO_LINK_URL || '/';
    const menuLogoUrl = NEXT_PUBLIC_NAVIGATION_MENU_LOGO_URL || menuLogo.src;
    const menuLogoLinkUrl = NEXT_PUBLIC_NAVIGATION_MENU_LOGO_LINK_URL || NEXT_PUBLIC_PORTAL_DOMAIN;
    const menuLogoHeight = `${NEXT_PUBLIC_NAVIGATION_MENU_LOGO_HEIGHT || '32'}px`;

    const [ menuOpen, setMenuOpen ] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav id='opendeskTopbar' className={'gap-3 h-16 flex items-stretch'} style={{backgroundColor: navBackgroundColor}}>
            <IconButton
                id={"opendeskMenuButton"}
                onClick={toggleMenu}
                aria-label={t('navigation.triggerLabel', 'navigation.triggerLabel')}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                disableRipple
                className={'w-[68px] h-full'}
                sx={{
                    borderRadius: 0,
                    backgroundColor: menuOpen ? primaryColor : '#F1F5F9',
                    color: menuOpen ? COLORS.WHITE : COLORS.EERIE_BLACK,
                    '&:hover': {
                        backgroundColor: menuOpen ? darken(primaryColor, 0.15) : alpha(primaryColor, 0.55),
                        color: COLORS.WHITE,
                    },
                }}
                style={ navigationIsEmpty ? { display: 'none' } : {} }
            >
                <TriggerIcon/>
            </IconButton>
            <NextLink className={'flex self-center'} href={logoLinkUrl} aria-label={t('navigation.homeLinkLabel', 'navigation.homeLinkLabel')}>
                {/* eslint-disable-next-line @next/next/no-img-element -- logo can be overridden to an arbitrary remote URL via env config */}
                <img src={logoUrl} alt={t('navigation.logoAlt', 'navigation.logoAlt')} width={40} height={40} className={'h-10 w-10 my-1'}/>
            </NextLink>
            {NEXT_PUBLIC_NAVIGATION_TITLE &&
                <Typography
                    component="h1"
                    className={`${inter.className} self-center`}
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        lineHeight: 1.25,
                        color: '#1B1D22',
                    }}
                >
                    {NEXT_PUBLIC_NAVIGATION_TITLE}
                </Typography>
            }
            <NavigationMenuDrawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                navigation={navigation}
                isLoading={isLoading}
                error={hasError}
                logoSrc={menuLogoUrl}
                logoHeight={menuLogoHeight}
                portalLink={menuLogoLinkUrl}
                primaryColor={primaryColor}
            />
        </nav>
    )
}