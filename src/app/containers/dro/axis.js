import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Digit from './digit';
import Decimal from './decimal';
import {Colors} from 'enums';
import {Button, Row, Col} from 'antd';


class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    pad(n, width, z) {
        while(n.length<width) {
            n = '' + z + n;
        }
        return n;
    }

    render() {

        let fixedValue = this.props.value.toFixed(3).split('.');
        let majorValue = this.pad(fixedValue[0],5,'0');
        let minorValue = fixedValue[1];

        let sign = this.props.value >= 0 ? '+' : '-';


        return (
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        <Digit value={this.props.title}
                               style={{marginRight:20}}
                               backgroundColor='#ffffff'
                               fillColor={Colors.darkBlue.color} />
                        <Digit value={sign}/>
                        <Digit value={majorValue[0]} />
                        <Digit value={majorValue[1]} />
                        <Digit value={majorValue[2]} />
                        <Digit value={majorValue[3]} />
                        <Digit value={majorValue[4]} />
                        <Decimal />
                        <Digit value={minorValue[0]} />
                        <Digit value={minorValue[1]} />
                        <Digit value={minorValue[2]} />
                    </Col>
                    <Col>
                        <Button type="primary" ghost={true}>Zero Set</Button>
                    </Col>
                </Row>
        )
    }
}

Axis.defaultProps ={
    title: null,
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
