import React, { lazy, Suspense } from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';

const LazyTableView = lazy(() => import('./TableView'));

const TableView = props => (
  <Suspense fallback={<ProgressSpinner />}>
    <LazyTableView {...props} />
  </Suspense>
);

export default TableView;
