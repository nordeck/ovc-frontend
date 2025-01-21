'use client'

import navigation from '../../../lib/opendesk/navigation.json';
import {Button, Link} from "@mui/material";
import Image from "next/image";
import menuIcon from '../../../../public/icons/opendesk-menu.svg';
import domainIcon from '../../../../public/icons/opendesk-domain.svg';
import NavigationMenuItem from "@/components/opendesk/NavigationTopBar/NavigationMenuItem";
import React, { useState } from "react";
import {useAuth} from "@/contexts/Auth/AuthProvider";
import {CategoryEntry} from "@/lib/opendesk/types";


export default function NavigationTopBar() {

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user: isAuth,
        clientEnv: {
            //NEXT_PUBLIC_ICS_DOMAIN,
            //NEXT_PUBLIC_PORTAL_DOMAIN,
        },
    } = useAuth();

    //const ICS_DOMAIN: string = NEXT_PUBLIC_ICS_DOMAIN;          //"https://ics.nightly.opendesk.qa"
    //const PORTAL_DOMAIN: string = NEXT_PUBLIC_PORTAL_DOMAIN;    //"https://portal.nightly.opendesk.qa"

    const [ menuOpen, setMenuOpen ] = useState(false);

    const menuDisplayClass: string = menuOpen ? 'block' : 'hidden';

    const portal_link : string  = '';

    /*

    let ics_link : string = '';

    async function read_portal_link() {
        try {
            const url = PORTAL_DOMAIN + "/static/url-portal";
            const res = await fetch(url);
            portal_link = await res.text();
        } catch (error) {
            console.log('PORTAL URL could not be loaded. Error: ' + error);
        }
    }

    async function read_ics_link() {
        try {
            const url = ICS_DOMAIN + "/static/url-ics";
            const res = await fetch(url);
            ics_link = await res.text();
        } catch (error) {
            console.log('ICS URL could not be loaded. Error: ' + error);
        }
    }

    read_ics_link();
    read_portal_link();

    */

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <div id='opendeskTopbar' className={'gap-3.5 h-16 flex items-center bg-white'}>
            <Link className={'ml-4'} href={`${portal_link}`} target="_blank" aria-label='Show portal'>
                <Image src={domainIcon} alt={'OpenDesk'} className={'w-20 mx-4 my-2'} width={82} height={200} loading={"lazy"}/>
            </Link>
            <Button id={"opendeskMenuButton"} tabIndex={0} onClick={toggleMenu}
                    aria-label={"Toogle menu"} className={"bg-none border-none"}
                    data-collapse-toggle="opendeskMenu"
            >
                <Image src={menuIcon} alt={'openDesk menu'} className={'align-center'} loading={"lazy"}/>
                <div id="opendeskMenu"
                     className={`absolute top-12 left-2 z-10 p-2 bg-white text-slate-900 rounded border-slate-300 shadow-lg text-left ${menuDisplayClass}`}
                >
                    { navigation.categories.map((category, key) => {
                        return (
                            <div className="text-base font-bold tracking-wider pt-4 pr-16 pb-1 pl-2" key={key}>
                                {category.display_name}
                            </div>
                        )})
                    }

                    { navigation.categories?.[0].entries.map((categoryEntry, key) => {
                        return(
                            <NavigationMenuItem { ...categoryEntry as CategoryEntry } key={key}/>
                            )
                        })
                    }
                </div>
            </Button>
        </div>
    )
}