import { useEffect, useRef, useState } from 'react';
import request from '../utils/request';

const searchLeadService = async params =>
  request(`leads/autoComplete?${new URLSearchParams(params).toString()}`).get({
    message: {
      error: 'خطای جستوجو سرنخ',
    },
  });

const useLeadSearch = (options = {}) => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');
  const valueRef = useRef('');
  const timer = useRef('');

  const { size = 15, page = 0, timeout = 500 } = options;

  useEffect(() => {
    if (query) {
      timer.current = setTimeout(() => {
        if (query === valueRef.current) {
          (async () => {
            try {
              const data = await searchLeadService({
                search: query,
                page,
                size,
              });
              const { content } = data;
              setResult(content);
            } catch (e) {
              return false;
            }
            return false;
          })();
        }
      }, timeout);
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [query]);

  const onSearch = input => {
    setQuery(input);
    valueRef.current = input;
  };
  return [result, onSearch, setResult];
};

export default useLeadSearch;
