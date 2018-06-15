import { Button, Spin } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../../shared/auth/authActions';
import { withRouter } from 'react-router-dom';
import Logo_auth0 from '../../../assets/images/logo_auth0';
import Logo_civic from '../../../assets/images/logo_civic';

class ScreensAuthLogin extends React.PureComponent {
    render() {
        const { loading, login } = this.props;

        return (
            <div>
                {loading ? (
                    <div className="text-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div>
                        <Button
                            loading={loading}
                            size="large"
                            type="primary"
                            className="d-block itsme"
                            onClick={login.bind(null, 'auth0')}
                            htmlType="submit">
                            Login as Buyer
                        </Button>
                        <Button
                            loading={loading}
                            size="large"
                            type="primary"
                            onClick={login.bind(null, 'itsme')}
                            className="d-block"
                            htmlType="submit">
                            Login as Bank
                        </Button>
                        <Button
                            loading={loading}
                            size="large"
                            type="primary"
                            onClick={login.bind(null, 'itsme')}
                            className="d-block"
                            htmlType="submit">
                            Login as Dealer
                        </Button>
                    </div>
                )}
                <hr />
                Build number: v0.5.12
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default withRouter(
    connect(mapStateToProps, { login })(ScreensAuthLogin)
);
