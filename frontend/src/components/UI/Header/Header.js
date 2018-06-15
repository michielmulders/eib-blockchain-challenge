import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, Icon, Layout } from 'antd';
import styles from './Header.module.less';
import UIHeaderMenu from './Menu/Menu';

const { Header } = Layout;

const UIHeader = ({
    isMobile,
    user,
    onMenuClick
}) => (
    <Header className={styles.header}>


            <div className={styles.search}>
                <Icon style={{ color: "#fff" }} type="search"/>
            </div>

            <div className={styles.right}>
                {user.name && (
                    <Dropdown
                        overlay={<UIHeaderMenu onMenuClick={onMenuClick} />}>
                        <span className={`${styles.action} ${styles.account}`}>
                            <Avatar
                                size="small"
                                className={styles.avatar}
                                src={user.picture}
                            />
                            <span>{user.name}</span>
                        </span>
                    </Dropdown>
                )}
            </div>

    </Header>
);

UIHeader.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    user: PropTypes.object.isRequired,
    onMenuClick: PropTypes.func.isRequired
};

export default UIHeader;
