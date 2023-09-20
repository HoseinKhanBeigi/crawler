import React from 'react';
import Link from '../../Link';

export default function LinkToProfile(args) {
  const levantId = typeof args === 'object' ? args?.levantId : args; // link to profile can use as a normal function or React component :)
  return (
    <Link
      to={`/lead/${levantId}`}
      onClick={e => {
        e.stopPropagation();
      }}
      target
    >
      {levantId}
    </Link>
  );
}
