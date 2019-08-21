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

import Connection from './connection';
import DRO from './dro';
import Commands from './commands';
import {PrivateRoute, PublicRoute} from "../routes";

class App extends React.Component {

    render() {

        let status_icon = <FontAwesome name='circle-o' size='lg'/>

        if (this.props.status === ConnectionStatus.CONNECTED) {
            status_icon = <FontAwesome name='circle' className={styles.activecircle} size='lg'/>;
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
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <div style={{padding: 24, textAlign: 'center'}}>

                                <div>
                                    {/*<ul>*/}
                                        {/*<li><Link to="/">Home</Link></li>*/}
                                        {/*<li><Link to="/about">About</Link></li>*/}
                                        {/*<li><Link to="/topics">Topics</Link></li>*/}
                                    {/*</ul>*/}
                                    {/*<hr/>*/}
                                    <Switch>
                                        <Route path='/login' exact render={() => {
                                            return (<h1>login</h1>)
                                        }}/>
                                        <PrivateRoute path='/position' exact component={DRO} authed={this.props.auth} />
                                        <PrivateRoute path='/commands' exact component={Commands} authed={this.props.auth} />
                                        <PrivateRoute path='/' component={Connection} authed={this.props.auth} />
                                    </Switch>
                                </div>

                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            OctoCNC powered by OctoPrint
                        </Footer>
                    </Layout>
                </Layout>
            </HashRouter>
        );
    }
}



// class App extends React.Component {
//
//     render() {
//         return (
//           <div>
//               <HashRouter history={this.props.history}>
//               <div>
//               <ul>
//                   <li><Link to="/">Home</Link></li>
//                   <li><Link to="/about">About</Link></li>
//                   <li><Link to="/topics">Topics</Link></li>
//               </ul>
//               <hr/>
//               <Switch>
//                   <Route path='/' exact component={Connection} />
//                   <Route path='/about' exact render={()=>{ return(<h1>about</h1>)}}/>
//                   <Route path='/topics' exact render={()=>{ return(<h1>topics</h1>)}}/>
//               </Switch>
//               </div>
//               </HashRouter>
//           </div>
//         );
//     }
// }


function mapStateToProps(state) {
    return {
        auth: false
    };
}

// App.defaultProps = {
//   // status: ConnectionStatus.DIS             <uunction mapStateToProps(state) {
//   return {
//     // status: state.devices.status
//   };
// }

App.defaultProps = {
  auth: false
};

App.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
