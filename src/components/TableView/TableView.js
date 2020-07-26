import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import Utils from '../../utils/Utils';
import constants from '../../locales/constants';

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

  const getScenarios = (rowData) => {
    let results = logData.scenarios.filter((data) => {
      return data.scenarioId.toLowerCase().match(rowData.scenarioId.toLowerCase());
    });
    return results;
  }

  const showStartTime = (rowData) => {
    return (
      <p>{new Date(rowData.startTime).toString()}</p>
    );
  }

  const runningTime = (rowData) => {
    const sceData = getScenarios(rowData);
    const startTime = new Date(rowData.startTime);
    const endTime = new Date(rowData.endTime);
    utilizedTime = +endTime - +startTime;
    let dataToDisplay = `${utils.millisToMinAndSec(utilizedTime)} / ${utils.convertToMinTimeFormat(sceData[0].maxRunningTime)}`; 
    return (
      <p>{dataToDisplay}</p>
    );
  }

  const noOfStops = (rowData) => {
    const sceData = getScenarios(rowData);
    let dataToDisplay = `${rowData.result.numberOfStops} / ${sceData[0].maxNumberOfStops}`; 
    return (
        <p>{dataToDisplay}</p>
    );
  }

  const collisionStatus = (rowData) => {
    let dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
    let iconName = "pi pi-times-circle";
    let iconColor = { 'color': 'red' };
    if (rowData.result.hasCollision) {
      dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.YES;
      iconName = "pi pi-check-circle";
      iconColor = { 'color': 'green' };
    }
    return (
      <React.Fragment>
        <p title={dataToDisplay}><i className={iconName} style={iconColor}></i> {dataToDisplay}</p>
      </React.Fragment>
    );
  }

  const scenarioTemplate = (dataToDisplay) => {
    let iconName = "pi pi-check-circle";
    let iconColor = { 'color': 'green' };

    if (dataToDisplay === _CONSTANTS.BOOLEAN_VALUE.NO) {
      iconName = "pi pi-times-circle";
      iconColor = { 'color': 'red' };
    }

    return (
      <React.Fragment>
        <p title={dataToDisplay}><i className={iconName} style={iconColor}></i> {dataToDisplay}</p>
      </React.Fragment>
    );
  }


  const scenarioStatus = (rowData) => {
    const sceData = getScenarios(rowData);

    let dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.YES;
    let iconName = "pi pi-check-circle";
    let iconColor = { 'color': 'green' };
    if (rowData.result.hasCollision) {
      dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
    } else if (rowData.result.numberOfStops > sceData[0].maxNumberOfStops) { 
      dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
    } else if (utils.millisToMin(utilizedTime) > sceData[0].maxRunningTime) { 
      dataToDisplay = _CONSTANTS.BOOLEAN_VALUE.NO;
    } else {
      // else block added to remove SonarQube Lint issue 
    }

    if (dataToDisplay === _CONSTANTS.BOOLEAN_VALUE.NO) {
      iconName = "pi pi-times-circle";
      iconColor = { 'color': 'red' };
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
        itemTemplate={scenarioTemplate} showClear={true} placeholder="Select a Status" className="p-column-filter" />
    );
  };

  const onStatusFilterChange = (event) => {
    console.log(event.value)
    let cmpVal = false;
    if (event.value === _CONSTANTS.BOOLEAN_VALUE.YES) { cmpVal = true; }

    dt.current.filter(cmpVal, cmpVal, 'equals');
    setSelectedStatus(event.value);
  };

  const statusFilter = renderStatusFilter();

  return (
    <DataTable
      value={logData.simulationRuns}
      ref={dt}
      responsive
      dataKey="scenarioId"
      rowHover
      selection={selectedLogData}
      onSelectionChange={e => setSelectedLogData(e.value)}
      paginator
      rows={10}
      emptyMessage={_CONSTANTS.TABLE.EMPTY_MSG}
      currentPageReportTemplate={_CONSTANTS.TABLE.PAGE_REPORT}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[10, 25, 50]}>

      <Column field="scenarioId" header={_CONSTANTS.TABLE.HEADER.ONE} sortable filter filterMatchMode="contains" filterPlaceholder={_CONSTANTS.TABLE.FILTER_PLACEHOLDER.SCENARIO} />
      <Column field="carBuild" header={_CONSTANTS.TABLE.HEADER.TWO} sortable filter filterMatchMode="contains" filterPlaceholder={_CONSTANTS.TABLE.FILTER_PLACEHOLDER.CARBUILD} />
      <Column field="startTime" header={_CONSTANTS.TABLE.HEADER.THREE} body={showStartTime} />
      <Column field="endTime" header={_CONSTANTS.TABLE.HEADER.FOUR} body={runningTime} />
      <Column field="result.numberOfStops" header={_CONSTANTS.TABLE.HEADER.FIVE} body={noOfStops} />
      <Column field="result.hasCollision" header={_CONSTANTS.TABLE.HEADER.SIX} body={collisionStatus} sortable />
      <Column header={_CONSTANTS.TABLE.HEADER.SEVEN} body={scenarioStatus} />
    </DataTable>
  );
}

export default TableView;