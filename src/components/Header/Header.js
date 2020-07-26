import React from 'react';
import './Header.css';
import logo from '../../assets/images/nuslv.jpg'
import constants from '../../locales/constants';

const Header = () => {
    const { TITLE } = constants.HEADER;
    return (
        <div className="p-datatable-header">
            <img src={logo} alt={TITLE} className="nu-applogo" />
            <h2>{TITLE}</h2>
        </div>
    );
};

export default Header;