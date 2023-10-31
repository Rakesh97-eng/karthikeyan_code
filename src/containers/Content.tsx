import React from 'react';
import { ContentRouter } from '../router/ContentRouter';

const Content = () => {
  return (
    <main>
      <ContentRouter />
    </main>
  );
};

export default React.memo(Content);
