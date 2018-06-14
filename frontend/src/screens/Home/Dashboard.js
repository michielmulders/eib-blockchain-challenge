import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, List, Tag } from 'antd';
import { Link } from 'react-router-dom';
import commercialPaperService from '../../shared/services/api/commercialPaper';
import { message } from 'antd/lib/index';
import moment from 'moment';
import { push } from 'react-router-redux';

class ScreensHomeDashboard extends React.Component {
    state = {
        myCommercialPapers: [],
        availableCommercialPapers: []
    };

    componentDidMount() {
        const userId = this.props.user.sub.replace('|', '-');

        commercialPaperService.getCommercialPapers().then(invoices => {
            this.setState({
                myCommercialPapers: invoices.filter(i => i.seller === userId),
                availableCommercialPapers: invoices.filter(i => i.buyer === userId)
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

                        commercialPaperService.updateInvoiceStatus(
                            item.invoiceId,
                            'SIGNED'
                        )
                            .then(() => {
                                hide();
                                message.success('Succesfully updated status!');
                                setTimeout(() => {
                                    return commercialPaperService.updateInvoiceStatus(
                                        item.invoiceId,
                                        'SHIPPED'
                                    ).then(() => {
                                        message.success(
                                            'Succesfully received by shipping company!'
                                        );
                                        setTimeout(() => {
                                            return commercialPaperService.updateInvoiceStatus(
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
                <Card
                    title="My Commercial papers"

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
                    title="Available Papers"
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
