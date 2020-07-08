import React, { useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

const TableView = (props) => {
    const [logData] = useState(props.logData);
    const [selectedLogData, setSelectedLogData] = useState(null);

    const renderHeader = () => {
        return (
            <div>
                <img src="../../nuslv.jpg" alt="Simulation Log Viewer" className="App-logo" width="50" height="50" />
                <h2>Simulation Log Viewer</h2>
            </div>
        );
    };

    const header = renderHeader();
  
    const millisToMinAndSec = (millis) => {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    let utilizedTime;

    const runningTime = (rowData) => {
      const startTime = new Date(rowData.simulationRuns.startTime).getTime();
      const endTime = new Date(rowData.simulationRuns.endTime).getTime();
      utilizedTime = +endTime - +startTime;
      let dataToDisplay = `${millisToMinAndSec(utilizedTime)} / ${rowData.scenarios.maxRunningTime}`;
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
      let dataToDisplay = 'No';
      let iconName = "pi pi-times";
      let iconColor = {'color': 'red'};
      if(rowData.simulationRuns.result.hasCollision) {
        dataToDisplay = 'Yes';
        iconName = "pi pi-check";
        iconColor = {'color': 'green'};
      }
      return ( 
        <React.Fragment>
           <p><i className={iconName} style={iconColor} title = {dataToDisplay} ></i></p>
        </React.Fragment>
      );
    }

    const scenarioStatus = (rowData) => {
     
      let dataToDisplay = "Yes";
      let iconName = "pi pi-check";
      let iconColor = {'color': 'green'};
      
      if(rowData.simulationRuns.result.hasCollision) {
        dataToDisplay = 'No';
      } else if(rowData.simulationRuns.result.numberOfStops > rowData.scenarios.maxNumberOfStops) {
        dataToDisplay = 'No';
      } else if(+utilizedTime > rowData.scenarios.maxRunningTime) {
        dataToDisplay = 'No';
      }

      if (dataToDisplay === 'No') {
        iconName = "pi pi-times";
        iconColor = {'color': 'red'};
      }
      
      return (
          <React.Fragment>
             <p title={dataToDisplay}><i className={iconName} style={iconColor}></i></p>
          </React.Fragment>
      );
  };

    return (
        <DataTable 
            value={logData}                     
            header={header} 
            responsive 
            className="p-datatable-customers" 
            dataKey="simulationRuns.scenarioId" 
            rowHover 
            selection={selectedLogData} 
            onSelectionChange={e => setSelectedLogData(e.value)}
            paginator 
            rows={10} 
            emptyMessage="No records found" 
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"                                                             
            rowsPerPageOptions={[10,25,50]}>
            <Column field="simulationRuns.scenarioId" header="scenarioid" sortable filter filterMatchMode="contains" filterPlaceholder="Search by scneario id" />
            <Column field="simulationRuns.carBuild" header="carBuild" sortable  filter filterMatchMode="contains" filterPlaceholder="Search by car build" />
            <Column field="simulationRuns.startTime" header="startTime" sortable />
            <Column field="scenarios.maxRunningTime" header="runningTime / maxRunningTime" body={runningTime} />
            <Column field="simulationRuns.result.numberOfStops" header="numberOfStops / maxNumberOfStops"  body={noOfStops} />
            <Column field="simulationRuns.result.hasCollision" header="hasCollision" body={collisionStatus} sortable />
            <Column field="simulationRuns.result.hasCollision" header="doesScenarioPass" body={scenarioStatus} sortable />
        </DataTable>
    );
}

export default TableView;