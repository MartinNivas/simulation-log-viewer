import React from 'react';
import Header from '../Header/Header.lazy';
import Tabs from '../Tabs/Tabs.lazy';

const Simulator = (props) => {
    const {logData} = props;
    return (
        <>
            <Header />
            <Tabs logData={logData} />
        </>
    );
}

export default Simulator;