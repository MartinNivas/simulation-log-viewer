import React from 'react';
import Header from '../Header/Header.lazy';
import Tabs from '../Tabs/Tabs.lazy';

const Simulator = (props) => {
    return (
        <>
            <Header />
            <Tabs {...props} />
        </>
    );
}

export default Simulator;