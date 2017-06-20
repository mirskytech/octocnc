import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactSVG from 'react-svg';
import decimal from 'assets/octocnc_sprites_decimal.svg';

const decimalStyle = { height: 70 };


class Decimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <ReactSVG path={decimal} style={decimalStyle} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

Decimal.defaultProps = {

};

Decimal.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Decimal);