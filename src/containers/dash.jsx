import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Connection from './connection';
import {Grid, Menu, Segment} from "semantic-ui-react";
import AxisDisplay from './axis_display';

class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active: 'bio',
          count: 0
        };

        this.active = 'bio';
    }

    setActivePanel = (item, {name}) => {
      this.setState({'active':name});
      this.setState({'count':this.state.count + 1});
      console.log(this.state.count);

    };

    render() {

      let getSegment = () => {
        switch(this.state.active) {
          case 'bio': {
            return(<Segment attached="bottom">
                <AxisDisplay title='X' value={1.23}/>
                <AxisDisplay title='Y' value={4.56}/>
                <AxisDisplay title='Z' value={78.90}/>
            </Segment>);
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