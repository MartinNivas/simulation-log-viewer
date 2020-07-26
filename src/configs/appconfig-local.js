(function () {
    const config = {};
    config.environment = 'LOCAL';
    config.base_url = 'http://localhost:3000';
    config.endpoints = {
        'GET_SIMULATOR_LOG_DATA': config.base_url + '/'
    }
})()