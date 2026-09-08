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

import {useEffect, useState} from "react";
import {Navigation} from "@/components/opendesk/NavigationTopBar/types";

interface NavigationState {
    data: Navigation;
    error?: Error;
    isLoading: boolean;
}

const empty: Navigation = {};

export default function useGetNavigation(icsDomain: string): NavigationState {

    const [ icsUrl, setIcsUrl ] = useState("");
    const [ data, setData ] = useState<Navigation>(empty);
    const [ error, setError ] = useState<Error>();
    const [ isLoading, setIsLoading ] = useState(true);

    // Get the browser language.
    let lang = navigator.language || "de-DE";
    if (lang === "de") lang = "de-DE";
    if (lang === "en") lang = "en-US";

    useEffect(() => {
        const url = icsDomain + "/static/url-ics";
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to resolve the ICS url: ${response.status}`);
                return response.text();
            })
            .then(text => setIcsUrl(text))
            .catch(error => setError(error));
    }, [icsDomain]);

    useEffect(() => {
        if (!icsUrl) return;

        setIsLoading(true);
        setError(undefined);

        const url = `${icsUrl}/navigation.json?language=${lang}`;
        fetch(url, {
            credentials: "include",
            headers: {Accept: "application/json"},
        })
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load navigation.json: ${response.status}`);
                return response.json();
            })
            .then(response => setData(response))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
    }, [icsUrl, lang]);

    return {data, error, isLoading};
}
