import React, { lazy, Suspense } from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';

const LazySimulator = lazy(() => import('./Simulator'));

const Simulator = props => (
  <Suspense fallback={<ProgressSpinner />}>
    <LazySimulator {...props} />
  </Suspense>
);

export default Simulator;
