import React, { Suspense, useEffect, useState } from 'react';
import CPLoading from '../../CP/CPLoading';

const ChartLoader = props => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <CPLoading spinning />
          </div>
        }
      >
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
      </Suspense>
    )
  );
};

export default ChartLoader;
