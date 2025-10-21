import axios from 'axios';
import { useEffect, useState } from 'react';

const local = 'http://localhost:3000';

export const useFetch = ({ path }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const url = `${local}/${path}`;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setErr(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return [data, isLoading, err];
};
