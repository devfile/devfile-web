/**
 * Copyright 2022 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useReducer, useRef } from 'react';
// @ts-ignore No types available
import { load } from 'js-yaml';
import type { DevfileSpec } from '../../types';

interface Data {
  version: string;
  devfileSpec: DevfileSpec;
  devfileYaml: string;
}

interface State {
  data: Data[];
  error?: Error;
}

interface Cache {
  data: Data[];
}

// discriminated union type
type Action =
  | { type: 'loading' }
  | { type: 'fetched'; payload: Data[] }
  | { type: 'error'; payload: Error };

export function useFetchDevfileYamls(url: string, versions?: string[]): State {
  const cache = useRef<Cache>({ data: [] });

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State = {
    data: [],
    error: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async (): Promise<void> => {
      dispatch({ type: 'loading' });

      // If a cache exists for this url, return it
      if (cache.current.data) {
        dispatch({ type: 'fetched', payload: cache.current.data });
        return;
      }

      try {
        let data: Data[] = [];
        if (versions) {
          const responses = await Promise.all(
            versions.map((version) => fetch(`${url}/${version}`)),
          );

          responses.forEach((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
          });

          const devfileYamls = await Promise.all(responses.map((response) => response.text()));

          data = versions.map((version, index) => ({
            version,
            // No types available for js-yaml
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            devfileSpec: load(devfileYamls[index]) as DevfileSpec,
            devfileYaml: devfileYamls[index],
          }));
        }

        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    fetchData().catch(() => {});

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetchDevfileYamls;
