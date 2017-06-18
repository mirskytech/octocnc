import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import digit from '../assets/segment-digit.svg';
import ReactSVG from 'react-svg';

const segment_map = {
    1: ['c', 'd'],

};


class Digit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.count = 0;
    }

    digitLoaded = (svg) => {
        this.display = svg;
        this.display.children['segment_a'].fill = '#ff0000';
    };

    handleClick(e) {
      if(this.display !== undefined)   {
          const display = segment_map[1];
          for(let item of display) {
              this.display.children['segment_'+item].style = { fill: '#ff0000'};
          }
      }
    };



    render() {

        return (
            <div>
            <ReactSVG
              path={digit}
              callback={this.digitLoaded}
              className="digit"
              evalScript="once"
              style={{ width: 50 }}
              onClick={this.handleClick}
            />
                <button onClick={this.handleClick.bind(this)}>count</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

Digit.defaultProps = {
    value: 1
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Digit);