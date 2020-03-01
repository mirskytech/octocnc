import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Axis from './axis';
import {ConnectionStatus} from "enums";

import './dro.scss';
import {Button, Row, Col, Input, Slider, InputNumber} from 'antd';
import * as actions from "../../action_creators";
import DialPad from "./dialpad";
import {Decimal} from "decimal.js";
import {Positioning, Units} from "../../enums";


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
        return this.props.positionType === p ? 'primary' : '';
    };

    onGo = (e) => {
      this.props.linearMove(this.state.nextX, this.state.nextY, this.state.nextZ, this.state.feedRate);
      if(this.props.positionType !== Positioning.RELATIVE) {
          this.setState({
              'nextX': null,
              'nextY': null,
              'nextZ': null,
              'active': null
          });
      }
    };

    numberPress = (number) => {
        if(this.state.active != null) {
            let new_state = {};
            let active_axis = 'next' + this.state.active;

            let sign = this.state[active_axis] >= 0 ? 1 : -1;

            let val = Math.abs(this.state[active_axis]);
            let dval = new Decimal(val).times(this.props.units === Units.METRIC ? 100 : 1000);
            let sval = dval.toDecimalPlaces(this.props.units === Units.METRIC ? 2 : 3).toString();

            if(sval.length < 6) {
                sval = sval + number.toString().slice(-6);
                new_state[active_axis] = new Decimal(sval).dividedBy(this.props.units === Units.METRIC ? 100 : 1000).times(sign);
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

    isActiveUnits = (u) => {
      return this.props.units === u ? 'primary' : '';
    };

    setUnits = (u) => {
        if(this.props.units !== u) {

            let f = u === Units.METRIC ?  25.4 : 1/25.4;

            if(this.state.nextX != null) {
                this.setState({nextX: this.state.nextX * f})
            }
        }

        this.props.setUnits(u);
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
                                disabled={!this.props.active}
                                >ABS</Button>
                        </Row>
                        <Row className={'m2'}>
                            <Button
                                type={this.isActivePositioning(Positioning.INCREMENTAL)}
                                onClick={() => this.props.setPositioning(Positioning.INCREMENTAL)}
                                disabled={true}
                                >INCR</Button>

                        </Row>
                        <Row className={'m2'}>
                            <Button
                                type={this.isActivePositioning(Positioning.RELATIVE)}
                                onClick={() => this.props.setPositioning(Positioning.RELATIVE)}
                                disabled={!this.props.active}
                                >REL</Button>
                        </Row>
                    </div>
                    <div style={{background: 'white', borderRadius:10}} className={'p1 m1'}>
                        <Row className={'m2'}>
                            <Button
                                type={this.isActiveUnits(Units.ANSI)}
                                onClick={() => this.setUnits(Units.ANSI)}
                                disabled={!this.props.active}
                            >in</Button>
                        </Row>
                        <Row className={'m2'}>
                            <Button
                                type={this.isActiveUnits(Units.METRIC)}
                                onClick={() => this.setUnits(Units.METRIC)}
                                disabled={!this.props.active}
                            >mm</Button>
                        </Row>
                    </div>
                </Col>
                <Col span={7}>
                    <div className={'p1 m1 dro-panel'}>
                        <div>Current</div>
                        <Axis title='X' value={this.props.xPosition} active={this.props.active} units={this.props.units} />
                        <Axis title='Y' value={this.props.yPosition} active={this.props.active} units={this.props.units} />
                        <Axis title='Z' value={this.props.zPosition} active={this.props.active} units={this.props.units} />
                        <Button onClick={this.props.homeMachine}>Home</Button>

                    </div>
                </Col>
                <Col span={7}>
                    <Row className={'p1 m1 dro-panel'}>
                        <div>Next</div>
                        <div className={this.isAxisActive('X')} onClick={(e) => this.onAxisClick(e,'X')}>
                            <Axis value={this.state.nextX} active={this.props.active} units={this.props.units} />
                        </div>
                        <div className={this.isAxisActive('Y')} onClick={(e) => this.onAxisClick(e, 'Y')}>
                            <Axis value={this.state.nextY} active={this.props.active} units={this.props.units} />
                        </div>
                        <div className={this.isAxisActive('Z')} onClick={(e) => this.onAxisClick(e, 'Z')}>
                            <Axis value={this.state.nextZ} active={this.props.active}units={this.props.units} />
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
                                <span>{this.props.units === Units.METRIC ? 'mm/min' : 'in/min'}</span>
                            </Col>

                        </Row>
                        <Button className="go mt2" onClick={this.onGo} disabled={!this.isMoveAllowed()}>Go</Button>
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
        positionType: state.position.type,
        units: state.position.units
    };
}

DRO.defaultProps = {
    xPosition: 0.0,
    yPosition: 0.0,
    zPosition: 0.0,
    active: false,
    feedMin: 10,
    feedMax: 300,
    positionType: Positioning.ABSOLUTE,
    units: Units.METRIC
};

DRO.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    zPosition: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        linearMove: actions.linearMove,
        setPositioning: actions.setPositioning,
        setUnits: actions.setUnits,
        homeMachine: actions.homeMachine
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DRO);
