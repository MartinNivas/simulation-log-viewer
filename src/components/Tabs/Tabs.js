import React from 'react';
import {TabView,TabPanel} from 'primereact/tabview';

import TableView from '../TableView/TableView.lazy';
import SearchSection from '../SearchZone/SearchZone.lazy';

const Tabs = (props) => {
    const {logData} = props;
    const settings = [
        {
            header: "Table View",
            lefticon: "pi pi-calendar",
            bodycontent: <TableView logData={logData} />
        },
        {
            header: "Search Zone",
            lefticon: "pi pi-search",
            bodycontent: <SearchSection logData={logData} />
        }
    ]
    return (
        <TabView renderActiveOnly={false}>
            {settings.map((data, id) => {
                return <TabPanel key={id} header={data.header} leftIcon={data.lefticon}>{data.bodycontent}</TabPanel>;
            })}
        </TabView>
    );
}

export default Tabs;