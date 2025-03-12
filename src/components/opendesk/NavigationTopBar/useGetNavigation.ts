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

export default function useGetNavigation(icsDomain: string) {

    const [ icsUrl, setIcsUrl ] = useState("");
    const [ json, setJson ] = useState({});

    // Get the browser language.
    let lang = navigator.language || "de-DE";
    if (lang === "de") lang = "de-DE";
    if (lang === "en") lang = "en-US";

    useEffect(() => {
        const url = icsDomain + "/static/url-ics";
        try {
            fetch(url)
                .then(response => response.text())
                .then(text => { setIcsUrl(text) })
        }
        catch (error){
            console.log(error);
        }
    }, [lang]);

    useEffect(() => {
        const url = `${icsUrl}/navigation.json?language=${lang}`;
        try {
            fetch(url, {
                credentials: "include",
                headers: {Accept: "application/json",},
            })
                .then(response => response.json())
                .then(response => { setJson(response) })
        }
        catch (error) {
            console.log(error);
        }
    }, [lang]);

    return json;
}