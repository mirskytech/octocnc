import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FontAwesome from 'react-fontawesome';
import CustomScroll from 'react-custom-scroll';
import {Timeline} from 'antd';

import {Colors, CommandStatus} from "enums";
import './list.scss';


const commandStyle = {
    textAlign:'left',
    fontFamily: 'monospace',
    fontSize:16
};

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
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
            <CustomScroll heightRelativeToParent="100%">
                <Timeline>
                {
                    this.props.commands.map((command, idx) => {
                        return(<Timeline.Item dot={this.createDot(command.status)} style={commandStyle} key={idx}>{command.command}</Timeline.Item>)
                    })
                }
                </Timeline>
            </CustomScroll>

        )
    }
}

function mapStateToProps(state) {
    return {

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
