import { useState, useEffect } from 'react';
import axios from 'axios';

function onFulfilled({ response, setData, setError, onSuccess }) {
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

function useAxiosProps() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  //todo fix

  return { data, setData, error, setError, isLoading, setIsLoading };
}

function useGet({ path, onSuccess, onError }) {
  const props = useAxiosProps();

  useEffect(() => {
    (async () => {
      if (path) {
        try {
          props.setIsLoading(true);
          onFulfilled({
            response: await axios.get(path),
            setData: props.setData,
            setError: props.setError,
            onSuccess
          });
        } catch (error) {
          onException({
            error,
            setData: props.setData,
            setError: props.setError,
            onError
          });
        } finally {
          props.setIsLoading(false);
        }
      } else {
        props.setData(undefined);
      }
    })();
  }, [onError, onSuccess, path, props]);

  return { isLoading: props.isLoading, data: props.data, error: props.error };
}

function usePost({ path, body, onSuccess, onError }) {
  const props = useAxiosProps();

  useEffect(() => {
    (async () => {
      if (path && body) {
        try {
          props.setIsLoading(true);
          onFulfilled({
            response: await axios.post(path, body),
            setData: props.setData,
            setError: props.setError,
            onSuccess
          });
        } catch (error) {
          onException({
            error,
            setData: props.setData,
            setError: props.setError,
            onError
          });
        } finally {
          props.setIsLoading(false);
        }
      } else {
        props.setData(undefined);
      }
    })();
  }, [body, onError, onSuccess, path, props]);

  return { isLoading: props.isLoading, data: props.data, error: props.error };
}

export { useGet, usePost };
