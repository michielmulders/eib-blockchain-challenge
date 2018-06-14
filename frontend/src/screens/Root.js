import React from 'react';
import Home from './Home/Dashboard';
import { Layout } from 'antd';
import { Switch } from 'react-router';
import UIHeader from '../components/UI/Header/Header';
import { enquireScreen } from 'enquire-js';
import UISidebarDrawerMenu from '../components/UI/Sidebar/DrawerMenu';
import AuthPrivateRoute from '../components/Auth/PrivateRoute';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import BiddingMarket from './investor/BiddingMarket';
import InvoiceOverview from './CreateInvoice/Create';
import Invoice from './Invoice/Invoice';
import InvestmentOverview from './investor/InvestmentOverview';

const { Content } = Layout;

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

class Root extends React.Component {
    state = {
        collapsed: false,
        isMobile
    };

    componentDidMount() {
        enquireScreen(mobile => {
            this.setState({
                isMobile: mobile
            });
        });
    }

    toggle = collapse => {
        this.setState({
            collapsed: collapse || !this.state.collapsed
        });
    };

    onMenuClick = ({ item, key, keyPath }) => {
        switch (key) {
            case 'logout':
                this.props.logout();
                break;
            default:
                console.error('Not implemented', key);
        }
    };

    renderRole = role => {
        if (role === 'user') {
            return (
                <Switch style={{ width: '100%', height: '100%' }}>
                    <AuthPrivateRoute exact path="/" component={Home} />
                    <AuthPrivateRoute
                        exact
                        path="/create-invoice"
                        component={InvoiceOverview}
                    />
                    <AuthPrivateRoute
                        exact
                        path="/invoice/:id"
                        component={Invoice}
                    />
                </Switch>
            );
        }

        return (
            <Switch>
                <AuthPrivateRoute
                    exact
                    path="/"
                    component={InvestmentOverview}
                />
                <AuthPrivateRoute
                    exact
                    path="/bidding"
                    component={BiddingMarket}
                />
            </Switch>
        );
    };

    render() {
        const { user, logout } = this.props;

        return (
            <Layout hasSider className="height-100">
                <UISidebarDrawerMenu
                    user={user}
                    collapsed={this.state.collapsed}
                    toggleCollapse={this.toggle}
                    isMobile={this.state.isMobile}
                />
                <Layout>
                    <UIHeader
                        onMenuClick={this.onMenuClick}
                        logout={logout}
                        user={user}
                        collapsed={this.state.collapsed}
                        isMobile={this.state.isMobile}
                        toggleCollapse={this.toggle}
                    />
                    <Content
                        style={{
                            margin: '0 16px 24px',
                            padding: '0px 8px',
                            minHeight: 280
                        }}>
                        <Switch>
                            <span>
                                {this.renderRole(
                                    user['https://theledger.be/role']
                                )}
                            </span>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { logout: () => push('/logout') })(
    Root
);
