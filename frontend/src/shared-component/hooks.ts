import { useState, useEffect } from 'react';
import { APIResponse } from '../types';

/**
 * A custom React hook to fetch data from a promise function.
 * @template T - The type of the data returned by the promise.
 * @param promiseFn - A function that returns a promise resolving to type T.
 * @param deps - The dependency array to control when the effect runs.
 * @returns An object containing data, error, and loading states.
 */
export function usePromise<T>(
  promiseFn: () => Promise<T>,
  deps: React.DependencyList = [],
): APIResponse<T> {
  const [results, setResults] = useState<APIResponse<T>>({ status: 'loading' });

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmount
    setResults({ status: 'loading' });

    promiseFn()
      .then((response) => {
        if (isMounted) {
          setResults({ status: 'success', data: response });
        }
      })
      .catch((err) => {
        if (isMounted) {
          setResults({ status: 'error', msg: err.message });
        }
      });

    return () => {
      isMounted = false; // Cleanup function
    };
  }, deps);

  return results;
}
