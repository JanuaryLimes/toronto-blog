import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function onResolved({ response, setData, setError, onSuccess }) {
  setData(response.data);
  setError(undefined);
  if (onSuccess) {
    onSuccess(response.data);
  }
}

function onException({ error, setData, setError, onError }) {
  let errorMessage = '';
  setData(undefined);

  if (error.response) {
    const errorData = error.response.data;
    if (errorData) {
      errorMessage =
        errorData.error || errorData.message || 'error: no message';
    } else {
      errorMessage = 'error: no error data';
    }
  } else {
    errorMessage = 'error: no error response';
  }

  setError(errorMessage);
  if (onError) {
    onError(errorMessage);
  }
}

function useBaseHttp({ methodResponse, onSuccess, onError }) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (methodResponse.isValid) {
        try {
          setIsLoading(true);
          onResolved({
            response: await methodResponse.promise,
            setData,
            setError,
            onSuccess
          });
        } catch (error) {
          onException({
            error,
            setData,
            setError,
            onError
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setData(undefined);
      }
    })();
  }, [methodResponse, onError, onSuccess]);

  return { isLoading, data, error };
}

function useGet({ path, onSuccess, onError }) {
  const canExecute = path != null;
  const methodResponse = useMemo(() => {
    if (canExecute) {
      return {
        isValid: true,
        promise: axios.get(path)
      };
    } else {
      return { isValid: false, promise: null };
    }
  }, [canExecute, path]);

  return useBaseHttp({
    methodResponse,
    onSuccess,
    onError
  });
}

function usePost({ path, body, onSuccess, onError }) {
  const canExecute = path != null && body != null;
  const methodResponse = useMemo(() => {
    if (canExecute) {
      return {
        isValid: true,
        promise: axios.post(path, body)
      };
    } else {
      return { isValid: false, promise: null };
    }
  }, [canExecute, path, body]);

  return useBaseHttp({
    methodResponse,
    onSuccess,
    onError
  });
}

export { useGet, usePost };
