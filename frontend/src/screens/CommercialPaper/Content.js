import React from 'react';
import { Card, Icon } from 'antd';
import DateContainer from './DateContainer';
import Details from './Details';

export default ({ cp }) => (
    <div style={{ width: "60%", margin:0 }}>
    <Card >

        <div className="date--container-wrap" >
            <DateContainer title="Issue date" value={cp.issueDate} />
            <div className="date--container-item-arrow"><Icon type="right" /></div>
            <DateContainer title="Maturity date" value={cp.maturityDate} />
        </div>
    </Card>
    <Details cp={cp} />
    </div>
);


