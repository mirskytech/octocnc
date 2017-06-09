import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Connection from './connection';
type Props = {

};

class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
        <div>
            <Connection />
        </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Dash);