import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    Col, Icon,
    Row,
    Tag
} from 'antd';
import './CommercialPaper.module.less';
import { push } from 'react-router-redux';
import Header from './Header';
import Pricing from './Pricing';
import Content from './Content';

class CommercialPaper extends React.Component {
    state = {
        cp: {
            docType: 'cp',
            issuer: "BANK X",
            guarantor: "BANK Y",
            type: "",
            dealer: "",
            issueDate: "July 08, 2018",
            maturityDate: "December 08, 2018",
            discount: "",
            delivery: "",
            amount: "",
            rating: "",
            buyerId: "",
            status: "OPEN",
            isin: ""
        },
        history: {},
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

    componentDidMount() {

    }

    render() {


        return (
            <div
                style={{ position: 'relative', width: '100%', height: '100%', paddingTop: 75 }}>
                <Row gutter={16}>
                    <Col span={2}/>
                    <Col span={20} style={{ margin: "auto" }}>
                        <Header cp={this.state.cp} />


                        <div style={{ display: 'flex', alignItems: "flex-start", marginBottom: 25, justifyContent: "space-between"  }}>
                           <Content cp={this.state.cp} />
                           <Pricing />
                        </div>
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
