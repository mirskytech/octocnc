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

        if(this.props.status === undefined) {
            return(
                <div>
                    <h3>Waiting for connection status...</h3>
                </div>
            );
        }

        if(this.props.status === ConnectionStatus.CONNECTED) {
            return(
                <div>
                    <h3>Device Connected</h3>
                    <p>{this.props.current.device}</p>
                    <p>{this.props.current.port}</p>
                    <Button style={buttonStyle}
                            disabled={this.props.status !== ConnectionStatus.CONNECTED}
                            loading={this.props.status === ConnectionStatus.DISCONNECTING}
                            onClick={this.props.disconnect}>Disconnect
                    </Button>
                </div>
            )
        }

        let ready = !!this.state.device && !!this.state.port && !!this.state.speed;

        return (
        <div>
            <h3>Connect to Device<img src={this.props.plugin_uri + 'imgs/connection.svg'} style={iconStyle}/></h3>
            <Select placeholder="Select Profile" style={{ width: 120 }} onSelect={this.deviceSelection}>
                {this.props.devices.map( (device:Device, idx) => { return (<Select.Option key={idx} value={device.id}>{device.name}</Select.Option>) })}
            </Select>
            <Select placeholder="Select Speed" style={{ width: 120 }} onSelect={this.speedSelection}>
                {this.props.rates.map( (rate, idx) => { return (<Select.Option key={idx} value={`${rate.value}`}>{rate.text}</Select.Option>) })}
            </Select>
            <Select placeholder="Select Port" style={{ width: 120 }} onSelect={this.portSelection}>
                {this.props.ports.map( (port, idx) => { return (<Select.Option key={idx} value={port.value}>{port.text}</Select.Option>) })}
            </Select>
            <Button style={buttonStyle} disabled={!ready} loading={this.props.status === ConnectionStatus.CONNECTING} onClick={this.connect}>Connect</Button>
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
        status:state.devices.status,
        current:state.devices.current
    };
}

Connection.defaultProps = {
    plugin_uri: '',
    rates: [],
    ports: [],
    devices: [],
    status: undefined,
    current: null
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
