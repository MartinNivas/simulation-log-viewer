
import axios from 'axios';

export class SimulatorService {

    getSimulatorLog() {
        return axios.get('data/simulator-log.json')
                .then(res => res.data.data);
    }

}
    