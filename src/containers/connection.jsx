import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {connectToDevice, requestDeviceConnections} from "../action_creators";
import {Button, Dropdown} from "semantic-ui-react";

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
            speed: '',
            connecting: false
        };
    }

    componentDidMount() {
        this.props.update();
    }

    deviceSelection(event, data) {
        this.setState({'device': data.value});
    }

    portSelection(event, data) {
        this.setState({'port': data.value});
    }

    speedSelection(event, data) {
        this.setState({'speed': data.value});
    }

    connect = (e, d) => {
        this.props.connect(this.state.port, this.state.device, this.state.speed);
        this.setState({'connecting':true});
    };

    disconnect = (e, d) => {

    };

    render() {
        let ready = !!this.state.device && !!this.state.port && !!this.state.speed;

        let button = null;
        if(!this.props.connected) {
            button = <Button style={buttonStyle}
                             disabled={!ready}
                             loading={this.state.connecting}
                             color="green"
                             onClick={this.connect}>Connect</Button>
        } else {
            button = <Button style={buttonStyle}
                             inverted
                             color="green"
                             onClick={this.disconnect}>Disconnect</Button>
        }

        return (
        <div>
            <h3>Connections<img src={this.props.plugin_uri + 'imgs/connection.svg'} style={iconStyle}/></h3>
            <Dropdown className="mt2" placeholder='Select Device' fluid selection options={this.props.devices} onChange={this.deviceSelection.bind(this)}/>
            <Dropdown className="mt1" placeholder='Select Port' fluid selection options={this.props.ports} onChange={this.portSelection.bind(this)}/>
            <Dropdown className="mt1" placeholder='Select Speed' fluid selection options={this.props.baudrates} onChange={this.speedSelection.bind(this)}/>
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
        ports:state.devices.ports
    };
}

Connection.defaultProps = {
    plugin_uri: '',
    baudrates: [],
    ports: [],
    devices: [],
    connected: false
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
        connect: connectToDevice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
