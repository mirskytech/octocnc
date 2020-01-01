import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestSystemCommands, sendCommand} from "action_creators";

import { Row, Col } from 'antd';
import List from './list';
import { ConnectionStatus } from "enums";
import ManualCommand from './manual_command';

class CommandWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command:''
        };
    }

    render() {

        return (
        <div>
            <Row>
                <Col span={12} className='p1'>
                    <h3>Command Queue</h3>
                    <div className='commandWindow'>
                        <List commands={this.props.commands}/>
                    </div>
                </Col>
                <Col span={12} style={columnStyle}>
                    <h3>Command History</h3>
                    <div style={windowStyle}>
                        <List commands={this.props.history}/>
                    </div>
                </Col>
            </Row>
            <ManualCommand/>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        commands: state.commands.available_commands,
        history: state.commands.history,
        active: state.devices.status === ConnectionStatus.CONNECTED
    };
}

CommandWindow.defaultProps = {
    commands: [],
    history: [],
    active: false
};

CommandWindow.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCommands:requestSystemCommands,
        executeCommand:sendCommand
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandWindow);
