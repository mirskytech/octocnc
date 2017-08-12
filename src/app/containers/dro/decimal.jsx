import React from 'react';
import PropTypes from 'prop-types';
import ExtendedPropTypes from "extended-proptypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactSVG from 'react-svg';
import decimal from 'assets/octocnc_sprites_decimal.svg';
import { Colors } from 'enums';

const decimalStyle = { height: 70, decimal: {fill: 'red' }};
import styles from './decimal.scss';

class Decimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    decimalLoaded = (svg) => {
        this.decimal = svg;
        this.setActive();
    };

    setActive() {
        if(this.decimal !== undefined) {
            this.decimal.getElementById('dot').style.fill = this.props.active ? this.props.fillColor : this.props.backgroundColor;
        }
    }

    shouldComponentUpdate() {
        this.setActive();
        return this.decimal === undefined;
    }


    render() {
        return (
            <div style={{display:'inline-block'}}>
                <ReactSVG path={decimal} style={decimalStyle} callback={this.decimalLoaded}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

Decimal.defaultProps = {
    active: false,
    fillColor: Colors.lightBlue.color,
    backgroundColor: Colors.lightGray.color
};

Decimal.propTypes = {
    active: PropTypes.bool,
    fillColor: ExtendedPropTypes.color,
    backgroundColor: ExtendedPropTypes.color
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Decimal);