import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestDeviceConnections} from "../action_creators";
import ReactSVG from "react-svg";
import {Dropdown} from "semantic-ui-react";

type Props = {

};

const iconStyle = {
    'width':'36px',
    'float':'left'
};

class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.props.updateDeviceInfo();
    }

    render() {

        console.log(this.props.devices);

        return (
        <div>
            <h3>Connections<img src={this.props.plugin_uri + 'imgs/connection.svg'} style={iconStyle}/></h3>
            <Dropdown placeholder='Select Device' fluid selection options={this.props.devices} />
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateDeviceInfo: requestDeviceConnections
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
