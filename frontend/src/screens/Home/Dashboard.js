import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, List, Tag } from 'antd';
import { Link } from 'react-router-dom';
import InvoiceService from '../../shared/services/api/invoice';
import { message } from 'antd/lib/index';
import moment from 'moment';
import { push } from 'react-router-redux';

class ScreensHomeDashboard extends React.Component {
    state = {
        myInvoices: [],
        buyInvoices: []
    };

    componentDidMount() {
        const userId = this.props.user.sub.replace('|', '-');

        InvoiceService.getInvoices().then(invoices => {
            this.setState({
                myInvoices: invoices.filter(i => i.seller === userId),
                buyInvoices: invoices.filter(i => i.buyer === userId)
            });
        });
    }

    renderItem(item) {
        return (
            <Link to={`/invoice/${item.invoiceId}`}>
                <List.Item key={item.invoiceId}>
                    <List.Item.Meta
                        title={<a>{item.invoiceId}</a>}
                        description={
                            <div className="d-flex">
                                <div>
                                    {moment(item.dateOfSale * 1000).format(
                                        'D MMM YY'
                                    )}
                                </div>
                            </div>
                        }
                    />
                    <div>
                        <div>
                            <Tag>{item.status}</Tag>
                        </div>
                    </div>
                </List.Item>
            </Link>
        );
    }

    renderBids(item) {
        const accept =
            item.status.toLowerCase() === 'pending' ? (
                <Button
                    type="primary"
                    onClick={e => {
                        e.preventDefault();
                        const hide = message.loading(
                            'Comitting to the blockchain..',
                            0
                        );

                        InvoiceService.updateInvoiceStatus(
                            item.invoiceId,
                            'SIGNED'
                        )
                            .then(() => {
                                hide();
                                message.success('Succesfully updated status!');
                                setTimeout(() => {
                                    return InvoiceService.updateInvoiceStatus(
                                        item.invoiceId,
                                        'SHIPPED'
                                    ).then(() => {
                                        message.success(
                                            'Succesfully received by shipping company!'
                                        );
                                        setTimeout(() => {
                                            return InvoiceService.updateInvoiceStatus(
                                                item.invoiceId,
                                                'VALIDATED'
                                            ).then(() => {
                                                message.success(
                                                    'Succesfully validated by the Diamond Office!'
                                                );
                                                this.props.push('/');
                                            });
                                        }, 1000);
                                    });
                                }, 1000);
                            })
                            .catch(console.log);
                    }}>
                    Accept
                </Button>
            ) : (
                <Tag>{item.status}</Tag>
            );

        return (
            <Link to={`/invoice/${item.invoiceId}`}>
                <List.Item key={item.invoiceId}>
                    <List.Item.Meta
                        title={
                            <a>
                                {item.invoiceId} from {item.seller}
                            </a>
                        }
                        description={
                            <div className="d-flex">
                                <div>
                                    {moment(item.dateOfSale * 1000).format(
                                        'D MMM YY'
                                    )}
                                </div>
                            </div>
                        }
                    />
                    <div>{accept}</div>
                </List.Item>
            </Link>
        );
    }

    render() {
        return (
            <div
                style={{
                    padding: 50
                }}>
                {/*                <Row gutter={24}>
                    <Col span={12}>
                        <ChartCard bordered={false}
                            title="Balance invested"
                            total="78%"
                            footer={
                                <div>
                                    <span>
                                        Last month
                                        <Trend
                                            flag="up"
                                            style={{
                                                marginLeft: 8,
                                                color: 'rgba(0,0,0,.85)'
                                            }}>
                                            12%
                                        </Trend>
                                    </span>
                                    <span style={{ marginLeft: 16 }}>
                                        日环比
                                        <Trend
                                            flag="down"
                                            style={{
                                                marginLeft: 8,
                                                color: 'rgba(0,0,0,.85)'
                                            }}>
                                            11%
                                        </Trend>
                                    </span>
                                </div>
                            }
                            contentHeight={46}>
                            <MiniProgress percent={78} strokeWidth={8} />
                        </ChartCard>
                    </Col>
                    <Col span={12} />
                </Row>*/}
                <Card
                    title="My Invoices"
                    extra={
                        <Link to="/create-invoice">
                            <Button type="primary">Create</Button>
                        </Link>
                    }
                    bordered={false}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        padding: 50
                    }}>
                    <List
                        style={{ width: '100%', margin: 'auto' }}
                        dataSource={this.state.myInvoices}
                        renderItem={this.renderItem}
                        itemLayout="horizontal"
                    />
                </Card>
                <Card
                    title="Incoming Invoices"
                    bordered={false}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        padding: 50
                    }}>
                    <List
                        style={{ width: '100%', margin: 'auto' }}
                        dataSource={this.state.buyInvoices}
                        renderItem={this.renderBids}
                        itemLayout="horizontal"
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
