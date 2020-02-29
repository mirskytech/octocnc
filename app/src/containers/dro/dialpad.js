import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/es/button/button";
import {Col, Row} from "antd";



class DialPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {

        return (
            <div className={'dialpad'}>
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(1)}>1</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(2)}>2</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(3)}>3</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(4)}>4</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(5)}>5</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(6)}>6</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(7)}>7</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(8)}>8</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(9)}>9</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        <Button className={'key'} onClick={this.props.clearPressed}>CLR</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={() => this.props.numberPressed(0)}>0</Button>
                    </Col>
                    <Col>
                        <Button className={'key'} onClick={this.props.invertSign}>+/-</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

DialPad.defaultProps = {
    numberPressed: (num) => {console.log("button pressed: " + num)},
    clearPressed: () => {console.log("clear pressed")},
    deletePressed: () => {console.log("delete pressed")},
    invertSign: () => {console.log("invert sign")}
};

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialPad);
