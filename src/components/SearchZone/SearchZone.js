
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState } from 'react';

import { AutoComplete } from 'primereact/autocomplete';
import {ProgressBar} from 'primereact/progressbar';

import ListGridView from '../ListGridView/ListGridView';

import Utils from '../../utils/Utils.js';
import constants from '../../data/constants';

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
          setFilteredCarBuild(results);
      }, 250);
    }

    const displayTableData = () => {
      let stops = _CONSTANTS.NOT_APPLICABLE;
      let time = _CONSTANTS.NOT_APPLICABLE;
      let collision = _CONSTANTS.NOT_APPLICABLE;
      let pass = _CONSTANTS.NOT_APPLICABLE;

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

            if(utils.millisToMinAndSec(+utilizedTime) > item.scenarios.maxRunningTime) {
              t++;
            }

            if(item.simulationRuns.result.hasCollision) {
              p++;
            } else if(item.simulationRuns.result.numberOfStops > item.scenarios.maxNumberOfStops) {
              p++;
            } else if(utils.millisToMinAndSec(+utilizedTime) > item.scenarios.maxRunningTime) {
              p++;
            }

          });

          stops = utils.calculatePercentage(s, results.length);
          collision = utils.calculatePercentage(c, results.length);
          time = utils.calculatePercentage(t, results.length);
          pass = utils.calculatePercentage(p, results.length);

        } else {
          if(typeof selectedCarBuild === 'object' && selectedCarBuild !== null ) {
            dataToCheck = selectedCarBuild; 
          }
        }
      }

      if(typeof dataToCheck === 'object' && dataToCheck !== null ) {
        if(dataToCheck.simulationRuns.result.numberOfStops > dataToCheck.scenarios.maxNumberOfStops) {
          stops = _CONSTANTS.MAX_PERCENTAGE;
        } else {
          stops = _CONSTANTS.MIN_PERCENTAGE;
        }

        if(dataToCheck.simulationRuns.result.hasCollision) {
          collision = _CONSTANTS.MAX_PERCENTAGE;
        } else {
          collision = _CONSTANTS.MIN_PERCENTAGE;
        }

        const startTime = new Date(dataToCheck.simulationRuns.startTime).getTime();
        const endTime = new Date(dataToCheck.simulationRuns.endTime).getTime();
        const utilizedTime = +endTime - +startTime;
        
        if(utils.millisToMinAndSec(+utilizedTime) > dataToCheck.scenarios.maxRunningTime) {
          time = _CONSTANTS.MAX_PERCENTAGE;
        } else {
          time = _CONSTANTS.MIN_PERCENTAGE;
        }

        if(dataToCheck.simulationRuns.result.hasCollision) {
          pass = _CONSTANTS.MAX_PERCENTAGE;
        } else if(dataToCheck.simulationRuns.result.numberOfStops > dataToCheck.scenarios.maxNumberOfStops) {
          pass = _CONSTANTS.MAX_PERCENTAGE;
        } else if(+utilizedTime > dataToCheck.scenarios.maxRunningTime) {
          pass = _CONSTANTS.MAX_PERCENTAGE;
        } else {
          pass = _CONSTANTS.MIN_PERCENTAGE;
        }
      }

      const tableData = [
        {
          tableheader: _CONSTANTS.TABLE.HEADER.ONE,
          tablebody: (stops !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={stops}/> : stops
        },
        {
          tableheader: _CONSTANTS.TABLE.HEADER.TWO,
          tablebody: (time !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={time}/> : time
        },
        {
          tableheader: _CONSTANTS.TABLE.HEADER.THREE,
          tablebody: (collision !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={collision}/> : collision
        },
        {
          tableheader: _CONSTANTS.TABLE.HEADER.FOUR,
          tablebody: (pass !== _CONSTANTS.NOT_APPLICABLE) ? <ProgressBar value={pass}/> : pass
        }
      ];
      
      return (
        <ListGridView tableData={tableData} />
      );
    }

    return (
        <React.Fragment>
            <div className="nu-mt">
                <AutoComplete value={selectedScnearioId} suggestions={filteredScenarioId} completeMethod={filterScenarioId} field="simulationRuns.scenarioId" size={30} placeholder={_CONSTANTS.SCENARIOID_PLACEHOLDER} minLength={1} onChange={(e) => setSelectedScenarioId(e.value)} className="nu-ac"/>
                <AutoComplete value={selectedCarBuild} suggestions={filteredCarBuild} completeMethod={filterCarBuild} field="simulationRuns.carBuild" size={30} placeholder={_CONSTANTS.CARBUILD_PLACEHOLDER} minLength={1} onChange={(e) => setSelectedCarBuild(e.value)}  className="nu-ac"/>
            </div> <br />
            {displayTableData()}
        </React.Fragment>
    );
}

export default SearchZone;