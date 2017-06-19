import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Digit from './digit';


class AxisDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div style={{height: 85}}>
                <Digit value={this.props.title} style={{marginRight:20}} backgroundColor='#ffffff' />
                <Digit value={2} fillColor='#6FC0DE' />
                <Digit value={3} fillColor='#6FC0DE'/>
                <Digit value={4} fillColor='#6FC0DE'/>
                <Digit value={5} fillColor='#6FC0DE'/>
            </div>
        )
    }
}

AxisDisplay.defaultProps ={
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

export default connect(mapStateToProps, mapDispatchToProps)(AxisDisplay);
