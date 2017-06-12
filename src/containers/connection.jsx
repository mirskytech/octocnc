import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestDeviceConnections} from "../action_creators";
import ReactSVG from "react-svg";
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
}

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
        this.props.updateDeviceInfo();
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

    render() {
        let ready = !!this.state.device && !!this.state.port && !!this.state.speed;
        console.log("ready: " + ready);

        let button = null;
        if(!this.props.connected) {
            button = <Button style={buttonStyle} disabled={!ready} basic color="green">Connect</Button>
        } else {
            button = <Button style={buttonStyle} inverted color="green">Disconnect</Button>
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
    baudrates: [],
    ports: [],
    devices: [],
    connected: false
};

Connection.propTypes = {
    baudrates: React.PropTypes.array.isRequired,
    ports: React.PropTypes.array.isRequired,
    devices: React.PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateDeviceInfo: requestDeviceConnections
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
