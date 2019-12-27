// @flow

import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ConnectionStatus } from 'enums';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import ReactSVG from "react-svg";
import logo from 'assets/octocnc_sprites_logo.svg'

import FontAwesome from 'react-fontawesome';

import {Route, Link, Switch, HashRouter} from 'react-router-dom';

import styles from './app.scss';

import 'font-awesome/scss/font-awesome.scss';
import 'basscss-margin/index.css';
import 'basscss-padding/index.css';
import 'basscss-layout/index.css';

import Connection from './connection';
import DRO from './dro';
import Commands from './commands';
import Login from './login';

import {PrivateRoute, PublicRoute} from "../routes";
import { shouldHandleLogin } from "../selectors";
import {authCheck} from "../action_creators";

class App extends React.Component {

    componentDidMount() {
        if(this.props.authEnabled) {
            this.props.checkAuth();
        }
    }

    render() {

        // let status_icon = <FontAwesome name='circle-o' size='lg'/>

        if (this.props.status === ConnectionStatus.CONNECTED) {
            status_icon = <FontAwesome name='circle' className={styles.activecircle} size='lg'/>;
        }

        let authenticated = <div/>;
        if(this.props.authenticated && this.props.auth_enabled) {
            authenticated =
              <div className="right">
                  <span>
                      <FontAwesome name='user-o' size='lg'/>
                      Logged in as: {this.props.username}.
                  </span>
                  <Link to={`logout`}>
                      <span>Logout</span>
                  </Link>
              </div>;
        }

        return (
            <HashRouter history={this.props.history}>
                <Layout style={{height: '100vh'}}>
                    <Sider style={{overflow: 'auto'}}>
                        <div className="logo">
                            <ReactSVG path={logo} className="m1"/>
                        </div>
                        <Menu theme="dark" mode="inline" className={styles.fawrapper}>
                            <Menu.Item key="1">
                                <Link to={`connection`}>
                                    {status_icon}
                                    <span className="pl1  h5">Connection</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`position`}>
                                    <FontAwesome name='arrows' size='lg'/>
                                    <span className="pl1 h5">Position</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to={`commands`}>
                                    <FontAwesome name='terminal' size='lg'/>
                                    <span className="pl1 h5">Command</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            {authenticated}
                        </Header>
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <div style={{padding: 24, textAlign: 'center'}}>
                                <Switch>
                                    <Route path='/login' exact component={Login} />
                                    <PrivateRoute path='/position' exact component={DRO} authed={this.props.authenticated} />
                                    <PrivateRoute path='/commands' exact component={Commands} authed={this.props.authenticated} />
                                    <PrivateRoute path='/' component={Connection} authed={this.props.authenticated} />
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            <a href="http://octocnc.org">OctoCNC</a> powered by <a href="http://octoprint.org">OctoPrint</a>.
                        </Footer>
                    </Layout>
                </Layout>
            </HashRouter>
        );
    }
}

const mapStateToProps = () => {
  return (state, props) => {
    return {
        authEnabled: state.config.user_management,
        authenticated: !shouldHandleLogin()(state,props),
        username: state.auth.username,
        status: state.devices.status
    };
}};

App.defaultProps = {
  authenticated: false
};

App.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
        checkAuth: authCheck
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
