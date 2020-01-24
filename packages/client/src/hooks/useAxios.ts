import { useState, useEffect, useMemo } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RestCallWithBodyProps, RestCallProps } from '../types';

type MethodResponse = {
  isValid: boolean;
  promise: Promise<AxiosResponse<any>> | null;
};

type BaseHttpProps = {
  methodResponse: MethodResponse;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

type CallbackProps = {
  setData: React.Dispatch<any>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

type ResolvedProps = CallbackProps & {
  response: any;
  onSuccess?: (data: any) => void;
};

type ExceptionProps = CallbackProps & {
  error: any;
  onError?: (error: any) => void;
};

function onResolved({ response, setData, setError, onSuccess }: ResolvedProps) {
  setData(response.data);
  setError(undefined);
  if (onSuccess) {
    onSuccess(response.data);
  }
}

function onException({ error, setData, setError, onError }: ExceptionProps) {
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

function useBaseHttp({ methodResponse, onSuccess, onError }: BaseHttpProps) {
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      if (methodResponse.isValid) {
        try {
          setIsLoading(true);
          const response = await methodResponse.promise;
          if (!isCancelled) {
            onResolved({
              response,
              setData,
              setError,
              onSuccess
            });
          }
        } catch (error) {
          if (!isCancelled) {
            onException({
              error,
              setData,
              setError,
              onError
            });
          }
        } finally {
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      } else {
        setData(undefined);
      }
    })();

    return function cleanUp() {
      isCancelled = true;
    };
  }, [methodResponse, onError, onSuccess]);

  return { isLoading, data, error };
}

function useGet({ path, onSuccess, onError }: RestCallProps) {
  const canExecute = path != null;
  const methodResponse: MethodResponse = useMemo(() => {
    if (canExecute && path != null) {
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

function usePost({ path, body, onSuccess, onError }: RestCallWithBodyProps) {
  const canExecute = path != null && body != null;
  const methodResponse: MethodResponse = useMemo(() => {
    if (canExecute && path != null) {
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

function usePut({ path, body, onSuccess, onError }: RestCallWithBodyProps) {
  const canExecute = path != null && body != null;
  const methodResponse: MethodResponse = useMemo(() => {
    if (canExecute && path != null) {
      return {
        isValid: true,
        promise: axios.put(path, body)
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

function useDelete({ path, onSuccess, onError }: RestCallProps) {
  const canExecute = path != null;
  const methodResponse: MethodResponse = useMemo(() => {
    if (canExecute && path != null) {
      return {
        isValid: true,
        promise: axios.delete(path)
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

export { useGet, usePost, usePut, useDelete };
