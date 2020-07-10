import React, { lazy, Suspense } from 'react';

const LazySearchZone = lazy(() => import('./SearchZone'));

const SearchZone = props => (
  <Suspense fallback={null}>
    <LazySearchZone {...props} />
  </Suspense>
);

export default SearchZone;
