// @flow

import React from 'react';
import { Link } from 'react-router';
import {Segment, Menu, Grid, Icon} from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ConnectionState } from '../enums';

type Props = {
    children: Element<any>
};

const logoStyle = {
    'width': '175px',
    'marginBottom': '-11px',
    'marginTop':'-8px'
};

class App extends React.Component {

    handleItemClick() {
        console.log('has been clicked');
    }


    render() {

        let activeItem = "dash";

        let status_icon = <Icon inverted name='circle thin' />;

        if(this.props.status === ConnectionState.CONNECTED) {
            status_icon = <Icon inverted color='green' name='circle' />;
        }

        return (
                <div className="ui twelve column centered grid">
                    <div className="twelve wide column">
                    <Menu inverted>
                        <Menu.Item>
                            <img src={'/plugin/octocnc/static/' + 'imgs/octocnc-logo.svg'} style={logoStyle}/>
                        </Menu.Item>
                        <Menu.Item name='Dash' active={activeItem === 'dash'}>
                            <Link to="dash">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item name='B' active={activeItem === 'b'} onClick={this.handleItemClick} />
                        <Menu.Item name='C' active={activeItem === 'c'} onClick={this.handleItemClick} />
                        <Menu.Menu position='right'>
                          <Menu.Item name="status">{this.props.status.name.toLowerCase()} {status_icon}</Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    <Segment>
                        {this.props.children}
                    </Segment>
                    </div>
                </div>
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
