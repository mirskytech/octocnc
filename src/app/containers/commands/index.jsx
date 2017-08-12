import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestSystemCommands, executeCommand} from "action_creators";

import {Input, Row, Col, Button} from 'antd';
import List from './list';
import {ConnectionStatus} from "../../enums";

const columnStyle = {
    padding: 10
};

const windowStyle = {
    background:'white',
    padding:10,
    height:300,
    borderRadius:10
};

class CommandWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command:''
        };
    }

    componentDidMount() {

    }

    setCommand = (e) => {
      this.setState({command:e.target.value})
    };


    sendCommand = () => {
      this.props.executeCommand(this.state.command);
      this.setState({command:''});
    };

    enterCommand = (e) => {
        if(e.key === 'Enter') {
            this.sendCommand();
        }
    };

    render() {
        if(this.props.history.length < 1) {
            return(
                <div>No commands at this time.</div>
            )
        }

        return (
        <div>
            <Row>
                <Col span={12} style={columnStyle}>
                    <h3>Commands</h3>
                    <div style={windowStyle}>
                        <List commands={this.props.commands}/>
                    </div>
                </Col>
                <Col span={12} style={columnStyle}>
                    <h3>Machine</h3>
                    <div style={windowStyle}>
                        <List commands={this.props.history}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Input
                        value={this.state.command}
                        placeholder="gcode"
                        onChange={this.setCommand}
                        onKeyPress={this.enterCommand}
                        disabled={!this.props.active}/>
                    <Button onClick={this.sendCommand} disabled={!this.props.active}>Go</Button>
                </Col>
            </Row>
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
        executeCommand:executeCommand
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandWindow);
