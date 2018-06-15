import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Icon, List, Row, Tag } from 'antd';
import './BiddingMarket.module.less';
import ChartCard from '../../shared/Charts/ChartCard/ChartCard';
import Trend from '../../shared/Charts/Trend/Trend';
import MiniProgress from '../../shared/Charts/MiniProgress/MiniProgress';
import MiniArea from '../../shared/Charts/MiniArea';

class ScreensInvestorInvestmentOverview extends React.Component {
    state = {
        investments: []
    };

    componentDidMount() {
    }


    render() {
        return (
            <div>
                <h2>My investments</h2>
                <Row gutter={24}>
                    <Col span={16}>
                        <List
                            itemLayout="horizontal"
                            size="large"
                            dataSource={this.state.investments}
                            renderItem={item => (
                                <Card>
                                    <List.Item key={item.invoiceId}>
                                        <List.Item.Meta
                                            avatar={
                                                <Icon
                                                    style={{ fontSize: '2rem' }}
                                                    type="wallet"
                                                />
                                            }
                                            title={
                                                <a
                                                    href="javascript:void(0)"
                                                    onClick={() => {}}>
                                                    {item.invoiceId}
                                                </a>
                                            }
                                            description={
                                                <div className="d-flex">
                                                    <div>14 days ago</div>
                                                </div>
                                            }
                                        />
                                        <div>
                                            Amount <Tag>€2000</Tag>
                                        </div>
                                    </List.Item>
                                </Card>
                            )}
                        />
                    </Col>
                    <Col span={8}>
                        <ChartCard
                            title="Balance"
                            total="€30.000"
                            style={{ marginBottom: '20px' }}
                            footer={
                                <div>
                                    <span>
                                        Last month
                                        <Trend
                                            flag="down"
                                            style={{
                                                marginLeft: 8,
                                                color: 'rgba(0,0,0,.85)'
                                            }}>
                                            12%
                                        </Trend>
                                    </span>
                                    <span style={{ marginLeft: 16 }}>
                                        This year
                                        <Trend
                                            flag="up"
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
                            <MiniArea
                                line
                                color="#cceafe"
                                height={45}
                                data={[
                                    {
                                        x: '€2000',
                                        y: 2300
                                    },
                                    {
                                        x: '-€2000',
                                        y: 300
                                    },
                                    {
                                        x: '€500',
                                        y: 800
                                    },
                                    {
                                        x: '€1000',
                                        y: 1800
                                    },
                                    {
                                        x: '€1000',
                                        y: 1800
                                    }
                                ]}
                            />
                        </ChartCard>
                        <ChartCard
                            title="Amount invested"
                            total="78%"
                            contentHeight={46}>
                            <MiniProgress percent={78} strokeWidth={8} />
                        </ChartCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect()(ScreensInvestorInvestmentOverview);
