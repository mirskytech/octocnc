// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {connectToDevice, disconnectFromDevice, requestDeviceConnections} from "action_creators";
import {ConnectionStatus} from "../enums";
import {Button, Select} from "antd";
import type {Device} from "../types";

const iconStyle = {
    'width':'24px',
    'marginRight':'10px',
    'float':'left'
};

const buttonStyle = {
    'marginTop':'5px'
};

class Connection extends React.Component {

    state: {
        device: string,
        port: string,
        speed: string
    };

    constructor(props) {
        super(props);
        this.state = {
            device: '',
            port: '',
            speed: ''
        };
    }

    componentDidMount() {
        this.props.update();
    }

    deviceSelection = (value, option) => {
        this.setState({'device': value});
    };

    portSelection = (value) => {
        this.setState({'port': value});
    };

    speedSelection = (value) => {
        this.setState({'speed': value});
    };

    connect = (e, d) => {
        this.props.connect(this.state.port, this.state.device, this.state.speed);
    };

    render() {

        let ready = !!this.state.device && !!this.state.port && !!this.state.speed;

        let button = null;

        switch(this.props.status) {
            case ConnectionStatus.DISCONNECTED:
            case ConnectionStatus.CONNECTING:
                button = <Button style={buttonStyle}
                             disabled={!ready}
                             loading={this.props.status === ConnectionStatus.CONNECTING}
                             onClick={this.connect}>Connect</Button>;
                break;
            case ConnectionStatus.CONNECTED:
            case ConnectionStatus.DISCONNECTING:
            default:
                button = <Button style={buttonStyle}
                             disabled={this.props.status !== ConnectionStatus.CONNECTED}
                             loading={this.props.status === ConnectionStatus.DISCONNECTING}
                             onClick={this.props.disconnect}>Disconnect</Button>;
        }

        let enabled = this.props.status === ConnectionStatus.DISCONNECTED;

        return (
        <div>
            <h3>Connections<img src={this.props.plugin_uri + 'imgs/connection.svg'} style={iconStyle}/></h3>
            <Select placeholder="Select Profile" style={{ width: 120 }} onSelect={this.deviceSelection}>
                {this.props.devices.map( (device:Device, idx) => { return (<Select.Option key={idx} value={device.id}>{device.name}</Select.Option>) })}
            </Select>
            <Select placeholder="Select Speed" style={{ width: 120 }} onSelect={this.speedSelection}>
                {this.props.rates.map( (rate, idx) => { return (<Select.Option key={idx} value={`${rate.value}`}>{rate.text}</Select.Option>) })}
            </Select>
            <Select placeholder="Select Port" style={{ width: 120 }} onSelect={this.portSelection}>
                {this.props.ports.map( (port, idx) => { return (<Select.Option key={idx} value={port.value}>{port.text}</Select.Option>) })}
            </Select>
            {button}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        plugin_uri:state.config.plugin_uri,
        devices:state.devices.devices,
        rates:state.devices.baudrates,
        ports:state.devices.ports,
        status:state.devices.status
    };
}

Connection.defaultProps = {
    plugin_uri: '',
    rates: [],
    ports: [],
    devices: [],
    status: ConnectionStatus.DISCONNECTED
};

Connection.propTypes = {
    plugin_uri: PropTypes.string.isRequired,
    rates: PropTypes.array.isRequired,
    ports: PropTypes.array.isRequired,
    devices: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        update: requestDeviceConnections,
        connect: connectToDevice,
        disconnect: disconnectFromDevice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
