import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, List, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';

const columns = [
    {
        title: 'amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'issuer',
        dataIndex: 'issuer',
        key: 'issuer'
    },
    {
        title: 'discount',
        dataIndex: 'discount',
        key: 'discount'
    },
    {
        title: 'Action',
        key: 'action',
        width: 360,
        render: (text, record) => {
            return (
                <Link
                    style={{ marginLeft: 'auto' }}
                    to={'/commercialpapers/' + record.id}>
                    Open
                </Link>
            );
        }
    }
];

class ScreensHomeDashboard extends React.Component {
    state = {
        availableCommercialPapers: [
            {
                docType: 'cp',
                issuer: 'Citibank',
                guarantor: 'EIB',
                type: '',
                dealer: '',
                issueDate: 'June 25, 2018',
                maturityDate: 'August 25, 2018',
                discount: '0,67',
                delivery: '',
                amount: '$250,000',
                rating: '',
                buyerId: '',
                status: 'OPEN',
                isin: '',
                id: '1234567894321'
            },
            {
                docType: 'cp',
                issuer: 'Deutsche Bank',
                guarantor: 'EIB',
                type: '',
                dealer: '',
                issueDate: 'July 08, 2018',
                maturityDate: 'December 08, 2018',
                discount: '0,74',
                delivery: '',
                amount: '$500,000',
                rating: '',
                buyerId: '',
                status: 'OPEN',
                isin: '',
                id: '1234567894321'
            }
        ]
    };

    render() {
        return (
            <div
                style={{
                    padding: 50
                }}>
                <Card
                    title="My Commercial papers"
                    bordered={false}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        padding: 50
                    }}>
                    <Table
                        showHeader={false}
                        columns={columns}
                        dataSource={this.state.availableCommercialPapers}
                    />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { push: push })(ScreensHomeDashboard);
