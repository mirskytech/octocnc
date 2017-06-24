import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestSystemCommands} from "action_creators";

import {Timeline, Row, Col, Button} from 'antd';
import FontAwesome from 'react-fontawesome';

import CustomScroll from 'react-custom-scroll';
import './window.scss';
import {Colors, CommandStatus} from "../../enums";

const commandStyle = {
    textAlign:'left',
    fontFamily: 'monospace',
    fontSize:16
};

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
        this.scrollable  = null;
    }

    componentDidMount() {
        this.props.getCommands();
    }

    createDot = (status) => {
        switch(status) {
            case CommandStatus.COMPLETED:
                return(<FontAwesome name='circle-o' size='2x' style={{color:Colors.darkBlue.color}}/>);
            case CommandStatus.ACTIVE:
                return(<FontAwesome name='circle-o-notch' size='2x' spin={true} style={{color:Colors.goldenRod.color}}/>);
            case CommandStatus.ERROR:
                return(<FontAwesome name='circle-o' size='2x' style={{color:Colors.paradisePink.color}}/>);
            case CommandStatus.SKIPPED:
                return(<FontAwesome name='circle-o' size='2x' style={{color:Colors.lightGray.color}}/>);
            case CommandStatus.PENDING:
            default:
                return(<FontAwesome name='circle-o' size='2x' style={{color:'rgba(0,0,0,0.1)'}}/>);

        }
    };

    render() {

        return (
        <div>
            <Row>
                <Col span={12} style={columnStyle}>
                    <h3>Commands</h3>
                    <div style={windowStyle}>
                        <CustomScroll heightRelativeToParent="100%">
                            <Timeline>
                                {
                                    this.props.commands.map((command, idx) => {
                                        return(<Timeline.Item dot={this.createDot(command.status)} style={commandStyle} key={idx}>{command.command}</Timeline.Item>)
                                    })
                                }
                            </Timeline>
                        </CustomScroll>
                        <div>
                            <Button>
                                Run
                                <FontAwesome name='play'/>
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col span={12} style={columnStyle}>
                    <h3>Machine</h3>
                    <div style={windowStyle}>
                    <CustomScroll heightRelativeToParent="100%">
                        <Timeline>
                            {
                                this.props.commands.map((command, idx) => {
                                    return(<Timeline.Item dot={this.createDot(command.status)} style={commandStyle} key={idx}>{command.command}</Timeline.Item>)
                                })
                            }
                        </Timeline>
                    </CustomScroll>
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
