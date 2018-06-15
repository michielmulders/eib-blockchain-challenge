import React from 'react';
import { Card, Table } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];

const dataSource = [{
    key: '1',
    name: 'Standard & Poor\'s',
    age: 'Fitch Ratings',
    address: 'Moody\'s'
}, {
    key: '2',
    name: <b>X+</b>,
    age: <b>X-</b>,
    address: <b>AX-</b>
}];

export default ({ cp }) => (
    <div
        style={{
            backgroundColor : "#fff",
        }}>

        <Card className="details--rates" title={<div className="commercial-paper-title">Ratings</div>} bordered={false}>
            <Table showHeader={false} columns={columns} dataSource={dataSource}  />
        </Card>
    </div>

);


