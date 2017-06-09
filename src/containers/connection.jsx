import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestDeviceConnections} from "../action_creators";

type Props = {

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
        return (
        <div>my connections</div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateDeviceInfo: requestDeviceConnections
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
