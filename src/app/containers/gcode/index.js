import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {requestSystemCommands} from "action_creators";

class CommandWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.getCommands();
    }

    render() {
        return (
        <div>
            CommandWindow
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

CommandWindow.defaultProps = {

};

CommandWindow.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCommands:requestSystemCommands
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandWindow);