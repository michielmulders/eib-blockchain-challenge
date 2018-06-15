import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Icon, List, Row, Table, Tag } from 'antd';
import './BiddingMarket.module.less';


const columns = [
    {
        title: 'Transaction Status',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Buyer',
        dataIndex: 'buyer',
        key: 'buyer'
    },
    {
        title: 'Action',
        key: 'action',
        width: 360,
        render: (text, record) => {
            return (
                <a
                    style={{ marginLeft: 'auto' }}>
                    View SWIFT History
                </a>
            );
        }
    }
];


class ScreensInvestorInvestmentOverview extends React.Component {
    state = {
        availableCommercialPapers: [
            {
                docType: 'cp',
                issuer: 'Citibank',
                guarantor: 'EIB',
                type: '',
                dealer: '',
                issueDate: 'July 08, 2018',
                maturityDate: 'December 08, 2018',
                discount: '0,85',
                delivery: '',
                amount: '$ 25,000,000',
                rating: '',
                buyer: 'Private Buying Group',
                status: 'INITIATED',
                isin: '',
                id: '1234567894321'
            },
            {
                docType: 'cp',
                issuer: 'Deutsche Bank',
                guarantor: 'EIB',
                type: '',
                dealer: '',
                issueDate: 'June 21, 2018',
                maturityDate: 'December 21, 2018',
                discount: '0,89',
                delivery: '',
                amount: '$ 7,500,000',
                rating: '',
                buyer: 'Fierschman',
                status: 'ENDED',
                isin: '',
                id: '1234567894321'
            }
        ]
    };

    componentDidMount() {
    }


    render() {
        return (
            <div style={{
                padding: 50
            }}>
            <Card
                title="My Assets"
                bordered={false}
                style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                padding: 50
            }}>
                <Table

                    columns={columns}
                    dataSource={this.state.availableCommercialPapers}
                />
            </Card>
            </div>
        );
    }
}

export default connect()(ScreensInvestorInvestmentOverview);
