
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState } from 'react';

import { AutoComplete } from 'primereact/autocomplete';
import { ProgressBar } from 'primereact/progressbar';

import ListGridView from '../ListGridView/ListGridView';

import Utils from '../../utils/Utils.js';
import constants from '../../locales/constants';

const utils = new Utils();
const _CONSTANTS = constants.SEARCH;

const SearchZone = (props) => {
  const [logData] = useState(props.logData);
  const [filteredScenarioId, setFilteredScenarioId] = useState([]);
  const [selectedScnearioId, setSelectedScenarioId] = useState(null);
  const [filteredCarBuild, setFilteredCarBuild] = useState([]);
  const [selectedCarBuild, setSelectedCarBuild] = useState(null);

  const filterScenarioId = (event) => {
    setTimeout(() => {
      let results = logData.simulationRuns.filter(data => {
        if (typeof selectedCarBuild === 'object' && selectedCarBuild !== null) {
          if (data.carBuild === selectedCarBuild.carBuild) {
            return data.scenarioId.toLowerCase().startsWith(event.query.toLowerCase());
          } else {
            return false;
          }
        } else {
          return data.scenarioId.toLowerCase().startsWith(event.query.toLowerCase());
        }
      });
      setFilteredScenarioId(results); // set state
    }, 250);
  }

  const filterCarBuild = (event) => {
    setTimeout(() => {
      let flags = {};
      let results = logData.simulationRuns.filter(data => {
        if (typeof selectedScnearioId === 'object' && selectedScnearioId !== null) {
          if (data.scenarioId === selectedScnearioId.scenarioId) {
            if (flags[data.carBuild]) {
              return false;
            }
            flags[data.carBuild] = true;
            return data.carBuild.toLowerCase().startsWith(event.query.toLowerCase());
          } else {
            return false;
          }
        } else {
          if (flags[data.carBuild]) {
            return false;
          }
          flags[data.carBuild] = true;
          return data.carBuild.toLowerCase().startsWith(event.query.toLowerCase());
        }
      });
      setFilteredCarBuild(results);
    }, 250);
  }

  const getScenarios = (rowData) => {
    let results = logData.scenarios.filter((data) => {
      return data.scenarioId.toLowerCase().match(rowData.scenarioId.toLowerCase());
    });
    return results;
  }

  const displayTableData = () => {
    let stops = _CONSTANTS.NOT_APPLICABLE;
    let time = _CONSTANTS.NOT_APPLICABLE;
    let collision = _CONSTANTS.NOT_APPLICABLE;
    let pass = _CONSTANTS.NOT_APPLICABLE;

    let dataToCheck = null; // for single object result only

    if (typeof selectedCarBuild == 'undefined' || selectedCarBuild == null || selectedCarBuild === '') {
      if (typeof selectedScnearioId === 'object' && selectedScnearioId !== null) {
        dataToCheck = selectedScnearioId;
      }
    }

    if (typeof selectedCarBuild === 'object' && selectedCarBuild !== null) {
      let results = logData.simulationRuns.filter((data) => {
        return data.carBuild.toLowerCase().match(selectedCarBuild.carBuild.toLowerCase());
      });

      if (results.length > 1) {
        let s = 0;
        let c = 0;
        let t = 0;
        let p = 0;

        results.forEach((item, index, arr) => {

          const sceData = getScenarios(item); // to get relevant scenario data

          if (item.result.numberOfStops > sceData[0].maxNumberOfStops) {
            s++;
          }

          if (item.result.hasCollision) {
            c++;
          }

          let startTime = new Date(item.startTime).getTime();
          let endTime = new Date(item.endTime).getTime();
          let utilizedTime = +endTime - +startTime;

          if (utils.millisToMinAndSec(+utilizedTime) > sceData[0].maxRunningTime) {
            t++;
          }

          if (item.result.hasCollision) {
            p++;
          } else if (item.result.numberOfStops > sceData[0].maxNumberOfStops) {
            p++;
          } else if (utils.millisToMinAndSec(+utilizedTime) > sceData[0].maxRunningTime) {
            p++;
          } else {
            // do something 
          }

        });

        stops = utils.calculatePercentage(s, results.length);
        collision = utils.calculatePercentage(c, results.length);
        time = utils.calculatePercentage(t, results.length);
        pass = utils.calculatePercentage(p, results.length);

      } else {
        if (typeof selectedCarBuild === 'object' && selectedCarBuild !== null) {
          dataToCheck = selectedCarBuild;
        }
      }
    }

    if (typeof dataToCheck === 'object' && dataToCheck !== null) {
      const sceData = getScenarios(dataToCheck); // to get relevant scenario data
      if (dataToCheck.result.numberOfStops > sceData[0].maxNumberOfStops) {
        stops = _CONSTANTS.MAX_PERCENTAGE;
      } else {
        stops = _CONSTANTS.MIN_PERCENTAGE;
      }

      if (dataToCheck.result.hasCollision) {
        collision = _CONSTANTS.MAX_PERCENTAGE;
      } else {
        collision = _CONSTANTS.MIN_PERCENTAGE;
      }

      const startTime = new Date(dataToCheck.startTime).getTime();
      const endTime = new Date(dataToCheck.endTime).getTime();
      const utilizedTime = +endTime - +startTime;

      if (utils.millisToMinAndSec(+utilizedTime) > sceData[0].maxRunningTime) {
        time = _CONSTANTS.MAX_PERCENTAGE;
      } else {
        time = _CONSTANTS.MIN_PERCENTAGE;
      }

      if (dataToCheck.result.hasCollision) {
        pass = _CONSTANTS.MAX_PERCENTAGE;
      } else if (dataToCheck.result.numberOfStops > sceData[0].maxNumberOfStops) {
        pass = _CONSTANTS.MAX_PERCENTAGE;
      } else if (+utilizedTime > sceData[0].maxRunningTime) {
        pass = _CONSTANTS.MAX_PERCENTAGE;
      } else {
        pass = _CONSTANTS.MIN_PERCENTAGE;
      }
    }

    const tableData = [
      {
        tableheader: _CONSTANTS.TABLE.HEADER.ONE,
        tablebody: (stops !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={stops} /> : stops
      },
      {
        tableheader: _CONSTANTS.TABLE.HEADER.TWO,
        tablebody: (time !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={time} /> : time
      },
      {
        tableheader: _CONSTANTS.TABLE.HEADER.THREE,
        tablebody: (collision !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={collision} /> : collision
      },
      {
        tableheader: _CONSTANTS.TABLE.HEADER.FOUR,
        tablebody: (pass !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={pass} /> : pass
      }
    ];

    return (
      <ListGridView tableData={tableData} />
    );
  }

  return (
    <React.Fragment>
      <div className="nu-mt">
        <AutoComplete value={selectedScnearioId} suggestions={filteredScenarioId} completeMethod={filterScenarioId} field="scenarioId" size={30} placeholder={_CONSTANTS.SCENARIOID_PLACEHOLDER} minLength={1} onChange={(e) => setSelectedScenarioId(e.value)} className="nu-ac" />
        <AutoComplete value={selectedCarBuild} suggestions={filteredCarBuild} completeMethod={filterCarBuild} field="carBuild" size={30} placeholder={_CONSTANTS.CARBUILD_PLACEHOLDER} minLength={1} onChange={(e) => setSelectedCarBuild(e.value)} className="nu-ac" />
      </div> <br />
      {displayTableData()}
    </React.Fragment>
  );
}

export default SearchZone;