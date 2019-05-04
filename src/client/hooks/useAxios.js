import { useState, useEffect } from 'react';
import axios from 'axios';

function useGet(options) {
  const { path } = options;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useGet fetch');

    axios
      .get(path)
      .then(response => {
        console.log('useGet success', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.log('useGet error', error);
        setData([]);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [path]);

  return [data, isLoading];
}

/* function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchUrl = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);
  return [data, isLoading];
} */

export { /*useFetch,*/ useGet };
