import React, { lazy, Suspense } from 'react';

const LazyTableView = lazy(() => import('./TableView'));

const TableView = props => (
  <Suspense fallback={null}>
    <LazyTableView {...props} />
  </Suspense>
);

export default TableView;
