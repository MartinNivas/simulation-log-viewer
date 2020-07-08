import React, { lazy, Suspense } from 'react';

const LazySearchSection = lazy(() => import('./SearchSection'));

const SearchSection = props => (
  <Suspense fallback={null}>
    <LazySearchSection {...props} />
  </Suspense>
);

export default SearchSection;
