// @flow

import React from 'react';
import { Link } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ConnectionState } from 'enums';

import { Layout, Menu, Icon } from 'antd';
import ReactSVG from "react-svg";
import logo from 'assets/octocnc_sprites_logo.svg'
const { Header, Content, Footer, Sider } = Layout;

const logoStyle = { };

class App extends React.Component {

    render() {

        let status_icon = <Icon inverted name='circle thin' />;

        if(this.props.status === ConnectionState.CONNECTED) {
            status_icon = <Icon inverted color='green' name='circle' />;
        }

        return (
                <Layout style={{height: '100vh'}}>
                    <Sider style={{overflow: 'auto'}}>
                        <div className="logo">
                            <ReactSVG path={logo} style={logoStyle} className="m1"/>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1">
                                <Link to={`connection`}>
                                    <Icon type="user"/>
                                    <span className="nav-text">Connection</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`position`}>
                                    <Icon type="video-camera"/>
                                    <span className="nav-text">Position</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload"/>
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="bar-chart"/>
                                <span className="nav-text">nav 4</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="cloud-o"/>
                                <span className="nav-text">nav 5</span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="appstore-o"/>
                                <span className="nav-text">nav 6</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="team"/>
                                <span className="nav-text">nav 7</span>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Icon type="shop"/>
                                <span className="nav-text">nav 8</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
                                {this.props.children}
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            OctoCNC powered by OctoPrint
                        </Footer>
                    </Layout>
                </Layout>
        );
    }
}

App.defaultProps = {
  status: ConnectionState.DISCONNECTED
};

function mapStateToProps(state) {
  return {
    status: state.devices.status
  };
}

App.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
