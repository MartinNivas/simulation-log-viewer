import React, { lazy, Suspense } from 'react';

const LazySimulator = lazy(() => import('./Simulator'));

const Simulator = props => (
  <Suspense fallback={null}>
    <LazySimulator {...props} />
  </Suspense>
);

export default Simulator;
