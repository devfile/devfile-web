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
import { fetchDevfiles } from '../../functions';
import type { Devfile, Registry } from '../../functions';

interface State {
  devfiles?: Devfile[];
  error?: Error;
}

interface Cache {
  devfiles?: Devfile[];
}

// discriminated union type
type Action =
  | { type: 'loading' }
  | { type: 'fetched'; payload: Devfile[] }
  | { type: 'error'; payload: Error };

export function useFetchDevfiles(devfileRegistries: Registry[]): State {
  const cache = useRef<Cache>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State = {
    devfiles: undefined,
    error: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, devfiles: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    cancelRequest.current = false;

    const fetchData = async (): Promise<void> => {
      dispatch({ type: 'loading' });

      // If the cache exists, return it
      if (cache.current.devfiles) {
        dispatch({ type: 'fetched', payload: cache.current.devfiles });
        return;
      }

      try {
        const devfiles = await fetchDevfiles(devfileRegistries);
        cache.current.devfiles = devfiles;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: devfiles });
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
  }, []);

  return state;
}

export default useFetchDevfiles;
