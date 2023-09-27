import { useEffect, useRef, useState } from 'react';
import request from '../utils/request';

const partyFullSearch = async params =>
  request(`party/fullsearch/all?${new URLSearchParams(params).toString()}`).get(
    {
      message: {
        error: 'خطای جستوجو کاربران',
      },
    },
  );

const usePartyFullSearch = (
  options = {
    lead: false,
    filterActives: false,
    ignoreContext: false,
    size: 10,
    page: 0,
    timeout: 500,
  },
) => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');
  const valueRef = useRef('');
  const timer = useRef('');

  const {
    lead = false,
    filterActives = false,
    ignoreContext = false,
    size = 10,
    page = 0,
    timeout = 500,
  } = options;

  useEffect(() => {
    if (query) {
      timer.current = setTimeout(() => {
        if (query === valueRef.current) {
          (async () => {
            try {
              const data = await partyFullSearch({
                query,
                page,
                size,
                ...(lead && { lead }),
                ...(filterActives && { filterActives }),
                ...(ignoreContext && { ignoreContext }),
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

export default usePartyFullSearch;
