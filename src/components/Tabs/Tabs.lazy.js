import React, { lazy, Suspense } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const TabsSimulator = lazy(() => import('./Tabs'));

const Tabs = props => (
  <Suspense fallback={<ProgressSpinner />}>
    <TabsSimulator {...props} />
  </Suspense>
);

export default Tabs;
