import React from 'react'
import {CategoryEntry} from "@/lib/opendesk/types";
import Image from "next/image";

export default function NavigationMenuItem ({ icon_url, display_name, link, target } : CategoryEntry) {
    return (
        <div className="flex align-center gap-1 p-2 text-sx">
            <Image src={icon_url} height={0} width={0} alt={display_name} style={{width: "30px", height: "30px"}}/>
            <a href={link} target={target} className={'no-underline font-normal text-slate-900 pl-1 pt-1'}>
                {display_name}
            </a>
        </div>
    )
};
