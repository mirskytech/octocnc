import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Digit from './digit';
import COLORS from '../constants';


class AxisDisplay extends React.Component {
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
        console.log(fixedValue);
        console.log(majorValue[0]);
        let minorValue = fixedValue[1];

        let sign = this.props.value >= 0 ? '+' : '-';


        return (
            <div style={{height: 85}}>
                <Digit value={this.props.title} style={{marginRight:20}} backgroundColor='#ffffff' />
                <Digit value={sign} fillColor='#6FC0DE' />
                <Digit value={majorValue[0]} fillColor='#6FC0DE' />
                <Digit value={majorValue[1]} fillColor='#6FC0DE'/>
                <Digit value={majorValue[2]} fillColor='#6FC0DE'/>
                <Digit value={majorValue[3]} fillColor={COLORS.lightBlue}/>
                <Digit value={majorValue[4]} fillColor={COLORS.lightBlue}/>

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
