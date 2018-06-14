import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu } from 'antd';
import cn from 'classnames';
import styles from './Sidebar.module.less';
import logo from '../../../assets/images/diamond.svg';
import { withRouter } from 'react-router';

const { Sider } = Layout;

class UISidebar extends React.Component {
    collapse = () => {
        if (this.props.isMobile) {
            this.props.toggleCollapse(true);
        }
    };

    render() {
        const { collapsed, location, toggleCollapse, user } = this.props;

        const role = user['https://theledger.be/role'];

        return (
            <Sider
                className={styles.sidebar}
                collapsible
                width={256}
                breakpoint="lg"
                collapsed={collapsed}
                trigger={null}
                onCollapse={toggleCollapse}>
                <div className={cn('tl_logo', styles.sidebar_logo)}>
                    <img src={logo} alt="barn logo" />
                    <h1>DiaVest</h1>
                </div>
                <Menu
                    className={styles.menu}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}>
                    {role === 'user'
                        ? [
                              <Menu.Item key="/">
                                  <Link to="/" onClick={this.collapse}>
                                      <Icon type="file-text" />
                                      <span>Invoices</span>
                                  </Link>
                              </Menu.Item>,

                              <Menu.Item key="/create-invoice">
                                  <Link
                                      to="/create-invoice"
                                      onClick={this.collapse}>
                                      <Icon type="plus-circle-o" />
                                      <span>Create invoice</span>
                                  </Link>
                              </Menu.Item>
                          ]
                        : [
                              <Menu.Item key="/">
                                  <Link to="/" onClick={this.collapse}>
                                      <Icon type="dashboard" />
                                      <span>Investment overview</span>
                                  </Link>¬
                              </Menu.Item>,
                              <Menu.Item key="/bidding">
                                  <Link to="/bidding" onClick={this.collapse}>
                                      <Icon type="global" />
                                      <span>Bidding market</span>
                                  </Link>
                              </Menu.Item>
                          ]}
                </Menu>
            </Sider>
        );
    }
}

UISidebar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    toggleCollapse: PropTypes.func.isRequired
};

export default withRouter(UISidebar);
