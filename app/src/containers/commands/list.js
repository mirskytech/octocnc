import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import CustomScroll from 'react-custom-scroll';
import {Alert, Timeline} from 'antd';
import Moment from 'react-moment';

import {Colors, CommandStatus, ConnectionStatus} from "enums";

import './list.scss';
import 'react-custom-scroll/dist/customScroll.css'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    createDot = (status) => {
        switch(status) {
            case CommandStatus.COMPLETED:
                return(<FontAwesomeIcon icon={faCircle} size='1x' style={{color:Colors.darkBlue.color}}/>);
            case CommandStatus.ACTIVE:
                return(<FontAwesomeIcon icon={faCircleNotch} size='1x' spin={true} style={{color:Colors.goldenRod.color}}/>);
            case CommandStatus.ERROR:
                return(<FontAwesomeIcon icon={faCircle} size='1x' style={{color:Colors.paradisePink.color}}/>);
            case CommandStatus.SKIPPED:
                return(<FontAwesomeIcon icon={faCircle} size='1x' style={{color:Colors.lightGray.color}}/>);
            case CommandStatus.PENDING:
            default:
                return(<FontAwesomeIcon icon={faCircle} size='1x' style={{color:'rgba(0,0,0,0.1)'}}/>);

        }
    };

    render() {

        if(!this.props.connected) {
            return (
              <CustomScroll heightRelativeToParent="100%">
                  <Alert message="disconnected" type="success   "/>
              </CustomScroll>);
        }

        if(this.props.commands.length < 1) {
            return (
              <CustomScroll heightRelativeToParent="100%">
                  <h6>empty command set.</h6>
              </CustomScroll>);
        }

        return (
            <CustomScroll keepAtBottom={true} heightRelativeToParent="100%">
                <Timeline className={'commandList'}>
                {
                    this.props.commands.map((command, idx) => {
                        return(
                            <Timeline.Item
                              dot={this.createDot(command.status)}
                              key={idx}
                              className={'commandItem'}>
                                <span className={"command"}>
                                    {command.command}
                                </span>
                                <span className={'date'}>
                                    <Moment fromNow>{command.date}</Moment>
                                </span>
                            </Timeline.Item>)
                    })
                }
                </Timeline>
            </CustomScroll>
        );
    }
}

function mapStateToProps(state) {
    return {
        connected: state.devices.status === ConnectionStatus.CONNECTED
    };
}

List.defaultProps = {

};

List.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
