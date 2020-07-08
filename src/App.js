import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React from 'react';
import './App.css';
import Simulator from './components/Simulator/Simulator.lazy';

function App() {
  return (
    <div className="App">
      <Simulator />
    </div>
  );
}

export default App;
