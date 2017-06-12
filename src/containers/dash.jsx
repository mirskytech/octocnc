import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Connection from './connection';
import {Grid} from "semantic-ui-react";
type Props = {

};

class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Connection />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        other stuff
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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