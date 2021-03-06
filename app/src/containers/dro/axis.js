import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Digit from './digit';
import Decimal from './decimal';
import {Colors, Units} from 'enums';
import {Button, Row, Col} from 'antd';


class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }


    pad = (n, width, z) => {
        let padded = n.toString().split('');
        while(padded.length < width) {
            padded.unshift(null);
        }
        return padded;
    };

    render() {

        let majorValue = new Array(5).fill(null);
        let minorValue = new Array(3).fill(null);
        let sign = null;

        if(this.props.active && this.props.value != null) {

            let fixedValue = Math.abs(this.props.value).toFixed(3).split('.');
            majorValue = this.pad(fixedValue[0], 5, '0');
            minorValue = fixedValue[1];

            sign = this.props.value >= 0 ? '+' : '-';
        }



        return (
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        {this.props.title != null ?
                        <Digit value={this.props.title}
                               className={'title'}
                               backgroundColor='#ffffff'
                               fillColor={this.props.active ? Colors.darkBlue.color : Colors.lightGray.color} /> : <span></span>}
                        <Digit value={sign}/>
                        {this.props.units === Units.METRIC ? <Digit value={majorValue[1]} /> : ''}
                        <Digit value={majorValue[2]} />
                        <Digit value={majorValue[3]} />
                        <Digit value={majorValue[4]} />
                        <Decimal active={this.props.active} />
                        <Digit value={minorValue[0]} />
                        <Digit value={minorValue[1]} />
                        {this.props.units === Units.METRIC ? '' : <Digit value={minorValue[2]} />}
                        <Digit value={this.props.units === Units.METRIC ? 'm' : 'i'}
                               className={'units'}
                               backgroundColor='#ffffff'
                               fillColor={this.props.active ? Colors.darkBlue.color : Colors.lightGray.color} />
                        <Digit value={this.props.units === Units.METRIC ? 'm' : 'n'}
                               className={'units'}
                               backgroundColor='#ffffff'
                               fillColor={this.props.active ? Colors.darkBlue.color : Colors.lightGray.color} />
                    </Col>
                </Row>
        )
    }
}

Axis.defaultProps ={
    title: null,
    active: false,
    units: Units.METRIC
};

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Axis);
