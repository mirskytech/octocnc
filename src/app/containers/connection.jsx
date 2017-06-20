import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {connectToDevice, disconnectFromDevice, requestDeviceConnections} from "action_creators";
import {ConnectionState} from "../enums";
import {Button, Select} from "antd";

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
            <Select placeholder="Select Profile" style={{ width: 120 }} onSelect={this.deviceSelection}>
                {this.props.devices.map( (device, idx) => { return (<Select.Option key={idx} value={device.value}>{device.text}</Select.Option>) })}
            </Select>
            <Select placeholder="Select Speed" style={{ width: 120 }} onSelect={this.speedSelection}>
                {this.props.rates.map( (device, idx) => { return (<Select.Option key={idx} value={`${device.value}`}>{device.text}</Select.Option>) })}
            </Select>
            <Select placeholder="Select Port" style={{ width: 120 }} onSelect={this.portSelection}>
                {this.props.ports.map( (device, idx) => { return (<Select.Option key={idx} value={device.value}>{device.text}</Select.Option>) })}
            </Select>


            {/*<Select className="mt1" disabled={!enabled} placeholder='Select Port' fluid selection options={this.props.ports} onChange={this.portSelection}/>*/}
            {/*<Select className="mt1" disabled={!enabled} placeholder='Select Speed' fluid selection options={this.props.baudrates} onChange={this.speedSelection}/>*/}
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
    status: ConnectionState.DISCONNECTED
};

Connection.propTypes = {
    plugin_uri: React.PropTypes.string.isRequired,
    rates: React.PropTypes.array.isRequired,
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
