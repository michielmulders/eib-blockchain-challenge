import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu } from 'antd';
import cn from 'classnames';
import styles from './Sidebar.module.less';
import logo from '../../../assets/images/logo.png';
import eib_logo from '../../../assets/images/eib.png';
import { withRouter } from 'react-router';

const { SubMenu } = Menu;

const { Sider } = Layout;

class UISidebar extends React.Component {

    render() {
        const { location, user } = this.props;

        const role = user['https://theledger.be/role'];

        return (
            <Sider
                className={styles.sidebar}
                width={356}
                breakpoint="lg">
                <div className={cn('tl_logo', styles.sidebar_logo)}>
                    <img src={logo} alt="barn logo" />
                    <div>by</div>
                    <img src={eib_logo} alt="barn logo" />
                </div>
                <Menu
                    className={styles.menu}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}>
                    {role === 'user'
                        ? [

                              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                  <Menu.Item key="/">
                                      <Link to="/" onClick={this.collapse}>
                                          <Icon type="file-text" />
                                          <span>My commercial papers</span>
                                      </Link>
                                  </Menu.Item>
                              </SubMenu>

                          ]
                        : [
                              <Menu.Item key="/">
                                  <Link to="/" onClick={this.collapse}>
                                      <Icon type="dashboard" />
                                      <span>Investment overview</span>
                                  </Link>
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
    isMobile: PropTypes.bool
};

export default withRouter(UISidebar);
