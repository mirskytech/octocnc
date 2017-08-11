import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Axis from './axis';
import {ConnectionStatus} from "enums";

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
                <Axis title='X' value={this.props.xPosition} active={this.props.active}/>
                <Axis title='Y' value={this.props.yPosition} active={this.props.active}/>
                <Axis title='Z' value={this.props.zPosition} active={this.props.active}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        xPosition: state.position.X,
        yPosition: state.position.Y,
        zPosition: state.position.Z,
        active: state.devices.status === ConnectionStatus.CONNECTED
    };
}

DRO.defaultProps = {
    xPosition: 0.0,
    yPosition: 0.0,
    zPosition: 0.0,
    active: false
};

DRO.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    zPosition: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DRO);