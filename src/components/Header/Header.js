import React from 'react';
import './Header.css';
import logo from '../../assets/images/nuslv.jpg'
import constants from '../../data/constants';

const Header = () => {
    const _CONSTANTS = constants.HEADER;
    return (
        <div className="p-datatable-header">
            <img src={logo} alt="Simulation Log Viewer" className="nu-applogo" />
            <h2>{_CONSTANTS.TITLE}</h2>
        </div>
    );
};

export default Header;