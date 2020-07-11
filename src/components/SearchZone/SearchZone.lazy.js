import React, { lazy, Suspense } from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';

const LazySearchZone = lazy(() => import('./SearchZone'));

const SearchZone = props => (
  <Suspense fallback={<ProgressSpinner />}>
    <LazySearchZone {...props} />
  </Suspense>
);

export default SearchZone;
