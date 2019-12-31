import {Component} from "react";
import {Button, Input, Row, Col} from "antd";
import React from "react";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

import { ConnectionStatus } from "../../enums";
import {sendCommand} from "../../action_creators";


class ManualCommand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            command:''
        };
    }

    handleChange = (e) => {
        this.setState({command:e.target.value})
    };


    handleSend = () => {
        this.props.sendCommand(this.state.command);
        this.setState({command:''});
    };

    handleEnter = (e) => {
        if(e.key === 'Enter') {
            this.handleSend();
        }
    };

    render() {
        return (
            <div className={'mt4'}>
                <Row type="flex" justify="center" align="middle">
                    <Col span={6}>
                        <Input
                            value={this.state.command}
                            className={'commandInput'}
                            placeholder="gcode"
                            onChange={this.handleChange}
                            onKeyPress={this.handleEnter}
                            disabled={!this.props.active}/>
                    </Col>
                    <Col>
                        <Button onClick={this.handleSend} disabled={!this.props.active}>Go</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        commands: state.commands.available_commands,
        history: state.commands.history,
        active: state.devices.status === ConnectionStatus.CONNECTED
    };
}

ManualCommand.defaultProps = {
    commands: [],
    history: [],
    active: false
};

ManualCommand.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendCommand: sendCommand
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManualCommand);
