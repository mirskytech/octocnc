import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
        <div></div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

List.defaultProps = {

};

List.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
