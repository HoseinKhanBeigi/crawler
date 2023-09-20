import React from 'react';
import truncate from 'lodash/truncate';

export default function TruncateString(string, length = 60) {
  return (
    <span title={string?.length > length ? string : null}>
      {truncate(string, { length })}
    </span>
  );
}
