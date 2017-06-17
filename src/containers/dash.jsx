import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Connection from './connection';
import {Grid, Input, Menu, Segment} from "semantic-ui-react";
type Props = {

};

class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active: 'bio'
        };

        this.active = 'bio';
    }

    setActivePanel = (item, {name}) => {
      this.setState({'active':name});
    };

    render() {

      let getSegment = () => {
        switch(this.state.active) {
          case 'bio': {
            return(<Segment attached="bottom">blah</Segment>);
          }
          case 'photos': {
            return(<Segment attached="bottom">bar</Segment>)
          }
          default: {
            return(<Segment attached="bottom">nothing</Segment>);
          }
        }
      };

        return (
          <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <Connection />
              </Grid.Column>
              <Grid.Column width={9}>
                <Menu attached='top' tabular>
                  <Menu.Item name='bio' active={this.state.active === 'bio'} onClick={this.setActivePanel} />
                  <Menu.Item name='photos' active={this.state.active === 'photos'} onClick={this.setActivePanel} />
                </Menu>
                {getSegment()}
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