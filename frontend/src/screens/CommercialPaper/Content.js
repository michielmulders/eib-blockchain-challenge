import React from 'react';
import { Card, Icon } from 'antd';
import DateContainer from './DateContainer';
import Details from './Details';
import Swift from './Swift';

export default ({ cp, process }) => (
    <div style={{ width: "60%", margin:0 }}>
        <Card className="details--details-content-card">
            <div className="date--container-wrap" >
                <DateContainer title="Issue date" value={cp.issueDate} />
                <div className="date--container-item-arrow"><Icon type="right" /></div>
                <DateContainer title="Maturity date" value={cp.maturityDate} />
            </div>
        </Card>

        <Swift cp={cp} process={process} />
        <Details cp={cp} />
    </div>
);

