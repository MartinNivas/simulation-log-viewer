import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import './ListGridView.css';

const ListGridView = (props) => {
    const [layout, setLayout] = useState('grid');

    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="car-details">
                    <div className="p-grid">
                        <div className="p-col-12"><h3>{data.tableheader} : </h3> {data.tablebody}</div>
                    </div>
                </div>
            </div>
        );
    };

    const renderGridItem = (data) => {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Panel header={data.tableheader} style={{ textAlign: 'center' }} >
                    {data.tablebody}
                </Panel>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list')
            return renderListItem(data);
        else if (layout === 'grid')
            return renderGridItem(data);
    };

    const renderHeader = () => {

        return (
            <div className="p-grid">
                <div className="p-col-12" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    };

    const header = renderHeader();
    
    return (
        <div className="dataview-demo">
            <DataView value={props.tableData} header={header} layout={layout} itemTemplate={itemTemplate}></DataView>
        </div>
    );
    
}

export default ListGridView;
