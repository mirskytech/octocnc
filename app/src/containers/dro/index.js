import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Axis from './axis';
import {ConnectionStatus} from "enums";

import './dro.scss';
import ManualCommand from "../commands/manual_command";
import {Button, Row, Col, Input, Slider, InputNumber} from 'antd';
import {linearMove} from "../../action_creators";
import DialPad from "./dialpad";


class DRO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'bio',
            count: 0,
            feedRate: this.props.feedMin,
            nextX:0,
            nextY:0,
            nextZ:0
        };

        this.active = 'bio';
    }

    onFeedRateChange = (val) => {
        this.setState({
            'feedRate': val
        })
    };

    onAxisSet = (e) => {

        const axis = 'next' + e.target.name;
        let newAxisVal = {};
        newAxisVal[axis] = e.target.value;
        this.setState(newAxisVal);
    };

    onGo = (e) => {
      this.props.linearMove(this.state.nextX, this.state.nextY, this.state.nextZ, this.state.feedRate);
    };

    onPadPress = (number) => {
        console.log(number);
    };

    render() {

        return (
            <Row type="flex" justify="center" align="middle">
                <Col span={3}>
                    <div style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                        <Row className={'m2'}>
                            <Button>ABS</Button>
                        </Row>
                        <Row className={'m2'}>
                            <Button>INCR</Button>
                        </Row>
                        <Row className={'m2'}>
                            <Button>REL</Button>
                        </Row>
                    </div>
                </Col>
                <Col span={7}>
                    <div style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                        <Axis title='X' value={this.props.xPosition} active={this.props.active}/>
                        <Axis title='Y' value={this.props.yPosition} active={this.props.active}/>
                        <Axis title='Z' value={this.props.zPosition} active={this.props.active}/>
                        <ManualCommand/>
                    </div>
                </Col>
                <Col span={7}>
                    <Row style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                        <Input className={'destination'} name={'X'} value={this.state.nextX} onChange={this.onAxisSet}/>
                        <Input className={'destination'} name={'Y'} value={this.state.nextY} onChange={this.onAxisSet}/>
                        <Input className={'destination'} name={'Z'} value={this.state.nextZ} onChange={this.onAxisSet}/>
                        <Row type="flex" justify="center" align="middle">
                            <Col span={14}>
                                <Slider
                                    min={this.props.feedMin}
                                    max={this.props.feedMax}
                                    value={this.state.feedRate}
                                    onChange={this.onFeedRateChange}
                                    step={10}
                                />
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    value={this.state.feedRate}
                                    onChange={this.onFeedRateChange}
                                />
                            </Col>
                            <Col span={2}>
                                <span>mm/min</span>
                            </Col>

                        </Row>
                        <Button onClick={this.onGo}>Go</Button>
                    </Row>
                </Col>
                <Col span={7}>
                    <div style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                        <DialPad/>
                    </div>
                </Col>
            </Row>

        );
    }
}

function mapStateToProps(state) {
    return {
        xPosition: state.position.X,
        yPosition: state.position.Y,
        zPosition: state.position.Z,
        active: state.devices.status === ConnectionStatus.CONNECTED
    };
}

DRO.defaultProps = {
    xPosition: 0.0,
    yPosition: 0.0,
    zPosition: 0.0,
    active: false,
    feedMin: 100,
    feedMax: 800
};

DRO.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    zPosition: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        linearMove: linearMove
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DRO);