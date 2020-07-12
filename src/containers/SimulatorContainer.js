import React from 'react';
import {SimulatorService} from '../services/SimulatorService';
import Simulator from '../components/Simulator/Simulator';

const simulatorService = new SimulatorService();

class SimulatorContainer extends React.Component{
    state = {
        logData: []
    }

    componentDidMount(){
        simulatorService.getSimulatorLog().then(data => this.setState({logData: data}));
    }

    render() {
        const {logData} = this.state;
        return (
            <Simulator logData={logData} />
        );
    }
}

export default SimulatorContainer;