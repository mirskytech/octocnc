import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Axis from './axis';
import {ConnectionStatus} from "enums";

import './dro.scss';
import ManualCommand from "../commands/manual_command";
import {Button, Row, Col, Input, Slider, InputNumber} from 'antd';
import {homeMachine, linearMove, setPositioning} from "../../action_creators";
import DialPad from "./dialpad";
import {Decimal} from "decimal.js";
import {Positioning} from "../../enums";


class DRO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            feedRate: this.props.feedMin,
            nextX: null,
            nextY: null,
            nextZ: null,
            active: null
        };
    }

    onFeedRateChange = (val) => {
        this.setState({
            'feedRate': val
        })
    };

    isActivePositioning = (p) => {
        return this.props.positionType == p ? 'primary' : '';
    };

    onGo = (e) => {
      this.props.linearMove(this.state.nextX, this.state.nextY, this.state.nextZ, this.state.feedRate);
      this.setState({
          'nextX': null,
          'nextY': null,
          'nextZ': null,
          'active': null
      })
    };

    numberPress = (number) => {
        if(this.state.active != null) {
            let new_state = {};
            let active_axis = 'next' + this.state.active;

            let sign = this.state[active_axis] >= 0 ? 1 : -1;

            let val = Math.abs(this.state[active_axis]);
            let dval = new Decimal(val).times(100);
            let sval = dval.toDecimalPlaces(2).toString();

            if(sval.length < 6) {
                sval = sval + number.toString().slice(-6);
                new_state[active_axis] = new Decimal(sval).dividedBy(100).times(sign);
                this.setState(new_state);
            }
        }
    };

    invertSign = () => {
        if(this.state.active != null) {
            let new_state = {};
            new_state['next' + this.state.active] = -1 * this.state['next' + this.state.active];
            this.setState(new_state);
        }
    };

    clearValue = () => {
        if(this.state.active != null) {
            let new_state = {};
            new_state['next' + this.state.active] = null;
            this.setState(new_state);
        }
    };

    onAxisClick = (e, axis) => {
        if(this.state.active !== axis) {
            let new_state = {};
            new_state['active'] = axis;
            new_state['next' + axis] = null;
            this.setState(new_state);
        }
    };

    isAxisActive = (axis) => {
        return axis === this.state.active ? "clickable-axis active" : "clickable-axis";
    };

    isMoveAllowed = () => {
        return this.state.nextX != null || this.state.nextY != null || this.state.nextZ != null;
    };

    render() {

        return (
            <Row type="flex" justify="center" align="middle">
                <Col span={3}>
                    <div style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                        <Row className={'m2'}>
                            <Button
                                type={this.isActivePositioning(Positioning.ABSOLUTE)}
                                onClick={() => this.props.setPositioning(Positioning.ABSOLUTE)}
                                >ABS</Button>
                        </Row>
                        <Row className={'m2'}>
                            <Button
                                type={this.isActivePositioning(Positioning.INCREMENTAL)}
                                onClick={() => this.props.setPositioning(Positioning.INCREMENTAL)}>INCR</Button>
                        </Row>
                        <Row className={'m2'}>
                            <Button
                                type={this.isActivePositioning(Positioning.RELATIVE)}
                                onClick={() => this.props.setPositioning(Positioning.RELATIVE)}
                                >REL</Button>
                        </Row>
                    </div>
                </Col>
                <Col span={7}>
                    <div className={'p1 m1 dro-panel'}>
                        <div>Current</div>
                        <Axis title='X' value={this.props.xPosition} active={this.props.active}/>
                        <Axis title='Y' value={this.props.yPosition} active={this.props.active}/>
                        <Axis title='Z' value={this.props.zPosition} active={this.props.active}/>
                        <Button onClick={this.props.homeMachine}>Home</Button>

                    </div>
                </Col>
                <Col span={7}>
                    <Row className={'p1 m1 dro-panel'}>
                        <div>Next</div>
                        <div className={this.isAxisActive('X')} onClick={(e) => this.onAxisClick(e,'X')}>
                            <Axis value={this.state.nextX} active={this.props.active}/>
                        </div>
                        <div className={this.isAxisActive('Y')} onClick={(e) => this.onAxisClick(e, 'Y')}>
                            <Axis value={this.state.nextY} active={this.props.active}/>
                        </div>
                        <div className={this.isAxisActive('Z')} onClick={(e) => this.onAxisClick(e, 'Z')}>
                            <Axis value={this.state.nextZ} active={this.props.active}/>
                        </div>
                        <Row type="flex" justify="center" align="middle">
                            <Col span={10}>
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
                        <Button onClick={this.onGo} disabled={!this.isMoveAllowed()}>Go</Button>
                    </Row>
                </Col>
                <Col span={7}>
                    <div className={'p1 m1 dro-panel'}>
                        <DialPad numberPressed={this.numberPress} invertSign={this.invertSign} clearPressed={this.clearValue}/>
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
        active: state.devices.status === ConnectionStatus.CONNECTED,
        positionType: state.position.type
    };
}

DRO.defaultProps = {
    xPosition: 0.0,
    yPosition: 0.0,
    zPosition: 0.0,
    active: false,
    feedMin: 10,
    feedMax: 300,
    positionType: Positioning.ABSOLUTE
};

DRO.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    zPosition: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        linearMove: linearMove,
        setPositioning: setPositioning,
        homeMachine: homeMachine
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DRO);
