import React from 'react';

function Error({ error }) {
  return (
    <pre>
      {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
    </pre>
  );
}

export default Error;
