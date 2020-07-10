import React, { useState, useEffect} from 'react';
import './Simulator.css';
import {SimulatorService} from '../../services/SimulatorService';
import {TabView,TabPanel} from 'primereact/tabview';
import TableView from '../TableView/TableView.lazy';
import SearchSection from '../SearchZone/SearchZone.lazy'

const Simulator = () => {
    const [logData, setLogData] = useState([]);
    const simulatorService = new SimulatorService();

    useEffect(() => {
      simulatorService.getSimulatorLog().then(data => setLogData(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const renderHeader = () => {
      return (
          <div className="p-datatable-header">
              <img src="../../nuslv.jpg" alt="Simulation Log Viewer" className="nu-applogo" />
              <h2>Simulation Log Viewer</h2>
          </div>
      );
  };
    
    return (
        <div>
            {renderHeader()}
            <TabView renderActiveOnly={false}>
                <TabPanel header="Table View" leftIcon="pi pi-calendar">
                   <TableView logData={logData} />
                </TabPanel>
                <TabPanel header="Search Zone" leftIcon="pi pi-search">
                  <SearchSection logData={logData} />
                </TabPanel>
            </TabView>
        </div>
    );
}

export default Simulator;