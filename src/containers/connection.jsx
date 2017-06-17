import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {connectToDevice, disconnectFromDevice, requestDeviceConnections} from "../action_creators";
import {Button, Dropdown} from "semantic-ui-react";
import {ConnectionState} from "../enums";

type Props = {

};

const iconStyle = {
    'width':'24px',
    'marginRight':'10px',
    'float':'left'
};

const buttonStyle = {
    'marginTop':'5px'
};

class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device: '',
            state: '',
            speed: ''
        };
    }

    componentDidMount() {
        this.props.update();
    }

    deviceSelection = (event, data) => {
        this.setState({'device': data.value});
    };

    portSelection = (event, data) => {
        this.setState({'port': data.value});
    };

    speedSelection = (event, data) => {
        this.setState({'speed': data.value});
    };

    connect = (e, d) => {
        this.props.connect(this.state.port, this.state.device, this.state.speed);
    };

    render() {

        let ready = !!this.state.device && !!this.state.port && !!this.state.speed;

        let button = null;

        switch(this.props.status) {
            case ConnectionState.DISCONNECTED:
            case ConnectionState.CONNECTING:
                button = <Button style={buttonStyle}
                             disabled={!ready}
                             loading={this.props.status === ConnectionState.CONNECTING}
                             onClick={this.connect}>Connect</Button>;
                break;
            case ConnectionState.CONNECTED:
            case ConnectionState.DISCONNECTING:
            default:
                button = <Button style={buttonStyle}
                             disabled={this.props.status !== ConnectionState.CONNECTED}
                             loading={this.props.status === ConnectionState.DISCONNECTING}
                             onClick={this.props.disconnect}>Disconnect</Button>;
        }

        let enabled = this.props.status === ConnectionState.DISCONNECTED;

        return (
        <div>
            <h3>Connections<img src={this.props.plugin_uri + 'imgs/connection.svg'} style={iconStyle}/></h3>
            <Dropdown className="mt2" disabled={!enabled} placeholder='Select Device' fluid selection options={this.props.devices} onChange={this.deviceSelection}/>
            <Dropdown className="mt1" disabled={!enabled} placeholder='Select Port' fluid selection options={this.props.ports} onChange={this.portSelection}/>
            <Dropdown className="mt1" disabled={!enabled} placeholder='Select Speed' fluid selection options={this.props.baudrates} onChange={this.speedSelection}/>
            {button}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        plugin_uri:state.config.plugin_uri,
        devices:state.devices.devices,
        baudrates:state.devices.baudrates,
        ports:state.devices.ports,
        status:state.devices.status
    };
}

Connection.defaultProps = {
    plugin_uri: '',
    baudrates: [],
    ports: [],
    devices: [],
    status: ConnectionState.DISCONNECTED
};

Connection.propTypes = {
    plugin_uri: React.PropTypes.string.isRequired,
    baudrates: React.PropTypes.array.isRequired,
    ports: React.PropTypes.array.isRequired,
    devices: React.PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        update: requestDeviceConnections,
        connect: connectToDevice,
        disconnect: disconnectFromDevice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
