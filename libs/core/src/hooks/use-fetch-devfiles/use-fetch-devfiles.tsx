import { useEffect, useReducer, useRef } from 'react';
import { fetchDevfiles } from '../../functions';
import type { Devfile, DevfileRegistry } from '../../functions';

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

export function useFetchDevfiles(devfileRegistries: DevfileRegistry[]): State {
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
