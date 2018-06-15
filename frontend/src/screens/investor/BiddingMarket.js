import React from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    Icon,
    InputNumber,
    List,
    message,
    Row,
    Tag
} from 'antd';
import './BiddingMarket.module.less';
import { connect } from 'react-redux';

class ScreensInvestorBiddingMarket extends React.Component {
    state = {
        financeRequests: [],
        invoiceRequest: null,
        bidAmount: 5
    };

    commercialPapers = [
        {
            docType: 'cp',
            issuer: 'BANK XXXXXXX',
            guarantor: 'BANK YYYYYYYY',
            type: '',
            dealer: '',
            issueDate: '2018-06-08',
            maturityDate: '2018-12-08',
            discount: '',
            delivery: '',
            amount: '',
            rating: '',
            buyerId: '',
            status: 'OPEN',
            isin: '1'
        }
    ];

    componentDidMount() {}

    render() {
        return (
            <div>
                <h2>Commercial Papers</h2>
                <Row gutter={24}>
                    <Col span={16}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={this.state.commercialPapers}
                            renderItem={item => (
                                <Card
                                    bodyStyle={{ padding: '10px 24px' }}
                                    style={{ marginBottom: '20px' }}>
                                    <List.Item
                                        key={item.isin}
                                        extra={
                                            <div>
                                                <span
                                                    style={{
                                                        paddingRight: '5px'
                                                    }}>
                                                    Lowest bid: 4%
                                                </span>
                                                <Button
                                                    onClick={() => {
                                                        this.setState({
                                                            invoiceRequest: item
                                                        });
                                                    }}>
                                                    Make bid
                                                </Button>
                                            </div>
                                        }>
                                        <List.Item.Meta
                                            avatar={
                                                <Icon
                                                    style={{ fontSize: '2rem' }}
                                                    type="bank"
                                                />
                                            }
                                            title={
                                                <a href="javascript:void(0)">
                                                    {item.invoiceId}
                                                </a>
                                            }
                                            description={
                                                <div className="d-flex">
                                                    <div>
                                                        Reputation:{' '}
                                                        <Tag color="orange">
                                                            B
                                                        </Tag>
                                                    </div>
                                                    <div>
                                                        Amount <Tag>€2000</Tag>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                </Card>
                            )}
                        />
                    </Col>
                    <Col span={8}>
                        <Card title="Bid" style={{ marginBottom: '20px' }}>
                            {this.state.invoiceRequest ? (
                                <div>
                                    <h3>
                                        Place bid for{' '}
                                        {
                                            this.state.invoiceRequest
                                                .financeRequestId
                                        }
                                    </h3>
                                    <Form.Item>
                                        <InputNumber
                                            defaultValue={5}
                                            min={0}
                                            max={100}
                                            formatter={value => `${value}%`}
                                            parser={value =>
                                                value.replace('%', '')
                                            }
                                            onChange={bidAmount => {
                                                this.setState({
                                                    bidAmount
                                                });
                                            }}
                                        />
                                        <Button
                                            onClick={() => {
                                                const hide = message.loading(
                                                    'Comitting to the blockchain..',
                                                    0
                                                );
                                                // Dismiss manually and asynchronously
                                            }}>
                                            Place bid
                                        </Button>
                                    </Form.Item>
                                </div>
                            ) : (
                                <p>Please select a invoice request</p>
                            )}
                        </Card>

                        {this.state.invoiceRequest && (
                            <div>
                                <h3>Latest bids</h3>
                                <List
                                    className="demo-loadmore-list"
                                    itemLayout="horizontal"
                                    dataSource={this.state.invoiceRequest.bids}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title="Bid"
                                                description={item.time}
                                            />
                                            <div>{item.amount}%</div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    commercialPapers: state.commercialPapers
});

export default connect()(ScreensInvestorBiddingMarket);
