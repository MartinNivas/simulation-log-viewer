import React, { useState, useRef } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';

import Utils from '../../utils/Utils';
import constants from '../../data/constants';

const utils = new Utils(); 
const _CONSTANTS = constants.TABLE_VIEW;

const TableView = (props) => {
    const { logData } = props;
    const [selectedLogData, setSelectedLogData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    let utilizedTime;
    let dt = useRef(null);

    const statuses = [
      _CONSTANTS.BOOLEAN_VALUE.YES, _CONSTANTS.BOOLEAN_VALUE.NO
  ];

    const runningTime = (rowData) => {
      const startTime = new Date(rowData.simulationRuns.startTime).getTime();
      const endTime = new Date(rowData.simulationRuns.endTime).getTime();
      utilizedTime = +endTime - +startTime;
      let dataToDisplay = `${utils.millisToMinAndSec(utilizedTime)} / ${rowData.scenarios.maxRunningTime}`;
      return ( 
        <React.Fragment>
           <p>{dataToDisplay}</p>
        </React.Fragment>
      );
    }

    const noOfStops = (rowData) => {
      let dataToDisplay = `${rowData.simulationRuns.result.numberOfStops} / ${rowData.scenarios.maxNumberOfStops}`;
      return ( 
        <React.Fragment>
           <p>{dataToDisplay}</p>
        </React.Fragment>
      );
    }

    const collisionStatus = (rowData) => {
      let dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
      let iconName = "pi pi-times-circle";
      let iconColor = {'color': 'red'};
      if(rowData.simulationRuns.result.hasCollision) {
        dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.YES;
        iconName = "pi pi-check-circle";
        iconColor = {'color': 'green'};
      }
      return ( 
        <React.Fragment>
           <p title = {dataToDisplay}><i className={iconName} style={iconColor}></i> {dataToDisplay}</p>
        </React.Fragment>
      );
    }

    const scenarioTemplate = (dataToDisplay) => {
      let iconName = "pi pi-check-circle";
      let iconColor = {'color': 'green'};

      if (dataToDisplay === _CONSTANTS.BOOLEAN_VALUE.NO) {
        iconName = "pi pi-times-circle";
        iconColor = {'color': 'red'};
      }

      return (
        <React.Fragment>
           <p title={dataToDisplay}><i className={iconName} style={iconColor}></i> {dataToDisplay}</p>
        </React.Fragment>
    );
    }

    const scenarioStatus = (rowData) => {
     
      let dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.YES;
      let iconName = "pi pi-check-circle";
      let iconColor = {'color': 'green'};
      
      if(rowData.simulationRuns.result.hasCollision) {
        dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
      } else if(rowData.simulationRuns.result.numberOfStops > rowData.scenarios.maxNumberOfStops) {
        dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
      } else if(+utilizedTime > rowData.scenarios.maxRunningTime) {
        dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
      }

      if (dataToDisplay === _CONSTANTS.BOOLEAN_VALUE.NO) {
        iconName = "pi pi-times-circle";
        iconColor = {'color': 'red'};
      }
      
      return (
          <React.Fragment>
             <p title={dataToDisplay}><i className={iconName} style={iconColor}></i> {dataToDisplay}</p>
          </React.Fragment>
      );
    };

    const renderStatusFilter = () => {
      return (
          <Dropdown value={selectedStatus} options={statuses} onChange={onStatusFilterChange}
                      itemTemplate={scenarioTemplate} showClear={true} placeholder="Select a Status" className="p-column-filter"/>
      );
    };

    const onStatusFilterChange = (event) => {
      console.log(event.value)
      let cmpVal = false;
      if(event.value === _CONSTANTS.BOOLEAN_VALUE.YES) {cmpVal = true;}
      
      dt.current.filter(cmpVal, cmpVal, 'equals');
      setSelectedStatus(event.value);
    };

    const statusFilter = renderStatusFilter();

    return (
        <DataTable 
            value={logData}  
            ref={dt}                   
            responsive 
            dataKey="simulationRuns.scenarioId" 
            rowHover 
            selection={selectedLogData} 
            onSelectionChange={e => setSelectedLogData(e.value)}
            paginator 
            rows={10} 
            emptyMessage={_CONSTANTS.TABLE.EMPTY_MSG}
            currentPageReportTemplate={_CONSTANTS.TABLE.PAGE_REPORT}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"                                                             
            rowsPerPageOptions={[10,25,50]}>
            <Column field="simulationRuns.scenarioId" header={_CONSTANTS.TABLE.HEADER.ONE} sortable filter filterMatchMode="contains" filterPlaceholder={_CONSTANTS.TABLE.FILTER_PLACEHOLDER.SCENARIO} />
            <Column field="simulationRuns.carBuild" header={_CONSTANTS.TABLE.HEADER.TWO} sortable  filter filterMatchMode="contains" filterPlaceholder={_CONSTANTS.TABLE.FILTER_PLACEHOLDER.CARBUILD} />
            <Column field="simulationRuns.startTime" header={_CONSTANTS.TABLE.HEADER.THREE} sortable />
            <Column field="scenarios.maxRunningTime" header={_CONSTANTS.TABLE.HEADER.FOUR} body={runningTime} />
            <Column field="simulationRuns.result.numberOfStops" header={_CONSTANTS.TABLE.HEADER.FIVE}  body={noOfStops} />
            <Column field="simulationRuns.result.hasCollision"  header={_CONSTANTS.TABLE.HEADER.SIX} body={collisionStatus} sortable />
            <Column header={_CONSTANTS.TABLE.HEADER.SEVEN} body={scenarioStatus} />
        </DataTable>
    );
}

export default TableView;