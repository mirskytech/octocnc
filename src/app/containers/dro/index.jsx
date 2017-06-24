import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Axis from './axis';

class DRO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active: 'bio',
          count: 0
        };

        this.active = 'bio';
    }

    render() {

        return (
            <div style={{background: 'white', borderRadius:10}}>
                <Axis title='X' value={1.23}/>
                <Axis title='Y' value={4.56}/>
                <Axis title='Z' value={78.90}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DRO);