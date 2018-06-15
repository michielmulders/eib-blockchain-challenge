import React from 'react';
import { Card, Steps } from 'antd';

const Step = Steps.Step;

export default ({ process }) => {
    console.log(process);
    return (
        <div
            style={{
                backgroundColor: '#fff'
            }}>
            <Card
                className="details--rates"
                bodyStyle={{ marginTop: 75 }}
                title={<div className="commercial-paper-title">Swift GPI</div>}
                bordered={false}>
                <Steps progressDot current={process}>
                    <Step
                        title="Initiation"
                        description={
                            <div className="details--rates-description">
                                Preparation <b>MT 103</b>
                            </div>
                        }
                    />
                    <Step
                        title="In Progress"
                        description={
                            <div className="details--rates-description">
                                CP received<br />
                                <b>ISIN CODE</b>
                            </div>
                        }
                    />
                    <Step
                        title="Ended"
                        description={
                            <div className="details--rates-description">
                                CP ended<br />
                                <b>MT202 - 599</b>
                            </div>
                        }
                    />
                    <Step
                        title="Received"
                        description={
                            <div className="details--rates-description">
                                Cash<br />
                                <b>MT202 - 210</b>
                            </div>
                        }
                    />
                </Steps>
            </Card>
        </div>
    );
};
