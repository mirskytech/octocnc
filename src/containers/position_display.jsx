import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AxisDisplay from './axis_display';

class PositionDisplay extends React.Component {
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
            <div>
                <AxisDisplay title='X' value={1.23}/>
                <AxisDisplay title='Y' value={4.56}/>
                <AxisDisplay title='Z' value={78.90}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PositionDisplay);