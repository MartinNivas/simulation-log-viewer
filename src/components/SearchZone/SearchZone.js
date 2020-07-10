
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState } from 'react';

// import {Button} from 'primereact/button';

import { AutoComplete } from 'primereact/autocomplete';
import {ProgressBar} from 'primereact/progressbar';

const SearchZone = (props) => {
    const [logData] = useState(props.logData);
    
    const [filteredScenarioId, setFilteredScenarioId] = useState([]);
    const [selectedScnearioId, setSelectedScenarioId] = useState(null);
    const [filteredCarBuild, setFilteredCarBuild] = useState([]);
    const [selectedCarBuild, setSelectedCarBuild] = useState(null);
    // const [btnDisable, setBtnDisable] = useState(true);
    // const [searchOutputDisplay, setSearchOutputDisplay] = useState(false);


  const filterScenarioId = (event) => {
    setTimeout(() => {
        let results = logData.filter((data) => {
            if(typeof selectedCarBuild === 'object' && selectedCarBuild !== null ) {
              if(data.simulationRuns.carBuild === selectedCarBuild.simulationRuns.carBuild) {
                return data.simulationRuns.scenarioId.toLowerCase().startsWith(event.query.toLowerCase());
              } else {
                return false;
              }
            } else {
              return data.simulationRuns.scenarioId.toLowerCase().startsWith(event.query.toLowerCase());
            }
        });
        // (typeof results === 'object' && results !== null) ? setBtnDisable(false) : setBtnDisable(true);
        setFilteredScenarioId(results);
    }, 250);
}

const filterCarBuild = (event) => {
  setTimeout(() => {
    let flags = {};
      let results = logData.filter((data) => {
        if(typeof selectedScnearioId === 'object' && selectedScnearioId !== null ) {
          if(data.simulationRuns.scenarioId === selectedScnearioId.simulationRuns.scenarioId) {
            if (flags[data.simulationRuns.carBuild]) {
              return false;
            }
            flags[data.simulationRuns.carBuild] = true;
            return data.simulationRuns.carBuild.toLowerCase().startsWith(event.query.toLowerCase());
          } else {
            return false;
          }
        } else {
          if (flags[data.simulationRuns.carBuild]) {
            return false;
          }
          flags[data.simulationRuns.carBuild] = true;
          return data.simulationRuns.carBuild.toLowerCase().startsWith(event.query.toLowerCase());
        }
      });
    //   (typeof results === 'object' && results !== null) ? setBtnDisable(false) : setBtnDisable(true);
      setFilteredCarBuild(results);
  }, 250);
}

function calculatePercent (val, total) {
  return Math.floor(100 - ((val/total) * 100));
}

const searchTableData = () => {
  let stops = 'NA';
  let time = 'NA';
  let collision = 'NA';
  let pass = 'NA';

  let dataToCheck = null; // for single object result only

  if(typeof selectedCarBuild == 'undefined' || selectedCarBuild == null || selectedCarBuild === '') {
    if(typeof selectedScnearioId === 'object' && selectedScnearioId !== null ) {
      dataToCheck = selectedScnearioId;
    }
  }

  if(typeof selectedCarBuild === 'object' && selectedCarBuild !== null ) {
    let results = logData.filter((data) => {
        return data.simulationRuns.carBuild.toLowerCase().match(selectedCarBuild.simulationRuns.carBuild.toLowerCase());
    });
    console.log(results);
    if(results.length > 1) {
      let s = 0; 
      let c = 0; 
      let t = 0; 
      let p = 0;

      results.forEach((item, index, arr) => {
        if(item.simulationRuns.result.numberOfStops > item.scenarios.maxNumberOfStops) {
          s++;
        }

        if(item.simulationRuns.result.hasCollision) {
          c++;
        }
        
        let startTime = new Date(item.simulationRuns.startTime).getTime();
        let endTime = new Date(item.simulationRuns.endTime).getTime();
        let utilizedTime = +endTime - +startTime;

        if(+utilizedTime > item.scenarios.maxRunningTime) {
          t++;
        }

        if(item.simulationRuns.result.hasCollision) {
          p++;
        } else if(item.simulationRuns.result.numberOfStops > item.scenarios.maxNumberOfStops) {
          p++;
        } else if(+utilizedTime > item.scenarios.maxRunningTime) {
          p++;
        }

      });

      stops = calculatePercent(s, results.length);
      collision = calculatePercent(c, results.length);
      time = calculatePercent(t, results.length);
      pass = calculatePercent(p, results.length);

    } else {
      if(typeof selectedCarBuild === 'object' && selectedCarBuild !== null ) {
        dataToCheck = selectedCarBuild; 
      }
    }
  }

  if(typeof dataToCheck === 'object' && dataToCheck !== null ) {
    if(dataToCheck.simulationRuns.result.numberOfStops > dataToCheck.scenarios.maxNumberOfStops) {
      stops = 100;
    } else {
      stops = 0;
    }

    if(dataToCheck.simulationRuns.result.hasCollision) {
      collision = 100;
    } else {
      collision = 0;
    }

    const startTime = new Date(dataToCheck.simulationRuns.startTime).getTime();
    const endTime = new Date(dataToCheck.simulationRuns.endTime).getTime();
    const utilizedTime = +endTime - +startTime;

    if(+utilizedTime > dataToCheck.scenarios.maxRunningTime) {
      time = 100;
    } else {
      time = 0;
    }

    if(dataToCheck.simulationRuns.result.hasCollision) {
      pass = 100;
    } else if(dataToCheck.simulationRuns.result.numberOfStops > dataToCheck.scenarios.maxNumberOfStops) {
      pass = 100;
    } else if(+utilizedTime > dataToCheck.scenarios.maxRunningTime) {
      pass = 100;
    } else {
      pass = 0;
    }
  }
  
  return (
    <table>
      <tr>
        <th>Percentage of runs that exceed the maximum number of stops</th>
        <th>Percentage of runs that exceed the maximum running time</th>
        <th>Percentage of runs that have a collision</th>
        <th>Percentage of runs that do not pass</th>
      </tr>
      <tr>
        <td>
          {(stops !== 'NA') ? <ProgressBar value={stops}/> : stops}
        </td>
        <td>
          {(time !== 'NA') ? <ProgressBar value={time}/> : time}
        </td>
        <td>
          {(collision !== 'NA') ? <ProgressBar value={collision}/> : collision}
        </td>
        <td>
          {(pass !== 'NA') ? <ProgressBar value={pass}/> : pass}
        </td>
        
      </tr>
    </table>
  );
}

// function searchModule (e) {
  
//   if(typeof selectedScnearioId === 'object' && selectedScnearioId !== null) {
//     setSearchOutputDisplay(true)
//   }
//   if(typeof selectedCarBuild === 'object' && selectedCarBuild !== null) {
//     setSearchOutputDisplay(true)
//   }

// }

    return (
        <React.Fragment>
            <div className="nu-mt">
                <AutoComplete value={selectedScnearioId} suggestions={filteredScenarioId} completeMethod={filterScenarioId} field="simulationRuns.scenarioId" size={30} placeholder="Enter Scenarioid ... Hint: type 's'" minLength={1} onChange={(e) => setSelectedScenarioId(e.value)} className="nu-ac"/>
                <AutoComplete value={selectedCarBuild} suggestions={filteredCarBuild} completeMethod={filterCarBuild} field="simulationRuns.carBuild" size={30} placeholder="Enter Car build ... Hint: type 'c'" minLength={1} onChange={(e) => setSelectedCarBuild(e.value)}  className="nu-ac"/>
                {/* <Button label="Search" className="p-button-raised p-button-rounded p-button-success" icon="pi pi-search" onClick={(e) => searchModule(e)} disabled={btnDisable} /> */}
            </div> <br />
            {/* {searchOutputDisplay && 
            <React.Fragment> */}
                {searchTableData()}
            {/* </React.Fragment>} */}
        </React.Fragment>
    );
}

export default SearchZone;