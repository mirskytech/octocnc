import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestSystemCommands} from "action_creators";

import {Timeline, Row, Col, Button} from 'antd';
import List from './list';

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

        };
    }

    componentDidMount() {

    }

    render() {

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
                        <List commands={this.props.commands}/>
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        commands: state.commands.available_commands
    };
}

CommandWindow.defaultProps = {
    commands: []
};

CommandWindow.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCommands:requestSystemCommands
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandWindow);
