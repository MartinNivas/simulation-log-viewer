import React, { lazy, Suspense } from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';

const LazyHeader = lazy(() => import('./Header'));

const Header = props => (
  <Suspense fallback={<ProgressSpinner />}>
    <LazyHeader {...props} />
  </Suspense>
);

export default Header;
