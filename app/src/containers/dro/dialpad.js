import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/es/button/button";



class Dialpad extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {

        return (
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        <Button>1</Button>
                    </Col>
                    <Col>
                        <Button>2</Button>
                    </Col>
                    <Col>
                        <Button>3</Button>
                    </Col>
                </Row>
        )
    }
}

Dialpad.defaultProps ={

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
