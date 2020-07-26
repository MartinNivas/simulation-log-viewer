import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';

import TableView from '../TableView/TableView.lazy';
import SearchSection from '../SearchZone/SearchZone.lazy';

const Tabs = (props) => {

    const settings = [
        {
            header: "Table View",
            lefticon: "pi pi-calendar",
            bodycontent: <TableView {...props} />
        },
        {
            header: "Search Zone",
            lefticon: "pi pi-search",
            bodycontent: <SearchSection {...props} />
        }
    ]
    return (
        <TabView renderActiveOnly={false}>
            {settings.map((data, id) => {
                const { header, lefticon, bodycontent } = data; // Destructing the data
                return <TabPanel key={id} header={header} leftIcon={lefticon}>{bodycontent}</TabPanel>;
            })}
        </TabView>
    );
}

export default Tabs;