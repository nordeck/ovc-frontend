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

import {Link} from "@mui/material";
import {CategoryEntry} from "@/components/opendesk/NavigationTopBar/types";

export default function NavigationMenuItem ({ icon_url, display_name, link, target } : CategoryEntry) {
    return (
        <Link
            href={link}
            target={target}
            underline="none"
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1B1D22',
                '&:hover, &:focus': {
                    backgroundColor: 'rgba(54, 104, 129, 0.04)',
                },
                '&:active': {
                    backgroundColor: 'rgba(5, 38, 87, 0.06)',
                },
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element -- remote icons are served from arbitrary portal domains */}
            <img
                src={icon_url}
                alt=""
                aria-hidden
                width={24}
                height={24}
                style={{
                    // Explicit display/size/flexShrink so the box stays a fixed 24x24 square even if the
                    // image fails to load.
                    display: 'block',
                    width: '24px',
                    height: '24px',
                    flexShrink: 0,
                    objectFit: 'contain',
                    borderRadius: '4px',
                    border: '1px solid rgba(5, 38, 87, 0.06)',
                    backgroundColor: '#fff',
                }}
            />
            {display_name}
        </Link>
    )
};
