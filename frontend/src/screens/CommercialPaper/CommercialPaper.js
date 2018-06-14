import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    Col,
    Icon,
    List,
    Modal,
    Popover,
    Row,
    Table,
    Tabs,
    Tag,
    Timeline
} from 'antd';
import commercialPaperService from '../../shared/services/api/commercialPaper';
import { message } from 'antd/lib/index';
import moment from 'moment';
import { push } from 'react-router-redux';

class CommercialPaper extends React.Component {
    state = {
        cp: {
            docType: 'cp',
            issuer: "",
            guarantor: "",
            type: "",
            dealer: "",
            issueDate: "",
            maturityDate: "",
            discount: "",
            delivery: "",
            amount: "",
            rating: "",
            buyerId: "",
            status: "",
            isin: ""
        },
        columns: [
            {
                title: 'carats',
                dataIndex: 'carats',
                key: 'carats'
            },
            {
                title: 'EURO / carat',
                dataIndex: 'eurForCarats',
                key: 'eurForCarats'
            },
            {
                title: 'description',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: 'Total EUR',
                dataIndex: 'totalEur',
                key: 'totalEur'
            }
        ]
    };

    showCertificate() {
        Modal.info({
            title: 'KP Certificate',
            width: 625,
            content: (
                <div>
                    <img src="../KPCertificate.jpg" style={{ width: 500 }} />
                </div>
            ),
            onOk() {}
        });
    }

    componentDidMount() {
        commercialPaperService.getcommercialPaper(this.props.match.params.id).then(commercialPaper => {
            const ifSeller = this.props.userId === commercialPaper.seller;

            commercialPaperService.getcommercialPaperHistory(this.props.match.params.id)
                .then(history => {
                    return history.map(i => ({
                        value: i.value.status,
                        timestamp: i.timestamp * 1000
                    }));
                })
                .then(history => {
                    this.setState({
                        history
                    });
                });

            this.setState({
                seller: ifSeller
            });

            if (ifSeller) {
                commercialPaperService.getcommercialPaperRequest(
                    this.props.match.params.id
                ).then(commercialPaperRequest => {
                    console.log(commercialPaperRequest[0]);

                    const bidaccepted =
                        commercialPaperRequest.length &&
                        commercialPaperRequest[0].bids.find(
                            bid => bid.status === 'ACCEPTED'
                        );

                    this.setState({
                        commercialPaper,
                        commercialPaperRequest: commercialPaperRequest[0],
                        bidaccepted
                    });
                });
            } else {
                this.setState({
                    commercialPaper
                });
            }
        });

        this.setState({
            columns: [
                ...this.state.columns,
                {
                    title: (
                        <span>
                            <img
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: 10,
                                    objectFit: 'contain'
                                }}
                                src="../everledger.png"
                            />{' '}
                            Everledger
                        </span>
                    ),
                    dataIndex: 'everledgerId',
                    key: 'everledgerId',
                    render: id => (
                        <Popover
                            content={
                                <ul style={{ paddingLeft: '10px' }}>
                                    <li>Weight: 1.74</li>
                                    <li>Lab: GIA</li>
                                    <li>Stocknumber: IM-95-188-243</li>
                                </ul>
                            }
                            title={'CertID: ' + id}>
                            <Icon type="check" style={{ color: '#00ad78' }} />{' '}
                            {id}
                        </Popover>
                    )
                },
                {
                    title: '',
                    dataIndex: '',
                    key: 'x',
                    render: () => (
                        <a onClick={this.showCertificate}>KP Certificate</a>
                    )
                }
            ]
        });
    }

    renderTag = () => {
        if (!this.state.bidaccepted && this.state.seller) {
            if (
                this.state.commercialPaperRequest &&
                this.state.commercialPaperRequest.bids.length
            ) {
                return (
                    <Tag color="red">
                        {this.state.commercialPaperRequest.bids.length}
                    </Tag>
                );
            }

            return <Tag color="red">no bids yet</Tag>;
        } else if (this.state.bidaccepted && this.state.seller) {
            return <Tag color="green">financed</Tag>;
        }
    };

    render() {
        const total = this.state.commercialPaper
            ? this.state.commercialPaper.commercialPaperLines.reduce((all, obj) => {
                  return all + Number.parseFloat(obj.totalEur);
              }, 0)
            : 0;

        return (
            <div
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Row gutter={16}>
                    <Col span={17}>
                        <div
                            style={{
                                width: '100%',
                                marginBottom: 25,
                                display: 'flex'
                            }}>
                            <div style={{ display: 'flex', marginRight: 25 }}>
                                <img
                                    src="../approve.png"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginTop: 8
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                    <h1
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            fontSize: '1.7em',
                                            fontFamily: 'lato',
                                            fontWeight: 700
                                        }}>
                                        commercialPaper{' '}
                                        <Tag>
                                            {this.state.commercialPaper
                                                ? this.state.commercialPaper.status
                                                : ''}
                                        </Tag>
                                    </h1>
                                    <h4
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            color: '#888'
                                        }}>
                                        28-04-2018 11:54:00
                                    </h4>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        textAlign: 'right'
                                    }}>
                                    <span>Price</span>
                                    <h5 style={{ fontSize: '1.5em' }}>
                                        $ {total}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <Card bodyStyle={{ padding: '10px 25px 25px' }}>
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="commercialPaper details" key="1">
                                    <div
                                        style={{
                                            width: '100%',
                                            marginTop: '10px'
                                        }}>
                                        <div
                                            style={{
                                                marginBottom: 25
                                            }}>
                                            <div
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                <Card
                                                    type="inner"
                                                    style={{
                                                        width: '49.5%',
                                                        marginRight: '1%',
                                                        boxShadow: 'unset',
                                                        borderColor: this.state
                                                            .seller
                                                            ? '#009966'
                                                            : null
                                                    }}
                                                    title={
                                                        <span>
                                                            <Icon type="user" />{' '}
                                                            Seller
                                                        </span>
                                                    }>
                                                    <p>The ledger INC.</p>
                                                    <p>
                                                        Jan van Rijswijcklaan
                                                        191
                                                    </p>
                                                    <p>2020 Antwerpen</p>
                                                    <p>België</p>
                                                </Card>
                                                <Card
                                                    type="inner"
                                                    style={{
                                                        width: '50%',
                                                        boxShadow: 'unset',
                                                        borderColor: !this.state
                                                            .seller
                                                            ? '#009966'
                                                            : null
                                                    }}
                                                    title={
                                                        <span>
                                                            <Icon type="user" />{' '}
                                                            Buyer
                                                        </span>
                                                    }>
                                                    <p>The ledger INC.</p>
                                                    <p>
                                                        Jan van Rijswijcklaan
                                                        191
                                                    </p>
                                                    <p>2020 Antwerpen</p>
                                                    <p>België</p>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>

                                    {this.state.commercialPaper && (
                                        <Table
                                            style={{
                                                backgroundColor: '#fff'
                                            }}
                                            dataSource={
                                                this.state.commercialPaper.commercialPaperLines
                                            }
                                            columns={this.state.columns}
                                        />
                                    )}
                                </Tabs.TabPane>
                                <Tabs.TabPane
                                    disabled={!this.state.seller}
                                    tab={
                                        <div>
                                            <span
                                                style={{ marginRight: '20px' }}>
                                                Financing
                                            </span>{' '}
                                            {this.renderTag()}
                                        </div>
                                    }
                                    key="2">
                                    {this.state.commercialPaperRequest ? (
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={
                                                this.state.commercialPaperRequest.bids
                                            }
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={
                                                            <div>
                                                                {item.amount}%
                                                            </div>
                                                        }
                                                        description={item.time}
                                                    />
                                                    {!this.state
                                                        .bidaccepted && (
                                                        <Button
                                                            onClick={() => {
                                                                const hide = message.loading(
                                                                    'Comitting to the blockchain..',
                                                                    0
                                                                );
                                                            }}>
                                                            Accept
                                                        </Button>
                                                    )}

                                                    {item.status ===
                                                        'ACCEPTED' && (
                                                        <Tag color="green">
                                                            ACCEPTED
                                                        </Tag>
                                                    )}
                                                </List.Item>
                                            )}
                                        />
                                    ) : null}
                                </Tabs.TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                    <Col span={7} style={{ marginTop: '100px' }}>
                        <Timeline>
                            {this.state.history.map(i => {
                                let message;

                                switch (i.value) {
                                    case 'PENDING':
                                        message = 'Awaiting buyer confirmation';
                                        break;
                                    case 'SIGNED':
                                        message = 'Awaiting shipment';
                                        break;
                                    case 'SHIPPED':
                                        message =
                                            'Awaiting diamond office approval';
                                        break;
                                    case 'VALIDATED':
                                        message = 'Awaiting delivery';
                                        break;
                                    case 'PAYED':
                                        message = 'Payment made';
                                        break;
                                }

                                return (
                                    <Timeline.Item>
                                        {message}{' '}
                                        <span
                                            style={{
                                                fontSize: '.8rem',
                                                color: 'grey'
                                            }}>
                                            - {moment(i.timestamp).fromNow()}
                                        </span>
                                    </Timeline.Item>
                                );
                            })}

                            {this.state.commercialPaper &&
                                this.state.commercialPaper.status === 'PENDING' &&
                                !this.state.seller && (
                                    <Button
                                        type="primary"
                                        onClick={e => {
                                            e.preventDefault();
                                            const hide = message.loading(
                                                'Comitting to the blockchain..',
                                                0
                                            );

                                            commercialPaperService.updatecommercialPaperStatus(
                                                this.state.commercialPaper.commercialPaperId,
                                                'SIGNED'
                                            )
                                                .then(() => {
                                                    hide();
                                                    message.success(
                                                        'Succesfully updated status!'
                                                    );
                                                    setTimeout(() => {
                                                        return commercialPaperService.updatecommercialPaperStatus(
                                                            this.state.commercialPaper
                                                                .commercialPaperId,
                                                            'SHIPPED'
                                                        ).then(() => {
                                                            message.success(
                                                                'Succesfully received by shipping company!'
                                                            );
                                                            setTimeout(() => {
                                                                return commercialPaperService.updatecommercialPaperStatus(
                                                                    this.state
                                                                        .commercialPaper
                                                                        .commercialPaperId,
                                                                    'VALIDATED'
                                                                ).then(() => {
                                                                    message.success(
                                                                        'Succesfully validated by the Diamond Office!'
                                                                    );
                                                                    setTimeout(
                                                                        () => {
                                                                            this.props.push(
                                                                                this
                                                                                    .props
                                                                                    .match
                                                                            );
                                                                        },
                                                                        1000
                                                                    );
                                                                });
                                                            }, 1000);
                                                        });
                                                    }, 1000);
                                                })
                                                .catch(console.log);
                                        }}>
                                        Accept
                                    </Button>
                                )}

                            {this.state.commercialPaper &&
                                this.state.commercialPaper.status === 'VALIDATED' &&
                                !this.state.seller && (
                                    <Button
                                        type="primary"
                                        onClick={e => {
                                            e.preventDefault();
                                            const hide = message.loading(
                                                'Comitting to the blockchain..',
                                                0
                                            );

                                            commercialPaperService.updatecommercialPaperStatus(
                                                this.state.commercialPaper.commercialPaperId,
                                                'PAYED'
                                            )
                                                .then(() => {
                                                    hide();
                                                    message.success(
                                                        'commercialPaper payed!'
                                                    );
                                                })
                                                .catch(console.log);
                                        }}>
                                        Mark Recieved and pay
                                    </Button>
                                )}
                        </Timeline>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user.sub.replace('|', '-')
});

export default connect(mapStateToProps, { push: push })(CommercialPaper);
