import { useEffect, useState } from 'react';
import useEvent from 'react-use-event-hook';

const useAsync = <T>(asyncFunction: () => Promise<T>, immediate = true) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = useEvent(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setStatus('success');
        setValue(response);
        setError(null);
      })
      .catch((error) => {
        setStatus('error');
        setValue(null);
        setError(error);
      });
  });

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

export default useAsync;
