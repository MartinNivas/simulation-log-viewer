
import axios from 'axios';

export class SimulatorService {

    getSimulatorLog() {
        return axios.get('data/simulator-log.json')
                .then(res => res.data.data);
    }

    getSimulatorData() {
        return axios.get('data/simulatorlog.json')
                .then(res => res.data);
    }

}
    