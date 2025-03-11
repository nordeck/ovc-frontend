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

import {Dispatch, useCallback, useEffect} from "react";

interface AppEvent<PayloadType = unknown> extends Event {
    detail: PayloadType;
}

export interface CustomWindowEventMap extends WindowEventMap {
    /* Custom Event */
    onReloadHistory: AppEvent<string>;
}

export const useEvent = <PayloadType = unknown>(
    eventName: keyof CustomWindowEventMap,
    callback?: Dispatch<PayloadType> | VoidFunction
) => {
    useEffect(() => {
        if (!callback) {
            return;
        }

        const listener = ((event: AppEvent<PayloadType>) => {
            callback(event.detail); // Use `event.detail` for custom payloads
        }) as EventListener;

        window.addEventListener(eventName, listener);
        return () => {
            window.removeEventListener(eventName, listener);
        };
    }, [callback, eventName]);

    const dispatch = useCallback(
        (detail: PayloadType) => {
            const event = new CustomEvent(eventName, {detail});
            window.dispatchEvent(event);
        },
        [eventName]
    );

    // Return a function to dispatch the event
    return {dispatch};
};