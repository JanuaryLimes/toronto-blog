import { useState, useEffect } from 'react';
import axios from 'axios';

function useGet({ path, onSuccess }) {
  //const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useGet fetch');
    if (path) {
      setIsLoading(true);
      axios
        .get(path)
        .then(response => {
          console.log('useGet success', response.data);
          if (onSuccess) {
            onSuccess(response.data);
          }
        })
        .catch(error => {
          console.log('useGet error', error);
          setError('useGet error', error);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [onSuccess, path]);

  return { isLoading, error };
}

function usePost({ path, body, onSuccess }) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (path && body) {
      setIsLoading(true);
      console.log('usePost fetch');
      axios
        .post(path, body)
        .then(response => {
          console.log('usePost success', response.data);
          setData(response.data);
          setError(undefined);
          if (onSuccess) {
            onSuccess(response.data);
          }
        })
        .catch(error => {
          console.log('usePost error', error, error.response);
          setData(undefined);
          if (error.response) {
            var errorData = error.response.data;
            if (errorData) {
              setError(
                errorData.error || errorData.message || 'error: no message'
              );
            } else {
              setError('error: no error data');
            }
          } else {
            setError('error: no error response');
          }
        })
        .then(() => {
          setIsLoading(false);
        });
    } else {
      setData(undefined);
    }
  }, [body, onSuccess, path]);

  return { data, isLoading, error };
}

export { useGet, usePost };