import React, { useState, useEffect} from 'react';
import './Simulator.module.css';
import {SimulatorService} from '../../service/SimulatorService';
import {TabView,TabPanel} from 'primereact/tabview';
import TableView from '../TableView/TableView.lazy';
import SearchSection from '../SearchSection/SearchSection.lazy'

const Simulator = () => {
    const [logData, setLogData] = useState([]);
    const simulatorService = new SimulatorService();

    useEffect(() => {
      simulatorService.getSimulatorLog().then(data => setLogData(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div className="datatable-doc-demo">
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


Simulator.propTypes = {};

Simulator.defaultProps = {};

export default Simulator;